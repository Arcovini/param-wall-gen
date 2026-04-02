/**
 * Column domain -> GeometryDescriptor mapper.
 * Integration-only layer: converts domain geometry payload to rendering descriptor.
 */

import type { ColumnDomainGeometry } from '../../column-generator/types';
import type { GeometryDescriptor } from '../../rendering-descriptors/types';

export function columnDomainToGeometryDescriptor(
  geometry: ColumnDomainGeometry
): GeometryDescriptor {
  return {
    meshes: geometry.meshes.map((mesh) => ({
      positions: mesh.positions,
      indices: mesh.indices,
      uvs: mesh.uvs,
      material: {
        color: mesh.material.color,
        opacity: mesh.material.opacity,
        roughness: mesh.material.roughness,
        metalness: mesh.material.metalness,
        colorSigma: mesh.material.colorSigma,
        texture: mesh.material.texture,
        textureFolder: mesh.material.textureFolder,
        textureRepeatX: mesh.material.textureRepeatX,
        textureRepeatY: mesh.material.textureRepeatY
      }
    }))
  };
}
