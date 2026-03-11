/**
 * Engine-agnostic geometry descriptor types (DEC-A3).
 * No dependency on Three.js or any render engine.
 */

/** Material description: color (hex or CSS string), opacity 0–1. */
export interface MaterialDescriptor {
  color?: number | string;
  opacity?: number;
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
