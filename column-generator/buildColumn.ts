/**
 * buildColumn - Main API entry point for column generation
 *
 * Accepts BuildColumnParams and returns a THREE.Group containing the column.
 */

import * as THREE from 'three';
import type { BuildColumnParams } from './types';
import { createColumnMaterial } from './internal/ColumnMaterialManager';

export function buildColumn(params: BuildColumnParams): THREE.Group {
  const { size, placement, material } = params.column;

  const geometry = new THREE.BoxGeometry(size.w, size.h, size.l);
  const mat = createColumnMaterial(material);

  const mesh = new THREE.Mesh(geometry, mat);
  mesh.name = 'ColumnMesh';
  mesh.position.set(0, 0, 0);

  const group = new THREE.Group();
  group.name = 'Column';
  group.add(mesh);
  group.rotation.y = placement.direction.yaw;
  group.position.set(placement.position.x, placement.position.y, placement.position.z);
  group.userData = {
    objectType: 'Column',
    column: params.column,
    task: params.task ?? { completion: 1 }
  };

  return group;
}
