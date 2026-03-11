/**
 * Triangle descriptor - engine-agnostic geometry for DEC-A3 vertical slice.
 * No Three.js or other engine imports.
 */

import type { GeometryDescriptor, MaterialDescriptor } from '../rendering-descriptors/types';

/**
 * Creates a minimal triangle descriptor (3 vertices, 1 face) as GeometryDescriptor.
 * Vertices in local space; pose is applied by the engine adapter.
 */
export function createTriangleDescription(
  options?: Partial<{ color: number | string; opacity: number }>
): GeometryDescriptor {
  const positions = new Float32Array([
    -0.5, 0, 0,
    0.5, 0, 0,
    0, 1, 0
  ]);
  const indices = new Uint32Array([0, 1, 2]);
  const uvs = new Float32Array([0, 0, 1, 0, 0.5, 1]);

  const material: MaterialDescriptor = {
    color: options?.color ?? 0x4488ff,
    opacity: options?.opacity ?? 1
  };

  return {
    meshes: [{ positions, indices, uvs, material }]
  };
}
