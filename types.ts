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
type MaterialPBR = { albedo: string; metalness: number; roughness: number };
type AssociatedMaterials = {
  masonry: MaterialPBR;
  lintel: MaterialPBR;
  infill: MaterialPBR;
};

// ===== PARÂMETROS =====
type WallParams = {
  placement: Placement;
  size: Size;
  blockSize: Size;
  cementThickness: number;
  materials: AssociatedMaterials;
};

export type OpeningParams = {
  placement: Placement;
  size: Size;
};

type TaskParams = {
  completion: number;  // 0..1
};

export type VisualizationMode = 'red' | 'wireframe' | 'none';

// ===== PARÂMETRO FINAL =====
export interface BuildMasonryWallParams {
  wall: WallParams;
  openings: OpeningParams[];
  task: TaskParams;
  visualization?: VisualizationMode;
}