/**
 * Solid Column API
 *
 * Type-level and instance methods for SOLID_COLUMN element type.
 * Mirrors the wall-generator Solid Wall API style.
 */

import { transformPointByPlacement, quaternionToYaw, localAABBToWorld } from './internal/ColumnPlacement';
import type {
  Position,
  Bounds3D,
  ColumnBounds,
  ColumnKeyPointsMap,
  SolidColumnUserData,
  SolidColumnInstance,
  TaskState,
  ElementStyleUpdate,
  ConstructionState,
  SimulationConfig,
  PhysicalDependencyRule,
  StochasticParamDef,
  BuildColumnParams,
  ColumnParams,
  ModelParams,
  IFCColumnElement,
  CreateColumnInstanceParams,
  QuaternionLike
} from './types';

const TYPE_ID = 'SOLID_COLUMN';

function hashGlobalId(globalId: string): string {
  let h = 0;
  for (let i = 0; i < globalId.length; i++) {
    h = ((h << 5) - h + globalId.charCodeAt(i)) | 0;
  }
  return `solid-column-${Math.abs(h).toString(36)}`;
}

function createEmptySolidColumnUserData(overrides?: Partial<SolidColumnUserData>): SolidColumnUserData {
  const emptyBounds: ColumnBounds = {
    completed: { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } },
    execution: { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } }
  };
  return {
    objectType: 'SolidColumn',
    column: {} as ColumnParams,
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

/** Map IFC element to BuildColumnParams */
function ifcColumnToBuildParams(ifc: IFCColumnElement): BuildColumnParams | null {
  const w = ifc.width ?? ifc.length ?? 0;
  const h = ifc.height ?? 0;
  const l = ifc.length ?? ifc.width ?? 0;
  if (w <= 0 || h <= 0 || l <= 0) return null;
  const position = ifc.position ?? { x: 0, y: 0, z: 0 };
  const yaw = ifc.rotation != null ? quaternionToYaw(ifc.rotation) : 0;
  const column: ColumnParams = {
    placement: { parent: null, position, direction: { yaw } },
    size: { l, w, h }
  };
  return { column, task: { completion: 0 } };
}

function completionToConstructionState(completion: number): ConstructionState {
  if (completion <= 0) return 'PROJECTED';
  if (completion >= 1) return 'KNOWN';
  return 'REAL';
}

function fillInstanceUserData(
  ud: SolidColumnUserData,
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
 * createInstance — Factory: create Solid Column element.
 * With ifcElement: validates IfcColumn, extracts params, builds, sets PROJECTED, 0%, [].
 * Without IFC: uses params.buildParams, derives state from task.completion or params.completion.
 */
export function createInstance(
  ifcElement?: IFCColumnElement,
  params?: CreateColumnInstanceParams
): SolidColumnInstance {
  let buildParams: BuildColumnParams | null = null;
  let fromIFC = false;
  let ifcGlobalId: string | undefined;
  let position: Position | undefined;
  let rotation: QuaternionLike | undefined;

  const emptyResult = (): SolidColumnInstance => {
    return { userData: createEmptySolidColumnUserData() };
  };

  if (ifcElement != null) {
    // --- IFC path: extract base, then apply overrides ---
    if (ifcElement.ifcType !== 'IfcColumn') return emptyResult();
    buildParams = ifcColumnToBuildParams(ifcElement);
    if (!buildParams) return emptyResult();

    fromIFC = true;
    ifcGlobalId = ifcElement.globalId;
    position = ifcElement.position;
    rotation = ifcElement.rotation;

    if (params?.column) {
      const ov = params.column;
      if (ov.placement) buildParams.column.placement = ov.placement;
      if (ov.size) buildParams.column.size = ov.size;
      if (ov.material) buildParams.column.material = ov.material;
      if (ov.placement) {
        position = ov.placement.position;
        rotation = undefined;
      }
    }
  } else {
    // --- Manual path: assemble from flat params ---
    const columnPartial = params?.column;
    if (!columnPartial?.placement || !columnPartial?.size) {
      return emptyResult();
    }
    const column: ColumnParams = {
      placement: columnPartial.placement,
      size: columnPartial.size,
      ...(columnPartial.material ? { material: columnPartial.material } : {})
    };
    buildParams = { column, task: { completion: 0 } };
  }

  // Apply completion
  const clampedCompletion = params?.completion != null
    ? Math.max(0, Math.min(1, params.completion))
    : buildParams.task?.completion ?? 0;
  buildParams = { ...buildParams, task: { completion: clampedCompletion } };

  const ud = createEmptySolidColumnUserData();
  ud.objectType = 'SolidColumn';

  const column = buildParams.column;
  const task = buildParams.task ?? { completion: 1 };
  const completion = Math.max(0, Math.min(1, task.completion));

  const halfW = column.size.w / 2;
  const halfH = column.size.h / 2;
  const halfL = column.size.l / 2;

  const centroid = { x: 0, y: 0, z: 0 };

  const modelParams: ModelParams = {
    isWalkable: false,
    isCollidable: true,
    roles: ['COLLIDABLE', 'REFERENCE'],
    keypoints: {} as ModelParams['keypoints'],
    centroid
  };

  const placement = column.placement;
  const completedLocalMin = { x: -halfW, y: -halfH, z: -halfL };
  const completedLocalMax = { x: halfW, y: halfH, z: halfL };
  const executionLocalMax = { x: halfW, y: -halfH + column.size.h * completion, z: halfL };

  const bounds: ColumnBounds = {
    completed: localAABBToWorld(completedLocalMin, completedLocalMax, placement),
    execution: localAABBToWorld(completedLocalMin, executionLocalMax, placement)
  };

  ud.column = column;
  ud.task = task;
  ud.modelParams = modelParams;
  ud.bounds = bounds;

  const id =
    params?.id ??
    (fromIFC && ifcElement?.globalId ? hashGlobalId(ifcElement.globalId) : null) ??
    (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : null) ??
    `solid-column-${Date.now()}`;

  fillInstanceUserData(ud, {
    id,
    typeId: params?.typeId ?? TYPE_ID,
    ifcGlobalId: fromIFC ? ifcGlobalId : params?.ifcGlobalId,
    constructionState: completionToConstructionState(completion),
    completionPercentage: completion * 100,
    taskIds: params?.taskIds ?? [],
    position: position ?? column.placement.position,
    rotation: fromIFC ? rotation : undefined
  });

  if (ud.rotation == null && column.placement.direction) {
    const yaw = column.placement.direction.yaw;
    ud.rotation = {
      x: 0,
      y: Math.sin(yaw / 2),
      z: 0,
      w: Math.cos(yaw / 2)
    };
  }

  return { userData: ud };
}

// ----- Bounding boxes -----

export function getCompletedBoundingBox(instance: SolidColumnInstance): Bounds3D {
  return (instance.userData.bounds as ColumnBounds).completed;
}

/** Not meaningful for SolidColumn; returns null and logs a warning. */
export function getExecutionStateBoundingBox(_instance: SolidColumnInstance): Bounds3D | null {
  console.warn('getExecutionStateBoundingBox is not supported for SolidColumn.');
  return null;
}

// ----- Centroid -----

export function getCentroid(instance: SolidColumnInstance): Position {
  return (instance.userData.modelParams as SolidColumnUserData['modelParams']).centroid;
}

export function getCentroidWorld(instance: SolidColumnInstance): Position {
  const centroid = (instance.userData.modelParams as SolidColumnUserData['modelParams']).centroid;
  const placement = (instance.userData.column as ColumnParams).placement;
  return transformPointByPlacement(centroid, placement);
}

// ----- Key points (not meaningful for column; return null + warning) -----

/** Not meaningful for SolidColumn; returns null and logs a warning. */
export function getKeyPoints(_instance: SolidColumnInstance): ColumnKeyPointsMap | null {
  console.warn('getKeyPoints is not supported for SolidColumn.');
  return null;
}

/** Not meaningful for SolidColumn; returns null and logs a warning. */
export function getKeyPointsWorld(_instance: SolidColumnInstance): ColumnKeyPointsMap | null {
  console.warn('getKeyPointsWorld is not supported for SolidColumn.');
  return null;
}

// ----- Type-level -----

export function getPhysicalDependencyRules(): PhysicalDependencyRule[] {
  return [
    { strategy: 'BELOW', targetTypes: ['SLAB', 'FOUNDATION'], expansion: { x: 0, y: -0.05, z: 0 }, description: 'Piso ou fundação que sustenta a coluna.' },
    { strategy: 'ABOVE', targetTypes: ['BEAM', 'SLAB'], expansion: { x: 0, y: 0.05, z: 0 }, description: 'Viga ou laje que se apoia sobre a coluna.' },
    { strategy: 'BESIDE', targetTypes: ['SOLID_WALL', 'COLUMN'], expansion: { x: 0.05, y: 0, z: 0.05 }, description: 'Parede ou coluna adjacente.' }
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
    { name: 'height_tolerance', mean: 0, stdDev: 0.003, unit: 'm', distribution: 'normal', observation: 'Variação de altura.' }
  ];
}

// ----- handleTaskStateChange -----

export function handleTaskStateChange(
  instance: SolidColumnInstance,
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
  const column = instance.userData.column as ColumnParams;
  const height = column.size.h;
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
