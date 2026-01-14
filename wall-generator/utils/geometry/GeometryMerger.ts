import * as THREE from 'three';

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
