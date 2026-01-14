/**
 * wall-generator - Parametric Masonry Wall Generator
 *
 * A standalone module for generating 3D parametric masonry walls with THREE.js.
 *
 * @example
 * ```typescript
 * import { buildMasonryWall } from './wall-generator';
 * import type { BuildMasonryWallParams } from './wall-generator';
 *
 * const params: BuildMasonryWallParams = {
 *   wall: { ... },
 *   openings: [ ... ],
 *   task: { completion: 1.0 }
 * };
 *
 * const wallGroup = buildMasonryWall(params);
 * scene.add(wallGroup);
 * ```
 */

// ===== Public API =====
export { buildMasonryWall } from './buildMasonryWall';

// ===== Public Types =====
export type {
  Position,
  Direction,
  Placement,
  Size,
  MaterialPBR,
  AssociatedMaterials,
  WallParams,
  OpeningParams,
  TaskParams,
  VisualizationMode,
  BuildMasonryWallParams,
  OpeningBoundsForRow
} from './types';
