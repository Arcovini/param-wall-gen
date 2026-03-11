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
}

/** One mesh: positions, indices, optional UVs, material. */
export interface MeshDescriptor {
  positions: Float32Array;
  indices: Uint32Array;
  uvs?: Float32Array;
  material: MaterialDescriptor;
}

/** Full geometry: one or more meshes (adapter builds a group per mesh). */
export interface GeometryDescriptor {
  meshes: MeshDescriptor[];
}
