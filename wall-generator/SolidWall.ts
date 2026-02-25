/**
 * Solid Wall API (wall-solid.md)
 *
 * Type-level and instance methods for SOLID_WALL element type.
 * Implementations are stubs or delegate to userData; each method can be
 * refined in follow-up steps.
 */

import * as THREE from 'three';
import { buildMasonryWall } from './buildMasonryWall';
import { transformPointByPlacement, quaternionToYaw } from './internal/WallPlacement';
import { MaterialManager } from './internal/MaterialManager';
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
  OpeningParams,
  ModelParams,
  QuaternionLike
} from './types';

const TYPE_ID = 'SOLID_WALL';
const EXPANSION_FACTOR = { x: 0.1, y: 0.05, z: 0.3 };

export type { QuaternionLike };

/** Opening data extractable from IFC */
export interface IFCOpening {
  position?: Position;
  size?: { width?: number; height?: number; depth?: number };
}

/** IFC element shape for extraction (wall-solid.md §5); adapter fills from loader */
export interface IFCProjectElement {
  globalId?: string;
  ifcType?: string;
  predefinedType?: string;
  length?: number;
  height?: number;
  thickness?: number;
  openings?: IFCOpening[];
  position?: Position;
  rotation?: QuaternionLike;
}

/** Params override when creating instance (e.g. from IFC) */
export interface CreateInstanceParams {
  id?: string;
  typeId?: string;
  ifcGlobalId?: string;
  taskIds?: string[];
  /** Build params for geometry; required when not using IFC */
  buildParams?: BuildMasonryWallParams;
  /** Seed to select material family (brick-ceramic, brick-concrete, etc.); applied before build */
  materialSeed?: number;
  /** When true, sample getStochasticParams() and apply deltas to dimensions (one sample per build) */
  applyStochastic?: boolean;
}

function hashGlobalId(globalId: string): string {
  let h = 0;
  for (let i = 0; i < globalId.length; i++) {
    h = ((h << 5) - h + globalId.charCodeAt(i)) | 0;
  }
  return `solid-wall-${Math.abs(h).toString(36)}`;
}

function sampleNormal(mean: number, stdDev: number): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + stdDev * z;
}

function sampleUniform(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/** Sample getStochasticParams() once and add deltas to buildParams.wall dimensions. */
function applyStochasticToBuildParams(buildParams: BuildMasonryWallParams): void {
  const params = getStochasticParams();
  const wall = buildParams.wall;
  const byName: Record<string, number> = {};
  for (const p of params) {
    if (p.distribution === 'normal') {
      byName[p.name] = sampleNormal(p.mean, p.stdDev);
    } else if (p.distribution === 'uniform') {
      const half = (p.stdDev * 2) / 2;
      byName[p.name] = sampleUniform(p.mean - half, p.mean + half);
    }
  }
  if (byName['thickness_tolerance'] != null) wall.size.l += byName['thickness_tolerance'];
  if (byName['height_tolerance'] != null) wall.size.h += byName['height_tolerance'];
  if (byName['mortar_joint_thickness'] != null) wall.cementThickness += byName['mortar_joint_thickness'];
  if (byName['alignment_deviation'] != null) {
    wall.placement.position.x += byName['alignment_deviation'];
    wall.placement.position.z += byName['alignment_deviation'] * 0.5;
  }
  if (wall.blockSize && byName['height_tolerance'] != null) {
    wall.blockSize.h += byName['height_tolerance'] * 0.1;
  }
}

/** Apply material family (main + finish) to MaterialManager before build. */
function applyMaterialSelection(main: MaterialId, _finish?: MaterialId): void {
  const mm = MaterialManager.getInstance();
  switch (main) {
    case 'brick-ceramic':
      mm.setBrickColor(0xC45C3E);
      mm.setDarkBrickColor(0x8B3A2A);
      mm.setCementColor(0xC0C0B8);
      mm.setLintelColor(0xE5E5E5);
      mm.setInfillColor(0xB0B0A8);
      break;
    case 'brick-concrete':
      mm.setBrickColor(0x6B6B6B);
      mm.setDarkBrickColor(0x4A4A4A);
      mm.setCementColor(0x9E9E9E);
      mm.setLintelColor(0x808080);
      mm.setInfillColor(0x757575);
      break;
    case 'concrete-cast':
    case 'concrete-precast':
      mm.setBrickColor(0x8C8C8C);
      mm.setDarkBrickColor(0x6E6E6E);
      mm.setCementColor(0x9E9E9E);
      mm.setLintelColor(0x8C8C8C);
      mm.setInfillColor(0x7A7A7A);
      break;
    default:
      mm.setBrickColor(0xC45C3E);
      mm.setDarkBrickColor(0x8B3A2A);
      mm.setCementColor(0xC0C0B8);
      mm.setLintelColor(0xE5E5E5);
      mm.setInfillColor(0xB0B0A8);
  }
}

function createEmptySolidWallUserData(overrides?: Partial<SolidWallUserData>): SolidWallUserData {
  const emptyBounds: WallBounds = {
    completed: { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } },
    execution: { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } },
    openings: [],
    openingsExpanded: []
  };
  return {
    objectType: 'SolidWall',
    wall: {} as WallParams,
    openings: [],
    task: { completion: 0 },
    modelParams: {
      isWalkable: false,
      isCollidable: true,
      roles: ['COLLIDABLE', 'REFERENCE'],
      keypoints: {} as ModelParams['keypoints'],
      centroid: { x: 0, y: 0, z: 0 }
    },
    bounds: emptyBounds,
    constructionState: 'PROJECTED',
    completionPercentage: 0,
    taskIds: [],
    ...overrides
  };
}

