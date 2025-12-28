import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// === Geometry Merging ===

/**
 * Merges all meshes in a group into a single BufferGeometry.
 * Applies world transforms to geometries before merging.
 * Also merges vertices to ensure the mesh is continuous.
 */
export function mergeGroupGeometries(group: THREE.Group): THREE.BufferGeometry | null {
  const geometries: THREE.BufferGeometry[] = [];

  group.updateMatrixWorld(true);

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const clonedGeo = child.geometry.clone();
      clonedGeo.applyMatrix4(child.matrixWorld);
      if (!clonedGeo.attributes.uv2 && clonedGeo.attributes.uv) {
        clonedGeo.setAttribute('uv2', clonedGeo.attributes.uv);
      }
      geometries.push(clonedGeo);
    }
  });

  if (geometries.length === 0) return null;

  const merged = mergeGeometries(geometries, false);
  if (!merged) return null;

  const welded = mergeVertices(merged);
  return welded;
}

// === Spatial Queries ===

/**
 * Checks if two meshes' bounding boxes intersect.
 */
export function meshesIntersect(a: THREE.Mesh, b: THREE.Mesh): boolean {
  const boxA = new THREE.Box3().setFromObject(a);
  const boxB = new THREE.Box3().setFromObject(b);
  return boxA.intersectsBox(boxB);
}

/**
 * Filters candidates to only those whose bounding boxes intersect with target.
 */
export function filterIntersecting<T extends { mesh: THREE.Mesh }>(
  target: THREE.Mesh,
  candidates: T[]
): T[] {
  const targetBox = new THREE.Box3().setFromObject(target);
  return candidates.filter(c => {
    const box = new THREE.Box3().setFromObject(c.mesh);
    return targetBox.intersectsBox(box);
  });
}

/**
 * Checks if two Y-ranges overlap.
 */
export function yRangesOverlap(
  a: { min: number; max: number },
  b: { min: number; max: number }
): boolean {
  return !(a.min >= b.max || a.max <= b.min);
}

/**
 * Gets the bounding box of a mesh.
 */
export function getMeshBounds(mesh: THREE.Mesh): THREE.Box3 {
  return new THREE.Box3().setFromObject(mesh);
}

/**
 * Gets the Y-axis bounds of a mesh.
 */
export function getMeshYBounds(mesh: THREE.Mesh): { min: number; max: number } {
  const box = new THREE.Box3().setFromObject(mesh);
  return { min: box.min.y, max: box.max.y };
}

/**
 * Creates a box mesh for use as CSG bounds.
 */
export function createBoundsMesh(
  width: number,
  height: number,
  depth: number,
  positionY: number
): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshBasicMaterial();

  if (!geometry.attributes.uv2 && geometry.attributes.uv) {
    geometry.setAttribute('uv2', geometry.attributes.uv.clone());
  }

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, positionY, 0);
  mesh.updateMatrixWorld();

  return mesh;
}
