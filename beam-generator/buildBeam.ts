/**
 * buildBeam - Main API entry point for beam generation.
 * Uses rendering-descriptors + engine-adapter (DEC-A3 pipeline).
 */

import * as THREE from 'three';
import type { BuildBeamParams } from './types';
import { buildBeamDescriptor } from './BeamGeometryBuilder';
import { create as createFromDescriptor } from '../engine-adapter/three-js-adapter';

/**
 * Build beam via GeometryDescriptor + Three adapter.
 * Mesh is offset (w/2, h/2, l/2) so group local space remains (0,0,0)-(w,h,l) for bounds/keypoints.
 */
export function buildBeam(params: BuildBeamParams): THREE.Group {
  const descriptor = buildBeamDescriptor(params);
  const { placement, size } = params.beam;
  const group = createFromDescriptor(descriptor, {
    position: placement.position,
    rotation: { yaw: placement.direction.yaw }
  });
  group.name = 'Beam';
  (group.userData as Record<string, unknown>) = {
    objectType: 'Beam',
    beam: params.beam,
    pivotOffset: { x: size.w / 2, y: size.h / 2 }
  };
  const mesh = group.children[0] as THREE.Mesh;
  if (mesh && mesh.isMesh) {
    mesh.position.set(size.w / 2, size.h / 2, size.l / 2);
  }
  return group;
}
