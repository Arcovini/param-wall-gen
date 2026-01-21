/**
 * buildColumn - Main API entry point for column generation
 *
 * Accepts BuildColumnParams and returns a THREE.Group containing the column.
 */

import * as THREE from 'three';
import type { BuildColumnParams } from './types';
import { ColumnBuilder } from './internal/ColumnBuilder';

/**
 * Builds a parametric column using the builder pattern
 *
 * @param params - Column construction parameters
 * @returns THREE.Group containing the column mesh
 *
 * @example
 * ```typescript
 * const column = buildColumn({
 *   column: {
 *     size: { l: 0.3, w: 0.3, h: 3.0 },  // 30cm x 30cm x 3m column
 *     placement: {
 *       parent: null,
 *       position: { x: 0, y: 1.5, z: 0 },
 *       direction: { yaw: 0 }
 *     },
 *     material: { color: '#c0c0b8' }
 *   }
 * });
 * scene.add(column);
 * ```
 */
export function buildColumn(params: BuildColumnParams): THREE.Group {
  return new ColumnBuilder(params)
    .parseParameters()
    .generateGeometry()
    .shiftToBottomLeftPivot()
    .addMetadata()
    .build();
}
