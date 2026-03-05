/**
 * Solid Beam API
 *
 * Type-level and instance methods for SOLID_BEAM element type.
 * Mirrors the column-generator Solid Column API style.
 */

import * as THREE from 'three';
import { buildBeam } from './buildBeam';
import { transformPointByPlacement, quaternionToYaw, localAABBToWorld } from './internal/BeamPlacement';
import type {
  Position,
  Bounds3D,
  BeamBounds,
  BeamKeyPointsMap,
  SolidBeamUserData,
  SolidBeamInstance,
  TaskState,
  ElementStyleUpdate,
  ConstructionState,
  SimulationConfig,
  PhysicalDependencyRule,
  StochasticParamDef,
  BuildBeamParams,
  BeamParams,
  ModelParams,
  IFCBeamElement,
  CreateBeamInstanceParams,
  QuaternionLike
} from './types';

const TYPE_ID = 'SOLID_BEAM';

function hashGlobalId(globalId: string): string {
  let h = 0;
  for (let i = 0; i < globalId.length; i++) {
    h = ((h << 5) - h + globalId.charCodeAt(i)) | 0;
  }
  return `solid-beam-${Math.abs(h).toString(36)}`;
}

function createEmptySolidBeamUserData(overrides?: Partial<SolidBeamUserData>): SolidBeamUserData {
  const emptyBounds: BeamBounds = {
    completed: { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } },
    execution: { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } }
  };
  return {
    objectType: 'SolidBeam',
    beam: {} as BeamParams,
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

/** Map IFC element to BuildBeamParams */
function ifcBeamToBuildParams(ifc: IFCBeamElement): BuildBeamParams | null {
  const w = ifc.width ?? ifc.length ?? 0;
  const h = ifc.height ?? 0;
  const l = ifc.length ?? ifc.width ?? 0;
  if (w <= 0 || h <= 0 || l <= 0) return null;
  const position = ifc.position ?? { x: 0, y: 0, z: 0 };
  const yaw = ifc.rotation != null ? quaternionToYaw(ifc.rotation) : 0;
  const beam: BeamParams = {
    placement: { parent: null, position, direction: { yaw } },
    size: { l, w, h }
  };
  return { beam, task: { completion: 0 } };
}

function completionToConstructionState(completion: number): ConstructionState {
  if (completion <= 0) return 'PROJECTED';
  if (completion >= 1) return 'KNOWN';
  return 'REAL';
}

function fillInstanceUserData(
  ud: SolidBeamUserData,
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
 * createInstance — Factory: create Solid Beam element.
 * With ifcElement: validates IfcBeam, extracts params, builds, sets PROJECTED, 0%, [].
 * Without IFC: uses params.buildParams, derives state from task.completion or params.completion.
 */
export function createInstance(
  ifcElement?: IFCBeamElement,
  params?: CreateBeamInstanceParams
): THREE.Group {
  let buildParams: BuildBeamParams | null = null;
  let fromIFC = false;
  let ifcGlobalId: string | undefined;
  let position: Position | undefined;
  let rotation: QuaternionLike | undefined;

  const emptyResult = (): THREE.Group => {
    const empty = new THREE.Group();
    empty.name = 'SolidBeam_Empty';
    empty.userData = createEmptySolidBeamUserData();
    return empty;
  };

  if (ifcElement != null) {
    // --- IFC path: extract base, then apply overrides ---
    if (ifcElement.ifcType !== 'IfcBeam') return emptyResult();
    buildParams = ifcBeamToBuildParams(ifcElement);
    if (!buildParams) return emptyResult();

    fromIFC = true;
    ifcGlobalId = ifcElement.globalId;
    position = ifcElement.position;
    rotation = ifcElement.rotation;

    if (params?.beam) {
      const ov = params.beam;
      if (ov.placement) buildParams.beam.placement = ov.placement;
      if (ov.size) buildParams.beam.size = ov.size;
      if (ov.material) buildParams.beam.material = ov.material;
      if (ov.placement) {
        position = ov.placement.position;
        rotation = undefined;
      }
    }
  } else {
    // --- Manual path: assemble from flat params ---
    const beamPartial = params?.beam;
    if (!beamPartial?.placement || !beamPartial?.size) {
      return emptyResult();
    }
    const beam: BeamParams = {
      placement: beamPartial.placement,
      size: beamPartial.size,
      ...(beamPartial.material ? { material: beamPartial.material } : {})
    };
    buildParams = { beam, task: { completion: 0 } };
  }

  // Apply completion
  const clampedCompletion = params?.completion != null
    ? Math.max(0, Math.min(1, params.completion))
    : buildParams.task?.completion ?? 0;
  buildParams = { ...buildParams, task: { completion: clampedCompletion } };

  const group = buildBeam(buildParams);
  const ud = group.userData as SolidBeamUserData;
  ud.objectType = 'SolidBeam';

  const beam = buildParams.beam;
  const task = buildParams.task ?? { completion: 1 };
  const completion = Math.max(0, Math.min(1, task.completion));

  // Beam group local space: origin at one end; box from (0,0,0) to (size.w, size.h, size.l)
  const centroid = {
    x: beam.size.w / 2,
    y: beam.size.h / 2,
    z: beam.size.l / 2
  };

  const modelParams: ModelParams = {
    isWalkable: false,
    isCollidable: true,
    roles: ['COLLIDABLE', 'REFERENCE'],
    keypoints: {} as ModelParams['keypoints'],
    centroid
  };

  const placement = beam.placement;
  const localMin = { x: 0, y: 0, z: 0 };
  const completedLocalMax = { x: beam.size.w, y: beam.size.h, z: beam.size.l };
  const executionLocalMax = { x: beam.size.w, y: beam.size.h * completion, z: beam.size.l };

  const bounds: BeamBounds = {
    completed: localAABBToWorld(localMin, completedLocalMax, placement),
    execution: localAABBToWorld(localMin, executionLocalMax, placement)
  };

  ud.beam = beam;
  ud.task = task;
  ud.modelParams = modelParams;
  ud.bounds = bounds;

  const id =
    params?.id ??
    (fromIFC && ifcElement?.globalId ? hashGlobalId(ifcElement.globalId) : null) ??
    (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : null) ??
    `solid-beam-${Date.now()}`;

  fillInstanceUserData(ud, {
    id,
    typeId: params?.typeId ?? TYPE_ID,
    ifcGlobalId: fromIFC ? ifcGlobalId : params?.ifcGlobalId,
    constructionState: completionToConstructionState(completion),
    completionPercentage: completion * 100,
    taskIds: params?.taskIds ?? [],
    position: position ?? beam.placement.position,
    rotation: fromIFC ? rotation : undefined
  });

  if (ud.rotation == null && beam.placement.direction) {
    const yaw = beam.placement.direction.yaw;
    ud.rotation = {
      x: 0,
      y: Math.sin(yaw / 2),
      z: 0,
      w: Math.cos(yaw / 2)
    };
  }

  return group;
}

// ----- Bounding boxes -----

export function getCompletedBoundingBox(instance: SolidBeamInstance): Bounds3D {
  return (instance.userData.bounds as BeamBounds).completed;
}

/** Not meaningful for SolidBeam; returns null and logs a warning. */
export function getExecutionStateBoundingBox(_instance: SolidBeamInstance): Bounds3D | null {
  console.warn('getExecutionStateBoundingBox is not supported for SolidBeam.');
  return null;
}

// ----- Centroid -----

export function getCentroid(instance: SolidBeamInstance): Position {
  return (instance.userData.modelParams as SolidBeamUserData['modelParams']).centroid;
}

export function getCentroidWorld(instance: SolidBeamInstance): Position {
  const centroid = (instance.userData.modelParams as SolidBeamUserData['modelParams']).centroid;
  const placement = (instance.userData.beam as BeamParams).placement;
  return transformPointByPlacement(centroid, placement);
}

// ----- Key points (not meaningful for beam; return null + warning) -----

/** Not meaningful for SolidBeam; returns null and logs a warning. */
export function getKeyPoints(_instance: SolidBeamInstance): BeamKeyPointsMap | null {
  console.warn('getKeyPoints is not supported for SolidBeam.');
  return null;
}

/** Not meaningful for SolidBeam; returns null and logs a warning. */
export function getKeyPointsWorld(_instance: SolidBeamInstance): BeamKeyPointsMap | null {
  console.warn('getKeyPointsWorld is not supported for SolidBeam.');
  return null;
}

// ----- Type-level -----

export function getPhysicalDependencyRules(): PhysicalDependencyRule[] {
  return [
    { strategy: 'BELOW', targetTypes: ['SOLID_COLUMN', 'SOLID_WALL'], expansion: { x: 0, y: -0.05, z: 0 }, description: 'Coluna ou parede que sustenta a viga.' },
    { strategy: 'ABOVE', targetTypes: ['SLAB'], expansion: { x: 0, y: 0.05, z: 0 }, description: 'Laje que se apoia sobre a viga.' },
    { strategy: 'BESIDE', targetTypes: ['SOLID_BEAM', 'SOLID_WALL'], expansion: { x: 0.05, y: 0, z: 0.05 }, description: 'Viga ou parede adjacente.' }
  ];
}

export function getSimulationConfig(): SimulationConfig {
  return {
    roles: ['COLLIDABLE', 'REFERENCE'],
    isWalkable: false,
    isCollidable: true
  };
}

export function getStochasticParams(): StochasticParamDef[] {
  return [
    { name: 'cross_section_tolerance', mean: 0, stdDev: 0.005, unit: 'm', distribution: 'normal', observation: 'Tolerância dimensional da seção.' },
    { name: 'length_tolerance', mean: 0, stdDev: 0.003, unit: 'm', distribution: 'normal', observation: 'Variação de comprimento.' }
  ];
}

// ----- handleTaskStateChange -----

export function handleTaskStateChange(
  instance: SolidBeamInstance,
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
  const beam = instance.userData.beam as BeamParams;
  const height = beam.size.h;
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

export { TYPE_ID };
