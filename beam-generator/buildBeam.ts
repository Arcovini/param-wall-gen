/**
 * buildBeam - Main API entry point for beam generation
 *
 * Accepts BuildBeamParams and returns a THREE.Group containing the beam.
 */

import * as THREE from 'three';
import type { BuildBeamParams } from './types';
import { createBeamMaterial } from './internal/BeamMaterialManager';

export function buildBeam(params: BuildBeamParams): THREE.Group {
  const { size, placement, material } = params.beam;

  const geometry = new THREE.BoxGeometry(size.w, size.h, size.l);
  const mat = createBeamMaterial(material);

  const mesh = new THREE.Mesh(geometry, mat);
  mesh.name = 'BeamMesh';
  mesh.position.set(size.w / 2, size.h / 2, 0);

  const group = new THREE.Group();
  group.name = 'Beam';
  group.add(mesh);
  group.rotation.y = placement.direction.yaw;
  group.position.set(placement.position.x, placement.position.y, placement.position.z);
  group.userData = {
    objectType: 'Beam',
    beam: params.beam,
    pivotOffset: { x: size.w / 2, y: size.h / 2 }
  };

  return group;
}
