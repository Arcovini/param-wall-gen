/**
 * shared - Type Definitions for Structural Elements
 *
 * Shared type definitions for columns, beams, slabs, and other structural elements.
 * Reuses primitive types (Position, Direction, Placement, Size) from wall-generator.
 * All measurements are in SI units (meters).
 */

// Re-export primitive types from wall-generator for consistency
export type { Position, Direction, Placement, Size } from '../wall-generator/types';
import type { Placement, Size } from '../wall-generator/types';

// ===== Element Types =====

/** Supported structural element types */
export type StructuralElementType = 'Column' | 'Beam' | 'Slab';

// ===== Material Types =====

/** Material configuration for structural elements (simplified vs walls) */
export interface StructuralMaterialConfig {
  color?: number | string;       // Hex number (0xRRGGBB) or CSS color string
  colorSigma?: number;           // Color variation sigma (0 = no variation, higher = more variation)
  roughness?: number;            // PBR roughness (0-1, default 0.9)
  metalness?: number;            // PBR metalness (0-1, default 0.1)
  texture?: string;              // Texture filename (e.g., 'concrete_structure_grid_tieholes.jpg')
  textureRepeatX?: number;       // UV repeat X (default: 1)
  textureRepeatY?: number;       // UV repeat Y (default: 1)
}

// ===== Parameter Types =====

/** Structural element construction parameters */
export interface StructuralElementParams {
  placement: Placement;              // Position and rotation
  size: Size;                        // l=depth, w=width, h=height (meters)
  material?: StructuralMaterialConfig;  // Optional material properties
}
