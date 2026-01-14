/**
 * wall-generator - Type Definitions
 *
 * Public type definitions for the wall generator module.
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

/** PBR material properties */
export type MaterialPBR = {
  albedo: string;      // Texture path or empty string
  metalness: number;   // 0..1
  roughness: number;   // 0..1
};

/** Materials for wall components */
export type AssociatedMaterials = {
  masonry: MaterialPBR;
  lintel: MaterialPBR;
  infill: MaterialPBR;
};

// ===== Parameter Types =====

/** Wall construction parameters */
export type WallParams = {
  placement: Placement;
  size: Size;              // Wall dimensions (l=depth, w=width, h=height)
  blockSize: Size;         // Block dimensions (l=width, h=height, w=unused)
  cementThickness: number; // Mortar joint thickness
  materials?: AssociatedMaterials; // Optional PBR materials
};

/** Opening (door/window) parameters */
export type OpeningParams = {
  placement: Placement;    // Position relative to wall center
  size: Size;              // Opening dimensions (l=width, w=depth, h=height)
};

/** Task/construction progress parameters */
export type TaskParams = {
  completion: number;      // 0..1 normalized (0=empty, 1=complete)
};

// ===== Visualization Types =====

/** Debug visualization mode for openings */
export type VisualizationMode = 'red' | 'wireframe' | 'none';

// ===== Main API Type =====

/** Parameters for buildMasonryWall function */
export interface BuildMasonryWallParams {
  wall: WallParams;
  openings: OpeningParams[];
  task: TaskParams;
  visualization?: VisualizationMode;  // Optional debug visualization
}

// ===== Internal Types (exported for advanced use) =====

/**
 * Pre-computed opening bounds for row generation.
 * Used internally for pseudo-boolean block placement.
 */
export interface OpeningBoundsForRow {
  left: number;           // X min (position.x - size.l/2)
  right: number;          // X max (position.x + size.l/2)
  snappedBottomY: number; // Snapped bottom Y (aligned to row block edge)
  snappedTopY: number;    // Snapped top Y (aligned to row block edge)
}
