/**
 * buildBeam - Main API entry point for beam generation
 *
 * Accepts BuildBeamParams and returns a THREE.Group containing the beam.
 */

import * as THREE from 'three';
import type { BuildBeamParams } from './types';
import { BeamBuilder } from './internal/BeamBuilder';

/**
 * Builds a parametric beam using the builder pattern
 *
 * @param params - Beam construction parameters
 * @returns THREE.Group containing the beam mesh
 *
 * @example
 * ```typescript
 * const beam = buildBeam({
 *   beam: {
 *     size: { l: 0.3, w: 3.0, h: 0.3 },  // 30cm x 3m x 30cm beam
 *     placement: {
 *       parent: null,
 *       position: { x: 0, y: 3.0, z: 0 },
 *       direction: { yaw: 0 }
 *     },
 *     material: { color: '#c0c0b8' }
 *   }
 * });
 * scene.add(beam);
 * ```
 */
export function buildBeam(params: BuildBeamParams): THREE.Group {
  return new BeamBuilder(params)
    .parseParameters()
    .generateGeometry()
    .shiftToBottomLeftPivot()
    .addMetadata()
    .build();
}
