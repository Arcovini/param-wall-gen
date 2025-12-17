// ===== TIPOS PRIMITIVOS =====
type Position = { x: number; y: number; z: number };
type Direction = { yaw: number };
type Placement = { parent: Placement | null; position: Position; direction: Direction };
type Size = { l: number; w: number; h: number };

// ===== IFC JSON STRUCTURE =====
export interface IFCWall {
  id: string;
  name: string;
  size: Size;
  position: Position;
  direction: Direction;
}

export interface IFCSpace {
  id: string;
  name: string;
  walls: IFCWall[];
}

export interface IFCStorey {
  id: string;
  name: string;
  spaces?: IFCSpace[];
  walls?: IFCWall[];
}

export interface IFCBuilding {
  id: string;
  name: string;
  storeys: IFCStorey[];
}

export interface IFCSite {
  id: string;
  name: string;
  buildings: IFCBuilding[];
}

export interface IFCProject {
  id: string;
  name: string;
  sites: IFCSite[];
}

export interface IFCConfiguration {
  project: IFCProject;
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