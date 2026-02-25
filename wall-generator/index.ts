/**
 * wall-generator - Parametric Masonry Wall Generator
 *
 * A standalone module for generating 3D parametric masonry walls with THREE.js.
 * Public entry point: {@link createInstance}.
 *
 * @example
 * ```typescript
 * import { createInstance } from './wall-generator';
 * import type { BuildMasonryWallParams } from './wall-generator';
 *
 * const buildParams: BuildMasonryWallParams = {
 *   wall: {
 *     placement: { parent: null, position: { x: 0, y: 0, z: 0 }, direction: { yaw: 0 } },
 *     size: { l: 0.2, w: 3, h: 2 },
 *     blockSize: { l: 0.2, w: 0.1, h: 0.1 },
 *     cementThickness: 0.01
 *   },
 *   openings: [],
 *   task: { completion: 1.0 }
 * };
 *
 * const wallGroup = createInstance(undefined, { buildParams });
 * scene.add(wallGroup);
 * ```
 */

// ===== Solid Wall API (wall-solid.md) =====
export {
  createInstance,
  getCompletedBoundingBox,
  getExecutionStateBoundingBox,
  getOpeningBoundingBoxes,
  getExpandedOpeningBoundingBoxes,
  getCentroid,
  getCentroidWorld,
  getKeyPoints,
  getKeyPointsWorld,
  getPhysicalDependencyRules,
  getSimulationConfig,
  getStochasticParams,
  selectMaterials,
  handleTaskStateChange,
  EXPANSION_FACTOR,
  TYPE_ID
} from './SolidWall';
export type { IFCProjectElement, CreateInstanceParams } from './SolidWall';

export { updateInstance, dispose } from './adapters/ThreeSolidWallAdapter';

// ===== Public Types =====
export type {
  Position,
  Direction,
  QuaternionLike,
  Placement,
  Size,
  MaterialConfig,
  AssociatedMaterials,
  WallParams,
  OpeningParams,
  TaskParams,
  BuildMasonryWallParams,
  OpeningBoundsForRow,
  ModelRole,
  Keypoints,
  ModelParams,
  Bounds3D,
  WallBounds,
  ConstructionState,
  TaskState,
  StyleValue,
  ElementStyleUpdate,
  SimulationConfig,
  PhysicalDependencyRule,
  StochasticParamDef,
  KeyPointId,
  KeyPointsMap,
  MaterialId,
  SelectedMaterials,
  ElementParams,
  SolidWallUserData,
  SolidWallInstance
} from './types';
