// ===== TIPOS PRIMITIVOS =====
type Position = { x: number; y: number; z: number };
type Direction = { yaw: number };
type Placement = { parent: Placement | null; position: Position; direction: Direction };
type Size = { l: number; w: number; h: number };

// ===== JSON CONFIGURATION STRUCTURE =====
// Hierarchical structure: Project > Sites > Buildings > Storeys > Spaces > Walls
// Positions are relative to parent elements

export interface ConfigWall {
  id: string;
  name: string;
  size: Size;
  position: Position;
  direction?: Direction | null;
}

export interface ConfigSpace {
  id: string;
  name: string;
  position?: Position | null;
  direction?: Direction | null;
  walls: ConfigWall[];
}

export interface ConfigStorey {
  id: string;
  name: string;
  position?: Position | null;
  direction?: Direction | null;
  spaces?: ConfigSpace[];
  walls?: ConfigWall[];
}

export interface ConfigBuilding {
  id: string;
  name: string;
  position?: Position | null;
  direction?: Direction | null;
  storeys: ConfigStorey[];
}

export interface ConfigSite {
  id: string;
  name: string;
  position?: Position | null;
  direction?: Direction | null;
  buildings: ConfigBuilding[];
}

export interface ConfigProject {
  id: string;
  name: string;
  position?: Position | null;
  direction?: Direction | null;
  sites: ConfigSite[];
}

export interface ProjectConfiguration {
  project: ConfigProject;
}

// Extracted wall with computed world transform
export interface ExtractedWall {
  id: string;
  name: string;
  size: Size;
  worldPosition: Position;
  worldYaw: number;
}

// ===== MATERIAIS =====
type MaterialConfig = {
  color?: number | string;
  colorSigma?: number;       // Standard deviation for per-brick color variation (0 = no variation)
  darkBrickColor?: number | string;  // Secondary/dark brick color (15% of bricks use this color)
  cementColor?: number | string;     // Cement/mortar color
};
type AssociatedMaterials = {
  masonry?: MaterialConfig;
  lintel?: MaterialConfig;
  infill?: MaterialConfig;
};

// ===== PARÂMETROS =====
type WallParams = {
  placement: Placement;
  size: Size;
  blockSize: Size;
  cementThickness: number;
  materials?: AssociatedMaterials;  // Optional - defaults to MaterialManager colors
};

export type OpeningParams = {
  placement: Placement;
  size: Size;
};

/**
 * Pre-computed opening bounds for row generation (pseudo-boolean approach).
 * Used to skip blocks that fall completely inside an opening.
 */
export interface OpeningBoundsForRow {
  left: number;          // X min (position.x - size.l/2)
  right: number;         // X max (position.x + size.l/2)
  snappedBottomY: number; // Snapped bottom Y (aligned to row block edge)
  snappedTopY: number;    // Snapped top Y (aligned to row block edge)
}

type TaskParams = {
  completion: number;  // 0..1
};

export type VisualizationMode = 'red' | 'wireframe' | 'none';

// ===== PARÂMETRO FINAL =====
export interface BuildMasonryWallParams {
  wall: WallParams;
  openings: OpeningParams[];
  task: TaskParams;
}