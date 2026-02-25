/**
 * wall-generator - Parametric Masonry Wall Generator
 *
 * A standalone module for generating 3D parametric masonry walls with THREE.js.
 *
 * @example
 * ```typescript
 * import { buildMasonryWall } from './wall-generator';
 *
 * const wallGroup = buildMasonryWall({
 *   wall: {
 *     placement: { parent: null, position: { x: 0, y: 0, z: 0 }, direction: { yaw: 0 } },
 *     size: { l: 0.2, w: 3, h: 2 },
 *     blockSize: { l: 0.2, w: 0.1, h: 0.1 },
 *     cementThickness: 0.01
 *   },
 *   openings: [],
 *   task: { completion: 1.0 }
 * });
 * scene.add(wallGroup);
 * ```
 */

// ===== Public API =====
export { buildMasonryWall } from './buildMasonryWall';
export { getActualWallDimensions, type ActualWallDimensions } from './getActualWallDimensions';

// ===== Public Types =====
export type {
  Position,
  Direction,
  Placement,
  Size,
  MaterialConfig,
  AssociatedMaterials,
  WallParams,
  OpeningParams,
  TaskParams,
  VisualizationMode,
  BuildMasonryWallParams,
  OpeningBoundsForRow
} from './types';
