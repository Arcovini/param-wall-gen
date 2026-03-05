/**
 * column-generator - Public API
 *
 * Public entry point: {@link createInstance}.
 */

// ===== Solid Column API =====
export {
  createInstance,
  getCompletedBoundingBox,
  getExecutionStateBoundingBox,
  getCentroid,
  getCentroidWorld,
  getKeyPoints,
  getKeyPointsWorld,
  getPhysicalDependencyRules,
  getSimulationConfig,
  getStochasticParams,
  handleTaskStateChange,
  TYPE_ID
} from './SolidColumn';
export type { IFCColumnElement, CreateColumnInstanceParams } from './types';

export { updateInstance, dispose } from './adapters/ThreeSolidColumnAdapter';

// ===== Public Types =====
export type {
  Position,
  Direction,
  QuaternionLike,
  Placement,
  Size,
  ColumnMaterialConfig,
  ColumnParams,
  TaskParams,
  Bounds3D,
  ColumnBounds,
  ConstructionState,
  TaskState,
  StyleValue,
  ElementStyleUpdate,
  SimulationConfig,
  PhysicalDependencyRule,
  StochasticParamDef,
  ColumnKeyPointId,
  ColumnKeyPointsMap,
  ModelRole,
  Keypoints,
  ModelParams,
  SolidColumnUserData,
  SolidColumnInstance
} from './types';
