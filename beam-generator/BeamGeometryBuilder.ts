/**
 * Beam geometry builder - engine-agnostic descriptor from BuildBeamParams.
 * Outputs GeometryDescriptor (rendering-descriptors) with no Three.js dependency.
 */

import type { GeometryDescriptor, MaterialDescriptor } from '../rendering-descriptors/types';
import type { BuildBeamParams, BeamMaterialConfig } from './types';

const DEFAULT_COLOR = 0xc0c0b8;

function beamMaterialToDescriptor(config: BeamMaterialConfig | undefined): MaterialDescriptor {
  return {
    color: config?.color ?? DEFAULT_COLOR,
    opacity: 1,
    roughness: config?.roughness,
    metalness: config?.metalness,
    colorSigma: config?.colorSigma,
    texture: config?.texture,
    textureFolder: '/beam-generator/textures/',
    textureRepeatX: config?.textureRepeatX,
    textureRepeatY: config?.textureRepeatY,
  };
}

/**
 * Build a box geometry descriptor (positions, indices, uvs, material) from beam params.
 * Box is centered at origin; pose and mesh offset are applied by buildBeam.
 */
export function buildBeamDescriptor(params: BuildBeamParams): GeometryDescriptor {
  const { size, material } = params.beam;
  const w = size.w;
  const h = size.h;
  const l = size.l;
  const wx = w / 2;
  const hy = h / 2;
  const lz = l / 2;

  const positions = new Float32Array([
    wx, -hy, lz, wx, -hy, -lz, wx, hy, -lz, wx, hy, lz,
    -wx, -hy, -lz, -wx, -hy, lz, -wx, hy, lz, -wx, hy, -lz,
    -wx, hy, lz, wx, hy, lz, wx, hy, -lz, -wx, hy, -lz,
    -wx, -hy, -lz, wx, -hy, -lz, wx, -hy, lz, -wx, -hy, lz,
    -wx, -hy, lz, wx, -hy, lz, wx, hy, lz, -wx, hy, lz,
    wx, -hy, -lz, -wx, -hy, -lz, -wx, hy, -lz, wx, hy, -lz
  ]);

  const indices = new Uint32Array([
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11,
    12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23
  ]);

  const uvs = new Float32Array([
    0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1,
    0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1
  ]);

  const mat = beamMaterialToDescriptor(material);

  return {
    meshes: [{ positions, indices, uvs, material: mat }]
  };
}
