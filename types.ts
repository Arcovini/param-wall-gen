// ===== TIPOS PRIMITIVOS =====
type Position = { x:number; y:number; z:number };
type Direction = { yaw:number };
type Placement = { parent: Placement | null; position: Position; direction: Direction };
type Size = { l:number; w:number; h:number };

// ===== MATERIAIS =====
type MaterialPBR = { albedo: string; metalness:number; roughness:number };
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

type OpeningParams = {
  placement: Placement;
  size: Size;
};

type TaskParams = {
  completion: number;  // 0..1
};

// ===== PARÂMETRO FINAL =====
export interface BuildMasonryWallParams {
  wall: WallParams;
  openings: OpeningParams[];
  task: TaskParams;
}