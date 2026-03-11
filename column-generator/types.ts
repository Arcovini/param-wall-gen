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

/** Quaternion { x, y, z, w } for rotation (e.g. from IFC) */
export type QuaternionLike = { x: number; y: number; z: number; w: number };

/** Hierarchical placement with parent reference */
export type Placement = {
  parent: Placement | null;
  position: Position;
  direction: Direction;
  /** When set, used for transforms; takes precedence over direction.yaw */
  rotation?: QuaternionLike;
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
  texture?: string;              // Texture filename (e.g., 'concrete_structure_grid_tieholes.png')
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

/** Task/construction progress parameters */
export interface TaskParams {
  completion: number; // 0..1 normalized (0=empty, 1=complete)
}

/** Parameters for buildColumn function */
export interface BuildColumnParams {
  column: ColumnParams;
  task?: TaskParams;
}

// ===== Model and Bounds (Solid Column API) =====

/** Role of the model for physics/navigation */
export type ModelRole = 'COLLIDABLE' | 'REFERENCE';

/** Four corner points at half depth (e.g. z=0 in column local space) */
export interface Keypoints {
  bottomLeft: Position;
  topLeft: Position;
  bottomRight: Position;
  topRight: Position;
}

/** Axis-aligned bounding box (min/max in world or local) */
export interface Bounds3D {
  min: Position;
  max: Position;
}

/** Bounds for column (no openings) */
export interface ColumnBounds {
  completed: Bounds3D;
  execution: Bounds3D;
}

/** Construction state for Solid Column element */
export type ConstructionState = 'PROJECTED' | 'REAL' | 'KNOWN';

/** Task state passed to handleTaskStateChange */
export interface TaskState {
  completionPercentage: number;
  scheduleStatus?: 'ON_TIME' | 'DELAYED' | 'AHEAD';
  qualityStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

/** Single style property to apply */
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

/** Column key point IDs (8 fixed points, no openings) */
export type ColumnKeyPointId =
  | 'CORNER_BOTTOM_LEFT'
  | 'CORNER_BOTTOM_RIGHT'
  | 'CORNER_TOP_LEFT'
  | 'CORNER_TOP_RIGHT'
  | 'CENTER_FACE_FRONT'
  | 'CENTER_FACE_BACK'
  | 'MID_BASE'
  | 'MID_TOP';

/** Column key points map: semantic ID → position (local or world) */
export type ColumnKeyPointsMap = Record<ColumnKeyPointId, Position>;

/** Model metadata: walkable, collidable, roles, keypoints, centroid */
export interface ModelParams {
  isWalkable: boolean;
  isCollidable: boolean;
  roles: ModelRole[];
  keypoints: Keypoints;
  keypointsFull?: ColumnKeyPointsMap;
  centroid: Position;
}

/** userData shape on THREE.Group returned by createInstance */
export interface SolidColumnUserData {
  objectType: string;
  id?: string;
  typeId?: string;
  ifcGlobalId?: string;
  position?: Position;
  rotation?: QuaternionLike;
  column: ColumnParams;
  task: TaskParams;
  modelParams: ModelParams;
  bounds: ColumnBounds;
  constructionState?: ConstructionState;
  completionPercentage?: number; // 0–100
  taskIds?: string[];
}

/** Solid column instance: object with userData (e.g. THREE.Group from createInstance) */
export interface SolidColumnInstance {
  userData: SolidColumnUserData;
}

/** IFC element shape for column (adapter fills from loader) */
export interface IFCColumnElement {
  globalId?: string;
  ifcType?: string;
  length?: number;
  width?: number;
  height?: number;
  position?: Position;
  rotation?: QuaternionLike;
}

/** Params for createInstance. All column fields are optional overrides when IFC is provided; without IFC, column (with placement, size) is required. */
export interface CreateColumnInstanceParams {
  id?: string;
  typeId?: string;
  ifcGlobalId?: string;
  taskIds?: string[];
  /** Column geometry. Required without IFC (must include placement, size). With IFC, acts as partial override. */
  column?: Partial<ColumnParams>;
  /** Construction completion 0..1 (0 = projected, 1 = complete). Defaults to 0. */
  completion?: number;
  /** Render path: legacy (THREE in buildColumn) or dec-a3 (geometry-description + engine-adapter). Default: 'legacy'. */
  renderPath?: 'legacy' | 'dec-a3';
}
