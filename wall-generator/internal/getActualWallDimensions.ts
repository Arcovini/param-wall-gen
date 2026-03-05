/**
 * Computes actual wall dimensions from build params (visible width/height after completion).
 * Single source of truth for tests and UI; not stored on the returned THREE.Group.
 */

import type { BuildMasonryWallParams } from '../types';
import { RowGenerator } from './RowGenerator';

export interface ActualWallDimensions {
  actualWallWidth: number;
  actualWallHeight: number;
}

/**
 * Returns the actual built wall dimensions for the given params.
 * actualWallWidth equals target width; actualWallHeight is truncated to complete rows.
 */
export function getActualWallDimensions(params: BuildMasonryWallParams): ActualWallDimensions {
  const { wall, task } = params;
  const wallHeight = wall.size.h;
  const blockHeight = wall.blockSize.h;
  const cementThickness = wall.cementThickness;
  const totalRows = Math.floor(wallHeight / (blockHeight + cementThickness));
  const visibleRows = RowGenerator.getVisibleRows(totalRows, task.completion);
  const actualWallHeight =
    visibleRows > 0 ? visibleRows * blockHeight + (visibleRows - 1) * cementThickness : 0;
  return {
    actualWallWidth: wall.size.w,
    actualWallHeight
  };
}
