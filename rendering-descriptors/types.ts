/**
 * Engine-agnostic geometry descriptor types (DEC-A3).
 * No dependency on Three.js or any render engine.
 */

/** Material description: color (hex or CSS string), opacity 0–1, PBR, texture. */
export interface MaterialDescriptor {
  color?: number | string;
  opacity?: number;
  roughness?: number;       // 0-1
  metalness?: number;       // 0-1
  colorSigma?: number;      // Gaussian color variation
  texture?: string;        // filename (e.g. 'concrete.png')
  textureFolder?: string;   // base path (e.g. '/column-generator/textures/')
  textureRepeatX?: number;  // UV repeat X
  textureRepeatY?: number;  // UV repeat Y
  /** Full path/URL for texture; preferred over textureFolder + texture when present. */
  texturePath?: string;
  /** Use vertex color attribute for shading (e.g. wall brick/cement). */
  vertexColors?: boolean;
  flatShading?: boolean;
}

/** Geometry group: index range and material index (for multi-material meshes). */
export interface MeshGroupDescriptor {
  start: number;
  count: number;
  materialIndex: number;
}

/** One mesh: positions, indices, optional UVs, material. Additive: colors, groups, materials. */
export interface MeshDescriptor {
  positions: Float32Array;
  indices: Uint32Array;
  uvs?: Float32Array;
  material: MaterialDescriptor;
  /** Per-vertex RGB (3 floats per vertex); used when material.vertexColors is true. */
  colors?: Float32Array;
  /** Index ranges per material (for geometry.addGroup). */
  groups?: MeshGroupDescriptor[];
  /** Multi-material array; when present, adapter uses this and groups instead of single material. */
  materials?: MaterialDescriptor[];
}

/** Full geometry: one or more meshes (adapter builds a group per mesh). */
export interface GeometryDescriptor {
  meshes: MeshDescriptor[];
}
