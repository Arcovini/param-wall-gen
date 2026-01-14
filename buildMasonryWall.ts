/**
 * buildMasonryWall - Main API function for generating parametric masonry walls
 *
 * - Creates realistic masonry wall with ceramic blocks and cement joints
 * - Supports openings (doors, windows)
 * - Adds lintels above openings (when needed)
 * - Adds infill (encunhamento) at top
 * - Respects construction completion percentage
 *
 * REFACTORED: Uses WallBuilder pattern for improved clarity and testability
 */

import * as THREE from 'three';
import type { BuildMasonryWallParams } from './types';
import { WallBuilder } from './wall-generator/builders/WallBuilder';

/**
 * Generates a masonry wall based on the provided parameters.
 *
 * @param params - The parameters for building the wall.
 * @returns A THREE.Group containing the generated wall meshes.
 */
export function buildMasonryWall(params: BuildMasonryWallParams): THREE.Group {
  return new WallBuilder(params)
    .parseParameters()
    .precomputeOpeningBounds()  // Pre-compute for pseudo-boolean row generation
    .generateBaseWall()
    .addWallTopCap()            // Add horizontal cap at top of completed wall
    .addInfill()
    .createOpenings()
    .applyCsgOperations()
    .shiftToBottomLeftPivot()
    .addMetadata()
    .build();
}
