/**
 * buildMasonryWall - Legacy entry; delegates to buildWall (DEC-A3 pipeline).
 *
 * Kept for backward compatibility. Prefer buildWall for new code.
 */

import * as THREE from 'three';
import type { BuildMasonryWallParams } from '../types';
import { buildWall } from '../buildWall';

/**
 * Generates a masonry wall based on the provided parameters.
 * Delegates to buildWall (GeometryDescriptor + shared engine adapter).
 *
 * @param params - The parameters for building the wall.
 * @returns A THREE.Group containing the generated wall meshes.
 */
export function buildMasonryWall(params: BuildMasonryWallParams): THREE.Group {
  return buildWall(params);
}
