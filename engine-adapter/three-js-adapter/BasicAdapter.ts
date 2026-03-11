/**
 * BasicAdapter - Three.js translation of GeometryDescriptor.
 * DEC-A3: creates BufferGeometry, Material, Mesh per mesh; single Group with pose.
 */

import * as THREE from 'three';
import type { GeometryDescriptor, MeshDescriptor } from '../../geometry-description/types';

export interface BasicPose {
  position: { x: number; y: number; z: number };
  rotation: { yaw: number };
}

function parseColor(value: number | string | undefined): number {
  if (value === undefined) return 0x4488ff;
  if (typeof value === 'number') return value;
  const s = String(value).replace(/^#/, '');
  return parseInt(s, 16);
}

function buildMeshFromDescriptor(meshDesc: MeshDescriptor): THREE.Mesh {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(meshDesc.positions, 3));
  geometry.setIndex(new THREE.BufferAttribute(meshDesc.indices, 1));
  if (meshDesc.uvs) {
    geometry.setAttribute('uv', new THREE.BufferAttribute(meshDesc.uvs, 2));
  }
  geometry.computeVertexNormals();

  const color = parseColor(meshDesc.material.color);
  const opacity = meshDesc.material.opacity ?? 1;
  const material = new THREE.MeshStandardMaterial({
    color,
    opacity,
    transparent: opacity < 1,
    flatShading: true
  });

  return new THREE.Mesh(geometry, material);
}

/**
 * Creates a THREE.Group from a GeometryDescriptor and pose.
 * One mesh per descriptor.meshes[]; pose applied to the group.
 */
export function create(
  descriptor: GeometryDescriptor,
  pose: BasicPose
): THREE.Group {
  const group = new THREE.Group();
  group.name = 'Geometry';

  for (let i = 0; i < descriptor.meshes.length; i++) {
    const mesh = buildMeshFromDescriptor(descriptor.meshes[i]);
    mesh.name = `Mesh${i}`;
    group.add(mesh);
  }

  group.position.set(pose.position.x, pose.position.y, pose.position.z);
  group.rotation.y = pose.rotation.yaw;

  return group;
}