/** Map IFC element to BuildMasonryWallParams (default block/cement when not from IFC) */
function ifcElementToBuildParams(ifc: IFCProjectElement): BuildMasonryWallParams | null {
  const length = ifc.length ?? 0;
  const height = ifc.height ?? 0;
  const thickness = ifc.thickness ?? 0;
  if (length <= 0 || height <= 0 || thickness <= 0) return null;
  const position = ifc.position ?? { x: 0, y: 0, z: 0 };
  const yaw = ifc.rotation != null ? quaternionToYaw(ifc.rotation) : 0;
  const openings: OpeningParams[] = (ifc.openings ?? []).map((o) => ({
    placement: {
      parent: null,
      position: o.position ?? { x: 0, y: 0, z: 0 },
      direction: { yaw: 0 }
    },
    size: {
      l: o.size?.width ?? 0,
      w: o.size?.depth ?? 0,
      h: o.size?.height ?? 0
    }
  }));
  const wall: WallParams = {
    placement: { parent: null, position, direction: { yaw } },
    size: { l: thickness, w: length, h: height },
    blockSize: { l: 0.39, h: 0.14, w: 0 },
    cementThickness: 0.02
  };
  return { wall, openings, task: { completion: 0 } };
}

function completionToConstructionState(completion: number): ConstructionState {
  if (completion <= 0) return 'PROJECTED';
  if (completion >= 1) return 'KNOWN';
  return 'REAL';
}

function fillInstanceUserData(
  ud: SolidWallUserData,
  opts: {
    id: string;
    typeId: string;
    ifcGlobalId?: string;
    constructionState: ConstructionState;
    completionPercentage: number;
    taskIds: string[];
    position?: Position;
    rotation?: QuaternionLike;
  }
): void {
  ud.id = opts.id;
  ud.typeId = opts.typeId;
  if (opts.ifcGlobalId != null) ud.ifcGlobalId = opts.ifcGlobalId;
  ud.constructionState = opts.constructionState;
  ud.completionPercentage = opts.completionPercentage;
  ud.taskIds = opts.taskIds;
  if (opts.position != null) ud.position = opts.position;
  if (opts.rotation != null) ud.rotation = opts.rotation;
}

/**
 * createInstance — Factory: create Solid Wall element (wall-solid.md §5).
 * With ifcElement: validates IfcWall/SOLIDWALL, extracts params, builds, sets constructionState PROJECTED, completionPercentage 0, taskIds [].
 * Without IFC: uses params.buildParams, derives constructionState/completionPercentage from task.completion.
 */
