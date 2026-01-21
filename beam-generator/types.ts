/**
 * beam-generator - Type Definitions
 *
 * Public type definitions for the beam generator module.
 * Reuses primitive types (Position, Direction, Placement, Size) from wall-generator.
 * All measurements are in SI units (meters).
 */

// Re-export primitive types from wall-generator for consistency
export type { Position, Direction, Placement, Size } from '../wall-generator/types';
import type { Placement, Size } from '../wall-generator/types';

// ===== Material Types =====

/** Material configuration for beams (simplified vs walls) */
export interface BeamMaterialConfig {
  color?: number | string;       // Hex number (0xRRGGBB) or CSS color string
  roughness?: number;            // PBR roughness (0-1, default 0.9)
  metalness?: number;            // PBR metalness (0-1, default 0.1)
}

// ===== Parameter Types =====

/** Beam construction parameters */
export interface BeamParams {
  placement: Placement;          // Position and rotation
  size: Size;                    // l=depth, w=width, h=height (meters)
  material?: BeamMaterialConfig; // Optional material properties
}

// ===== Main API Type =====

/** Parameters for buildBeam function */
export interface BuildBeamParams {
  beam: BeamParams;
}
