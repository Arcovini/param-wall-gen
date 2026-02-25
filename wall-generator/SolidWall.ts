/**
 * Solid Wall API (wall-solid.md)
 *
 * Type-level and instance methods for SOLID_WALL element type.
 * Implementations are stubs or delegate to userData; each method can be
 * refined in follow-up steps.
 */

import * as THREE from 'three';
import { buildMasonryWall } from './buildMasonryWall';
import type {
  Position,
  Bounds3D,
  WallBounds,
  KeyPointId,
  KeyPointsMap,
  SolidWallUserData,
  SolidWallInstance,
  TaskState,
  ElementStyleUpdate,
  ConstructionState,
  SimulationConfig,
  PhysicalDependencyRule,
  StochasticParamDef,
  MaterialId,
  SelectedMaterials,
  BuildMasonryWallParams,
  WallParams,
  OpeningParams
} from './types';

const TYPE_ID = 'SOLID_WALL';
const EXPANSION_FACTOR = { x: 0.1, y: 0.05, z: 0.3 };

/** Placeholder for IFC element (to be implemented when IFC is integrated) */
export interface IFCProjectElement {
  globalId?: string;
  ifcType?: string;
  predefinedType?: string;
  // ... properties, geometry, openings, placement
}

/** Params override when creating instance (e.g. from IFC) */
export interface CreateInstanceParams {
  id?: string;
  typeId?: string;
  ifcGlobalId?: string;
  /** Build params for geometry; required when not using IFC */
  buildParams?: BuildMasonryWallParams;
}

/**
 * createInstance — Factory: create Solid Wall element.
 * When IFC is integrated: validate ifcElement (IfcWall, SOLIDWALL), extract params, then build.
 * For now: accepts optional identity + buildParams, builds via buildMasonryWall, attaches identity to userData.
 */
export function createInstance(
  _ifcElement?: IFCProjectElement,
  params?: CreateInstanceParams
): THREE.Group {
  const buildParams = params?.buildParams;
  if (!buildParams) {
    const empty = new THREE.Group();
    empty.name = 'SolidWall_Empty';
    empty.userData = { objectType: 'SolidWall', bounds: { completed: { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } }, execution: { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } }, openings: [], openingsExpanded: [] }, modelParams: { isWalkable: false, isCollidable: true, roles: ['COLLIDABLE', 'REFERENCE'], keypoints: {} as any, centroid: { x: 0, y: 0, z: 0 } }, wall: {} as WallParams, openings: [], task: { completion: 0 } };
    return empty;
  }
  const group = buildMasonryWall(buildParams);
  const ud = group.userData as SolidWallUserData;
  ud.id = params?.id ?? crypto.randomUUID?.() ?? `solid-wall-${Date.now()}`;
  ud.typeId = params?.typeId ?? TYPE_ID;
  if (params?.ifcGlobalId != null) ud.ifcGlobalId = params.ifcGlobalId;
  return group;
}

// ----- Bounding boxes (read from userData.bounds) -----

export function getCompletedBoundingBox(instance: SolidWallInstance): Bounds3D {
  return (instance.userData.bounds as WallBounds).completed;
}

export function getExecutionStateBoundingBox(instance: SolidWallInstance): Bounds3D {
  return (instance.userData.bounds as WallBounds).execution;
}

export function getOpeningBoundingBoxes(instance: SolidWallInstance): Bounds3D[] {
  return (instance.userData.bounds as WallBounds).openings ?? [];
}

export function getExpandedOpeningBoundingBoxes(instance: SolidWallInstance): Bounds3D[] {
  return (instance.userData.bounds as WallBounds).openingsExpanded ?? [];
}

// ----- Centroide (local; transform to world in adapter if needed) -----

export function getCentroid(instance: SolidWallInstance): Position {
  return (instance.userData.modelParams as SolidWallUserData['modelParams']).centroid;
}

// ----- Key points (full set with semantic IDs per §7) -----

export function getKeyPoints(instance: SolidWallInstance): KeyPointsMap {
  const wall = instance.userData.wall as WallParams;
  const openings = (instance.userData.openings as OpeningParams[]) ?? [];
  const length = wall.size.w;
  const height = wall.size.h;
  const thickness = wall.size.l;
  const halfL = thickness / 2;

  const map: Partial<KeyPointsMap> = {
    CORNER_BOTTOM_LEFT: { x: 0, y: 0, z: 0 },
    CORNER_BOTTOM_RIGHT: { x: length, y: 0, z: 0 },
    CORNER_TOP_LEFT: { x: 0, y: height, z: 0 },
    CORNER_TOP_RIGHT: { x: length, y: height, z: 0 },
    CENTER_FACE_FRONT: { x: length / 2, y: height / 2, z: 0 },
    CENTER_FACE_BACK: { x: length / 2, y: height / 2, z: thickness },
    MID_BASE: { x: length / 2, y: 0, z: halfL },
    MID_TOP: { x: length / 2, y: height, z: halfL }
  };

  const wallCenterY = height / 2;
  const wallCenterX = length / 2;
  openings.forEach((op, i) => {
    const cx = op.placement.position.x + wallCenterX;
    const cy = op.placement.position.y + wallCenterY;
    (map as Record<string, Position>)[`OPENING_CENTER_${i}`] = { x: cx, y: cy, z: halfL };
  });

  return map as KeyPointsMap;
}

