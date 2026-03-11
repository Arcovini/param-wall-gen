/**
 * beam-generator - Public API
 *
 * Public entry point: {@link createInstance}.
 */

// ===== Solid Beam API =====
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
} from './SolidBeam';
export type { IFCBeamElement, CreateBeamInstanceParams } from './types';

export { updateInstance, dispose } from '../engine-adapter/three-js-adapter';

// ===== Public Types =====
export type {
  Position,
  Direction,
  QuaternionLike,
  Placement,
  Size,
  BeamMaterialConfig,
  BeamParams,
  TaskParams,
  Bounds3D,
  BeamBounds,
  ConstructionState,
  TaskState,
  StyleValue,
  ElementStyleUpdate,
  SimulationConfig,
  PhysicalDependencyRule,
  StochasticParamDef,
  BeamKeyPointId,
  BeamKeyPointsMap,
  ModelRole,
  Keypoints,
  ModelParams,
  SolidBeamUserData,
  SolidBeamInstance
} from './types';
