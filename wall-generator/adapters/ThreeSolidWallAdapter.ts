/**
 * Three.js adapter for Solid Wall (wall-solid.md §13)
 *
 * - updateInstance(): apply ElementStyleUpdate (clipPlane/visibleHeight, opacity, highlight, outline)
 * - dispose(): release geometry, materials, textures
 *
 * Implementations are stubs; each behavior can be refined in follow-up steps.
 */

import * as THREE from 'three';
import type { ElementStyleUpdate } from '../types';

/**
 * updateInstance — Apply style update to the wall group.
 * Applies: opacity, visibleHeight (clipPlane to be applied when supported),
 * highlightColor, outlineColor, outlineWidth.
 */
export function updateInstance(
  meshOrGroup: THREE.Object3D,
  styleUpdate: ElementStyleUpdate
): void {
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
        value > 0
          ? new THREE.Plane(new THREE.Vector3(0, -1, 0), -value)
          : null;
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
      const intensity = 0.25;
      group.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh && (obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material as THREE.Material;
          const materials = Array.isArray(mat) ? mat : [mat];
          materials.forEach((m) => applyEmissive(m, hex, intensity));
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
 * dispose — Release geometry, materials, and textures used by the wall group.
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

function disposeMaterial(m: THREE.Material): void {
  m.dispose();
  const mapKeys = ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap'] as const;
  const mat = m as unknown as Record<string, THREE.Texture | undefined>;
  for (const key of mapKeys) {
    const tex = mat[key];
    if (tex) tex.dispose();
  }
}
