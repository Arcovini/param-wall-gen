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
      (group.userData as Record<string, unknown>).visibleHeight = sv.value;
      // TODO: apply horizontal clipPlane at y = visibleHeight when render path supports it
    }
    if (sv.property === 'highlightColor' || sv.property === 'outlineColor') {
      (group.userData as Record<string, unknown>)[sv.property] = sv.value;
      // TODO: apply via material.emissive or outline pass
    }
    if (sv.property === 'outlineWidth') {
      (group.userData as Record<string, unknown>).outlineWidth = sv.value;
      // TODO: apply via outline pass
    }
  }
}

function setOpacity(mat: THREE.Material, value: number): void {
  mat.opacity = value;
  mat.transparent = value < 1;
  if ('needsUpdate' in mat) (mat as THREE.Material & { needsUpdate?: boolean }).needsUpdate = true;
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
