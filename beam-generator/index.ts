/**
 * beam-generator - Public API
 *
 * This module provides functions for generating parametric 3D beams.
 */

// Main entry point
export { buildBeam } from './buildBeam';

// Type exports
export type {
  Position,
  Direction,
  Placement,
  Size,
  BeamMaterialConfig,
  BeamParams,
  BuildBeamParams
} from './types';

// Material manager (for advanced use)
export { BeamMaterialManager } from './internal/BeamMaterialManager';