// ----- Type-level: dependency rules (static) -----

export function getPhysicalDependencyRules(): PhysicalDependencyRule[] {
  return [
    { strategy: 'BELOW', targetTypes: ['SLAB', 'FOUNDATION'], expansion: { x: 0, y: -0.05, z: 0 }, description: 'Piso ou fundação que sustenta a parede.' },
    { strategy: 'ABOVE', targetTypes: ['BEAM', 'SLAB'], expansion: { x: 0, y: 0.05, z: 0 }, description: 'Viga ou laje que se apoia sobre a parede.' },
    { strategy: 'BESIDE', targetTypes: ['SOLID_WALL', 'PLUMBING_WALL', 'COLUMN'], expansion: { x: 0.05, y: 0, z: 0.05 }, description: 'Parede ou coluna adjacente.' },
    { strategy: 'ADJACENT', targetTypes: ['SOLID_WALL'], expansion: { x: 0.02, y: 0, z: 0.02 }, description: 'Parede alinhada/contígua.' }
  ];
}

export function getSimulationConfig(): SimulationConfig {
  return {
    roles: ['COLLIDABLE', 'REFERENCE'],
    isWalkable: false,
    isCollidable: true
  };
}

// ----- Stochastic params (static table §11) -----

export function getStochasticParams(): StochasticParamDef[] {
  return [
    { name: 'thickness_tolerance', mean: 0, stdDev: 0.005, unit: 'm', distribution: 'normal', observation: 'Tolerância dimensional (NBR 15270 / NBR 6136).' },
    { name: 'height_tolerance', mean: 0, stdDev: 0.003, unit: 'm', distribution: 'normal', observation: 'Variação por fiada acumulada.' },
    { name: 'alignment_deviation', mean: 0, stdDev: 0.004, unit: 'm', distribution: 'normal', observation: 'Desvio de prumo.' },
    { name: 'mortar_joint_thickness', mean: 0.01, stdDev: 0.002, unit: 'm', distribution: 'normal', observation: 'Espessura da junta de argamassa.' },
    { name: 'surface_roughness', mean: 0.5, stdDev: 0.15, unit: '—', distribution: 'uniform', observation: 'Fator de rugosidade para texturização (0–1).' }
  ];
}

// ----- Materials: select by seed (§9) -----

const MAIN_MATERIAL_IDS: MaterialId[] = ['brick-ceramic', 'brick-concrete', 'concrete-cast', 'concrete-precast'];
const FINISH_IDS: MaterialId[] = ['mortar-finish', 'plaster-finish'];

function simpleHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function selectMaterials(seed: number, elementId?: string): SelectedMaterials {
  const key = elementId != null ? `${elementId}+${seed}` : String(seed);
  const n = simpleHash(key);
  const main = MAIN_MATERIAL_IDS[n % MAIN_MATERIAL_IDS.length];
  const finish = FINISH_IDS[(n >> 16) % FINISH_IDS.length];
  return { main, finish };
}

// ----- handleTaskStateChange (§12) -----

export function handleTaskStateChange(
  instance: SolidWallInstance,
  taskState: TaskState
): ElementStyleUpdate {
  const pct = taskState.completionPercentage;
  let constructionState: ConstructionState;
  if (pct === 0) constructionState = 'PROJECTED';
  else if (pct < 100) constructionState = 'REAL';
  else constructionState = 'KNOWN';

  const styleValues: ElementStyleUpdate['styleValues'] = [];
  styleValues.push({
    property: 'opacity',
    value: constructionState === 'PROJECTED' ? 0.3 : 1.0
  });
  if (taskState.scheduleStatus === 'DELAYED') {
    styleValues.push({ property: 'highlightColor', value: '#E53E3E' });
  } else if (taskState.scheduleStatus === 'AHEAD') {
    styleValues.push({ property: 'highlightColor', value: '#38A169' });
  }
  if (taskState.qualityStatus === 'REJECTED') {
    styleValues.push({ property: 'outlineColor', value: '#E53E3E' });
    styleValues.push({ property: 'outlineWidth', value: 3 });
  }
  const wall = instance.userData.wall as WallParams;
  const height = wall.size.h;
  styleValues.push({
    property: 'visibleHeight',
    value: (height * pct) / 100
  });

  return {
    constructionState,
    completionPercentage: pct,
    styleValues
  };
}

export { EXPANSION_FACTOR, TYPE_ID };
