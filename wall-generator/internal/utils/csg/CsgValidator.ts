import * as THREE from 'three';
import { Brush, Evaluator, ADDITION } from 'three-bvh-csg';

interface ManifoldResult {
  isManifold: boolean;
  message: string;
}

interface ManifoldResultWithDetails extends ManifoldResult {
  details: {
    edgeCheck: boolean;
    csgCheck: boolean;
    vertexCount: number;
    triangleCount: number;
  };
}

/**
 * Checks if a geometry is a closed manifold (watertight).
 * A closed manifold mesh has every edge shared by exactly 2 faces.
 */
function isManifold(geometry: THREE.BufferGeometry): ManifoldResult {
  if (!geometry.index) {
    return { isManifold: false, message: 'Geometry has no index buffer' };
  }

  const index = geometry.index;
  const count = index.count;
  const edges: { [key: string]: number } = {};

  for (let i = 0; i < count; i += 3) {
    const a = index.getX(i);
    const b = index.getX(i + 1);
    const c = index.getX(i + 2);

    const e1 = a < b ? `${a}_${b}` : `${b}_${a}`;
    const e2 = b < c ? `${b}_${c}` : `${c}_${b}`;
    const e3 = c < a ? `${c}_${a}` : `${a}_${c}`;

    edges[e1] = (edges[e1] || 0) + 1;
    edges[e2] = (edges[e2] || 0) + 1;
    edges[e3] = (edges[e3] || 0) + 1;
  }

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
 * Enhanced manifold check using three-bvh-csg capabilities.
 * Validates geometry using edge analysis and CSG operations.
 */
export function isManifoldWithBVH(geometry: THREE.BufferGeometry): ManifoldResultWithDetails {
  const edgeResult = isManifold(geometry);

  const details = {
    edgeCheck: edgeResult.isManifold,
    csgCheck: false,
    vertexCount: geometry.attributes.position ? geometry.attributes.position.count : 0,
    triangleCount: geometry.index ? geometry.index.count / 3 : 0
  };

  if (!edgeResult.isManifold) {
    return {
      isManifold: false,
      message: `Edge check failed: ${edgeResult.message}`,
      details
    };
  }

  // CSG operation validation - try a union with itself
  try {
    const evaluator = new Evaluator();
    evaluator.attributes = ['position', 'normal'];

    const material = new THREE.MeshBasicMaterial();
    const brush = new Brush(geometry, material);
    brush.updateMatrixWorld();

    const result = evaluator.evaluate(brush, brush, ADDITION);

    if (result && result.geometry && result.geometry.attributes.position.count > 0) {
      details.csgCheck = true;
      console.log('[CSG Check] Self-union succeeded, result has',
        result.geometry.attributes.position.count, 'vertices');
      result.geometry.dispose();
      material.dispose();
    } else {
      material.dispose();
      return {
        isManifold: false,
        message: 'CSG self-union produced empty result',
        details
      };
    }
  } catch (error) {
    return {
      isManifold: false,
      message: `CSG operation failed: ${error}`,
      details
    };
  }

  return {
    isManifold: true,
    message: 'Geometry passed all manifold checks (edge and CSG)',
    details
  };
}
