/**
 * column-generator - Type Definitions
 *
 * Public type definitions for the column generator module.
 * All measurements are in SI units (meters).
 */

// ===== Primitive Types =====

/** 3D position coordinates */
export type Position = { x: number; y: number; z: number };

/** Direction/rotation (yaw in radians) */
export type Direction = { yaw: number };

/** Hierarchical placement with parent reference */
export type Placement = {
  parent: Placement | null;
  position: Position;
  direction: Direction;
};

/** 3D dimensions: length, width, height (meters) */
export type Size = { l: number; w: number; h: number };

// ===== Material Types =====

/** Material configuration for columns */
export interface ColumnMaterialConfig {
  color?: number | string;       // Hex number (0xRRGGBB) or CSS color string
  colorSigma?: number;           // Color variation sigma (0 = no variation, higher = more variation)
  roughness?: number;            // PBR roughness (0-1, default 0.9)
  metalness?: number;            // PBR metalness (0-1, default 0.1)
  texture?: string;              // Texture filename (e.g., 'concrete_structure_grid_tieholes.jpg')
  textureRepeatX?: number;       // UV repeat X (default: 1)
  textureRepeatY?: number;       // UV repeat Y (default: 1)
}

// ===== Parameter Types =====

/** Column construction parameters */
export interface ColumnParams {
  placement: Placement;              // Position and rotation
  size: Size;                        // l=depth, w=width, h=height (meters)
  material?: ColumnMaterialConfig;   // Optional material properties
}

/** Parameters for buildColumn function */
export interface BuildColumnParams {
  column: ColumnParams;
}
