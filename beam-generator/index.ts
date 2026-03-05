/**
 * beam-generator - Public API
 *
 * Main entry point: createInstance. buildBeam is available for advanced use.
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

export { updateInstance, dispose } from './adapters/ThreeSolidBeamAdapter';

// ===== Low-level build (advanced use) =====
export { buildBeam } from './buildBeam';

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
  BuildBeamParams,
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