export function createInstance(
  ifcElement?: IFCProjectElement,
  params?: CreateInstanceParams
): THREE.Group {
  let buildParams: BuildMasonryWallParams | null = null;
  let fromIFC = false;
  let ifcGlobalId: string | undefined;
  let position: Position | undefined;
  let rotation: QuaternionLike | undefined;

  if (ifcElement != null) {
    if (ifcElement.ifcType !== 'IfcWall' || ifcElement.predefinedType !== 'SOLIDWALL') {
      const empty = new THREE.Group();
      empty.name = 'SolidWall_Empty';
      empty.userData = createEmptySolidWallUserData();
      return empty;
    }
    buildParams = ifcElementToBuildParams(ifcElement);
    if (!buildParams) {
      const empty = new THREE.Group();
      empty.name = 'SolidWall_Empty';
      empty.userData = createEmptySolidWallUserData();
      return empty;
    }
    fromIFC = true;
    ifcGlobalId = ifcElement.globalId;
    position = ifcElement.position;
    rotation = ifcElement.rotation;
  } else {
    buildParams = params?.buildParams ?? null;
  }

  if (!buildParams) {
    const empty = new THREE.Group();
    empty.name = 'SolidWall_Empty';
    empty.userData = createEmptySolidWallUserData();
    return empty;
  }

  const idForMaterials =
    params?.id ??
    (fromIFC && ifcElement?.globalId ? hashGlobalId(ifcElement.globalId) : null) ??
    undefined;
  if (params?.materialSeed != null) {
    const selected = selectMaterials(params.materialSeed, idForMaterials);
    applyMaterialSelection(selected.main, selected.finish);
  }
  if (params?.applyStochastic) {
    applyStochasticToBuildParams(buildParams);
  }

  const group = buildMasonryWall(buildParams);
  const ud = group.userData as SolidWallUserData;
  const wall = buildParams.wall;
  const task = buildParams.task;
  const completion = Math.max(0, Math.min(1, task.completion));

  const id =
    params?.id ??
    (fromIFC && ifcElement?.globalId ? hashGlobalId(ifcElement.globalId) : null) ??
    (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : null) ??
    `solid-wall-${Date.now()}`;

  fillInstanceUserData(ud, {
    id,
    typeId: params?.typeId ?? TYPE_ID,
    ifcGlobalId: fromIFC ? ifcGlobalId : params?.ifcGlobalId,
    constructionState: fromIFC ? 'PROJECTED' : completionToConstructionState(completion),
    completionPercentage: fromIFC ? 0 : completion * 100,
    taskIds: params?.taskIds ?? [],
    position: position ?? wall.placement.position,
    rotation: fromIFC ? rotation : undefined
  });

  if (ud.rotation == null && wall.placement.direction) {
    const yaw = wall.placement.direction.yaw;
    ud.rotation = {
      x: 0,
      y: Math.sin(yaw / 2),
      z: 0,
      w: Math.cos(yaw / 2)
    };
  }

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

// ----- Centroide (local; transform to world via getCentroidWorld) -----

export function getCentroid(instance: SolidWallInstance): Position {
  return (instance.userData.modelParams as SolidWallUserData['modelParams']).centroid;
}

/** Centroide em coordenadas de mundo (placement aplicado). */
export function getCentroidWorld(instance: SolidWallInstance): Position {
  const centroid = (instance.userData.modelParams as SolidWallUserData['modelParams']).centroid;
  const placement = (instance.userData.wall as WallParams).placement;
  return transformPointByPlacement(centroid, placement);
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

/** Key points em coordenadas de mundo (placement aplicado a cada ponto). */
export function getKeyPointsWorld(instance: SolidWallInstance): KeyPointsMap {
  const localMap = getKeyPoints(instance);
  const placement = (instance.userData.wall as WallParams).placement;
  const worldMap: Partial<KeyPointsMap> = {};
  for (const [id, pos] of Object.entries(localMap)) {
    worldMap[id as KeyPointId] = transformPointByPlacement(pos, placement);
  }
  return worldMap as KeyPointsMap;
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
