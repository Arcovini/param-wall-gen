/**
 * ThreeAdapter - Three.js translation of GeometryDescriptor.
 * DEC-A3: creates BufferGeometry, Material, Mesh per mesh; single Group with pose.
 * Also provides updateInstance (style) and dispose for any group created by this adapter.
 */

import * as THREE from 'three';
import type { GeometryDescriptor, MeshDescriptor } from '../../geometry-description/types';

export interface Pose {
  position: { x: number; y: number; z: number };
  rotation: { yaw: number };
}

/** Style update contract (compatible with ElementStyleUpdate from column/wall). */
export interface StyleUpdate {
  styleValues: Array<{ property: string; value: number | string }>;
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
  pose: Pose
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

function setOpacity(mat: THREE.Material, value: number): void {
  mat.opacity = value;
  mat.transparent = value < 1;
  if ('needsUpdate' in mat) (mat as THREE.Material & { needsUpdate?: boolean }).needsUpdate = true;
}

function parseHex(str: string): number {
  if (str.startsWith('#')) str = str.slice(1);
  return parseInt(str, 16);
}

function applyEmissive(mat: THREE.Material, hex: number, intensity: number): void {
  const m = mat as THREE.MeshStandardMaterial;
  if (m.emissive != null) {
    m.emissive.setHex(hex);
    m.emissiveIntensity = intensity;
    if ('needsUpdate' in m) (m as THREE.Material & { needsUpdate?: boolean }).needsUpdate = true;
  }
}

/**
 * Apply style update to a group (opacity, visibleHeight/clip plane, highlightColor, outlineColor, outlineWidth).
 */
export function updateInstance(meshOrGroup: THREE.Object3D, styleUpdate: StyleUpdate): void {
  const group = meshOrGroup as THREE.Group;
  if (!group.userData) group.userData = {};
  (group.userData as Record<string, unknown>).lastStyleUpdate = styleUpdate;

  for (const sv of styleUpdate.styleValues) {
    if (sv.property === 'opacity') {
      const value = typeof sv.value === 'number' ? sv.value : parseFloat(String(sv.value));
      group.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh && (obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material as THREE.Material;
          if (Array.isArray(mat)) mat.forEach((m) => setOpacity(m, value));
          else setOpacity(mat, value);
        }
      });
    }
    if (sv.property === 'visibleHeight') {
      const value = typeof sv.value === 'number' ? sv.value : parseFloat(String(sv.value));
      (group.userData as Record<string, unknown>).visibleHeight = value;
      const plane =
        value > 0 ? new THREE.Plane(new THREE.Vector3(0, -1, 0), -value) : null;
      group.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh && (obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material as THREE.Material;
          const materials = Array.isArray(mat) ? mat : [mat];
          materials.forEach((m) => {
            if ('clippingPlanes' in m) {
              (m as THREE.Material & { clippingPlanes?: THREE.Plane[] }).clippingPlanes = plane ? [plane] : [];
              (m as THREE.Material & { clipIntersection?: boolean }).clipIntersection = false;
              if ('needsUpdate' in m) (m as THREE.Material & { needsUpdate?: boolean }).needsUpdate = true;
            }
          });
        }
      });
    }
    if (sv.property === 'highlightColor') {
      (group.userData as Record<string, unknown>).highlightColor = sv.value;
      const hex = typeof sv.value === 'number' ? sv.value : parseHex(String(sv.value));
      group.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh && (obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material as THREE.Material;
          const materials = Array.isArray(mat) ? mat : [mat];
          materials.forEach((m) => applyEmissive(m, hex, 0.25));
        }
      });
    }
    if (sv.property === 'outlineColor') {
      (group.userData as Record<string, unknown>).outlineColor = sv.value;
    }
    if (sv.property === 'outlineWidth') {
      (group.userData as Record<string, unknown>).outlineWidth = sv.value;
    }
  }
}

function disposeMaterial(m: THREE.Material): void {
  m.dispose();
  const mapKeys = ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap'] as const;
  const mat = m as unknown as Record<string, THREE.Texture | undefined>;
  for (const key of mapKeys) {
    const tex = mat[key];
    if (tex) tex.dispose();
  }
}

/**
 * Release geometry, materials, and textures used by the group.
 */
export function dispose(instance: THREE.Object3D): void {
  instance.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) {
        const mat = mesh.material;
        if (Array.isArray(mat)) mat.forEach(disposeMaterial);
        else disposeMaterial(mat);
      }
    }
  });
}
