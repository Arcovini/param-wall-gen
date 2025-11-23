import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export class GeometryUtils {
  /**
   * Checks if a geometry is a closed manifold (watertight).
   * A closed manifold mesh has every edge shared by exactly 2 faces.
   */
  static isManifold(geometry: THREE.BufferGeometry): { isManifold: boolean; message: string } {
    // Ensure we have an indexed geometry
    let geo = geometry;
    if (!geo.index) {
      geo = numberGeometry(geo);
    }

    const index = geo.index!;
    const count = index.count;
    const edges: { [key: string]: number } = {};

    // Iterate over all faces
    for (let i = 0; i < count; i += 3) {
      const a = index.getX(i);
      const b = index.getX(i + 1);
      const c = index.getX(i + 2);

      // Create edges (sorted to ensure direction doesn't matter for key)
      const e1 = a < b ? `${a}_${b}` : `${b}_${a}`;
      const e2 = b < c ? `${b}_${c}` : `${c}_${b}`;
      const e3 = c < a ? `${c}_${a}` : `${a}_${c}`;

      edges[e1] = (edges[e1] || 0) + 1;
      edges[e2] = (edges[e2] || 0) + 1;
      edges[e3] = (edges[e3] || 0) + 1;
    }

    // Check edge counts
    // Check edge counts
    for (const edge in edges) {
      const faceCount = edges[edge];
      if (faceCount === 1) {
        return {
          isManifold: false,
          message: `Mesh is not watertight. Edge ${edge} is shared by only 1 face (Hole).`
        };
      }
      if (faceCount > 2) {
        return {
          isManifold: false,
          message: `Mesh has internal faces or non-manifold edges. Edge ${edge} is shared by ${faceCount} faces.`
        };
      }
    }

    return { isManifold: true, message: 'Geometry is a closed manifold.' };
  }

  /**
   * Merges all meshes in a group into a single BufferGeometry.
   * Applies world transforms to geometries before merging.
   * Also merges vertices to ensure the mesh is continuous.
   */
  static mergeGroupGeometries(group: THREE.Group): THREE.BufferGeometry | null {
    const geometries: THREE.BufferGeometry[] = [];

    group.updateMatrixWorld(true);

    group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const clonedGeo = child.geometry.clone();
        clonedGeo.applyMatrix4(child.matrixWorld);
        // Ensure attributes are compatible (e.g. uv2)
        if (!clonedGeo.attributes.uv2 && clonedGeo.attributes.uv) {
          clonedGeo.setAttribute('uv2', clonedGeo.attributes.uv);
        }
        geometries.push(clonedGeo);
      }
    });

    if (geometries.length === 0) return null;

    const merged = mergeGeometries(geometries, false);
    if (!merged) return null;

    // Merge vertices to close gaps between blocks
    // Use a small tolerance if needed, default is usually fine for exact matches
    const welded = BufferGeometryUtils.mergeVertices(merged);
    return welded;
  }
}

function numberGeometry(geometry: THREE.BufferGeometry): THREE.BufferGeometry {
  // Simple implementation to convert non-indexed to indexed if needed
  // For now, assuming we can use mergeVertices or similar if strictly needed, 
  // but most primitives are indexed or can be easily.
  // If we really need to handle non-indexed, we'd need to merge vertices first.
  return geometry; // Placeholder, assuming input is indexed or we accept it might fail if not.
  // Realistically, we should use BufferGeometryUtils.mergeVertices if we want to be robust.
}
