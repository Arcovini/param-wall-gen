/**
 * Column geometry builder - engine-agnostic descriptor from BuildColumnParams.
 * Outputs GeometryDescriptor (geometry-description) with no Three.js dependency.
 */

import type { GeometryDescriptor, MaterialDescriptor } from '../geometry-description/types';
import type { BuildColumnParams, ColumnMaterialConfig } from './types';

const DEFAULT_COLOR = 0xc0c0b8;

function columnMaterialToDescriptor(config: ColumnMaterialConfig | undefined): MaterialDescriptor {
  return {
    color: config?.color ?? DEFAULT_COLOR,
    opacity: 1
  };
}

/**
 * Build a box geometry descriptor (positions, indices, uvs, material) from column params.
 * Box is centered at origin; pose is applied by the engine adapter.
 */
export function buildColumnDescriptor(params: BuildColumnParams): GeometryDescriptor {
  const { size, material } = params.column;
  const w = size.w;
  const h = size.h;
  const l = size.l;
  const wx = w / 2;
  const hy = h / 2;
  const lz = l / 2;

  // 24 vertices (4 per face), order matches typical right/left/top/bottom/front/back
  const positions = new Float32Array([
    wx, -hy, lz, wx, -hy, -lz, wx, hy, -lz, wx, hy, lz,           // right +x
    -wx, -hy, -lz, -wx, -hy, lz, -wx, hy, lz, -wx, hy, -lz,       // left -x
    -wx, hy, lz, wx, hy, lz, wx, hy, -lz, -wx, hy, -lz,           // top +y
    -wx, -hy, -lz, wx, -hy, -lz, wx, -hy, lz, -wx, -hy, lz,       // bottom -y
    -wx, -hy, lz, wx, -hy, lz, wx, hy, lz, -wx, hy, lz,           // front +z
    wx, -hy, -lz, -wx, -hy, -lz, -wx, hy, -lz, wx, hy, -lz        // back -z
  ]);

  const indices = new Uint32Array([
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11,
    12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23
  ]);

  const uvs = new Float32Array([
    0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1,
    0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1
  ]);

  const mat = columnMaterialToDescriptor(material);

  return {
    meshes: [{ positions, indices, uvs, material: mat }]
  };
}
