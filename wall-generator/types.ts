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

/** Material configuration */
export type MaterialConfig = {
  color?: number | string;         // Hex number (0xRRGGBB) or CSS color string
  colorSigma?: number;             // Standard deviation for per-brick color variation (0 = no variation)
  darkBrickColor?: number | string; // Secondary/dark brick color (15% of bricks use this color)
  cementColor?: number | string;   // Cement/mortar color
};

/** Materials for wall components */
export type AssociatedMaterials = {
  masonry?: MaterialConfig;
  lintel?: MaterialConfig;
  infill?: MaterialConfig;
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

// ===== Main API Type =====

/** Parameters for buildMasonryWall function */
export interface BuildMasonryWallParams {
  wall: WallParams;
  openings: OpeningParams[];
  task: TaskParams;
}

// ===== Model and Bounds Types (returned in userData) =====

/** Role of the model for physics/navigation */
export type ModelRole = 'COLLIDABLE' | 'REFERENCE';

/** Four corner points at half depth (e.g. z=0 in wall local space) */
export interface Keypoints {
  bottomLeft: Position;
  topLeft: Position;
  bottomRight: Position;
  topRight: Position;
}

/** Model metadata: walkable, collidable, roles, keypoints, centroid */
export interface ModelParams {
  isWalkable: boolean;
  isCollidable: boolean;
  roles: ModelRole[];
  keypoints: Keypoints;
  centroid: Position;
}

/** Axis-aligned bounding box (min/max in world or local) */
export interface Bounds3D {
  min: Position;
  max: Position;
}

/** Bounds returned in userData (all in world coordinates) */
export interface WallBounds {
  completed: Bounds3D;
  execution: Bounds3D;
  openings: Bounds3D[];
  openingsExpanded: Bounds3D[];
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

// ===== Solid Wall spec (wall-solid.md) =====

/** Construction state for Solid Wall element */
export type ConstructionState = 'PROJECTED' | 'REAL' | 'KNOWN';

/** Task state passed to handleTaskStateChange (completion 0–100, schedule/quality) */
export interface TaskState {
  completionPercentage: number;
  scheduleStatus?: 'ON_TIME' | 'DELAYED' | 'AHEAD';
  qualityStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

/** Single style property to apply (opacity, visibleHeight, highlightColor, outlineColor, outlineWidth) */
export interface StyleValue {
  property: string;
  value: number | string;
}

/** Result of handleTaskStateChange: state + style to apply on the adapter */
export interface ElementStyleUpdate {
  constructionState: ConstructionState;
  completionPercentage: number;
  styleValues: StyleValue[];
}

/** Simulation config (getSimulationConfig) */
export interface SimulationConfig {
  roles: ModelRole[];
  isWalkable: boolean;
  isCollidable: boolean;
}

/** Physical dependency rule (getPhysicalDependencyRules) */
export interface PhysicalDependencyRule {
  strategy: 'BELOW' | 'ABOVE' | 'BESIDE' | 'ADJACENT';
  targetTypes: string[];
  expansion: Position;
  description?: string;
}

/** Single stochastic parameter (getStochasticParams) */
export interface StochasticParamDef {
  name: string;
  mean: number;
  stdDev: number;
  unit: string;
  distribution: 'normal' | 'uniform';
  observation?: string;
}

/** Key point IDs per wall-solid.md §7 */
export type KeyPointId =
  | 'CORNER_BOTTOM_LEFT'
  | 'CORNER_BOTTOM_RIGHT'
  | 'CORNER_TOP_LEFT'
  | 'CORNER_TOP_RIGHT'
  | 'CENTER_FACE_FRONT'
  | 'CENTER_FACE_BACK'
  | 'MID_BASE'
  | 'MID_TOP'
  | `OPENING_CENTER_${number}`;

/** Key points map: semantic ID → position (local or world) */
export type KeyPointsMap = Record<KeyPointId, Position>;

/** Material family ID (masonry-wall-materials) */
export type MaterialId =
  | 'brick-ceramic'
  | 'brick-concrete'
  | 'concrete-cast'
  | 'concrete-precast'
  | 'mortar-finish'
  | 'plaster-finish';

/** Result of selectMaterials(seed) */
export interface SelectedMaterials {
  main: MaterialId;
  finish?: MaterialId;
}

/** Element params as in spec (length, height, thickness, position, rotation, openings) */
export interface ElementParams {
  length: number;
  height: number;
  thickness: number;
  openings: OpeningParams[];
  position: Position;
  rotation: { x: number; y: number; z: number; w: number }; // Quaternion
}

/** userData shape on THREE.Group returned by buildMasonryWall / createInstance (wall-solid.md §5) */
export interface SolidWallUserData {
  objectType: string;
  id?: string;
  typeId?: string;
  ifcGlobalId?: string;
  /** Position (world); also derivable from wall.placement.position */
  position?: Position;
  /** Rotation as quaternion (world); also derivable from wall.placement.direction */
  rotation?: { x: number; y: number; z: number; w: number };
  wall: WallParams;
  openings: OpeningParams[];
  task: { completion: number };
  modelParams: ModelParams;
  bounds: WallBounds;
  constructionState?: ConstructionState;
  completionPercentage?: number; // 0–100
  taskIds?: string[];
}

/** Solid wall instance: object with userData (e.g. THREE.Group from buildMasonryWall) */
export interface SolidWallInstance {
  userData: SolidWallUserData;
}
