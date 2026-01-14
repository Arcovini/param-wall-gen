import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Brush, Evaluator, SUBTRACTION, INTERSECTION } from 'three-bvh-csg';

export interface CsgOptions {
  remapMaterialIndex?: { from: number; to: number };
  preserveGroups?: boolean;
  logPrefix?: string;
}

export interface CsgSession {
  subtract(target: THREE.Mesh, operand: THREE.Mesh, options?: CsgOptions): boolean;
  intersect(target: THREE.Mesh, bounds: THREE.Mesh, options?: CsgOptions): boolean;
}

export function createSession(): CsgSession {
  const evaluator = new Evaluator();
  evaluator.attributes = ['position', 'normal', 'uv', 'uv2'];
  evaluator.useGroups = true;

  return {
    subtract(target: THREE.Mesh, operand: THREE.Mesh, options?: CsgOptions): boolean {
      return applyCsgOperation(target, operand, SUBTRACTION, evaluator, options);
    },
    intersect(target: THREE.Mesh, bounds: THREE.Mesh, options?: CsgOptions): boolean {
      return applyCsgOperation(target, bounds, INTERSECTION, evaluator, options);
    }
  };
}

function applyCsgOperation(
  target: THREE.Mesh,
  operand: THREE.Mesh,
  operation: typeof SUBTRACTION | typeof INTERSECTION,
  evaluator: Evaluator,
  options: CsgOptions = {}
): boolean {
  const logPrefix = options.logPrefix || 'CSG';

  try {
    ensureUv2(target.geometry);
    ensureUv2(operand.geometry);

    const targetBrush = createBrush(target);
    const operandBrush = createBrush(operand);

    const result = evaluator.evaluate(targetBrush, operandBrush, operation);

    if (!result?.geometry || result.geometry.attributes.position.count === 0) {
      console.warn(`${logPrefix}: CSG operation produced no geometry`);
      return false;
    }

    if (options.remapMaterialIndex) {
      const { from, to } = options.remapMaterialIndex;
      result.geometry.groups?.forEach(group => {
        if (group.materialIndex === from) {
          group.materialIndex = to;
        }
      });
    }

    const processedGeometry = postProcessGeometry(result.geometry, options.preserveGroups);

    target.geometry.dispose();
    target.geometry = processedGeometry;

    target.position.set(0, 0, 0);
    target.rotation.set(0, 0, 0);
    target.scale.set(1, 1, 1);
    target.updateMatrix();

    console.log(`${logPrefix}: CSG operation completed successfully`);
    return true;
  } catch (error) {
    console.error(`${logPrefix}: CSG operation failed:`, error);
    return false;
  }
}

function createBrush(mesh: THREE.Mesh): Brush {
  const brush = new Brush(mesh.geometry, mesh.material);
  brush.position.copy(mesh.position);
  brush.rotation.copy(mesh.rotation);
  brush.scale.copy(mesh.scale);
  brush.updateMatrixWorld();
  return brush;
}

function postProcessGeometry(
  geometry: THREE.BufferGeometry,
  preserveGroups?: boolean
): THREE.BufferGeometry {
  let processed = geometry;

  if (!preserveGroups) {
    const merged = BufferGeometryUtils.mergeVertices(geometry, 0.001);
    if (merged !== geometry) {
      geometry.dispose();
      processed = merged;
    }
  }

  ensureUv2(processed);
  processed.computeVertexNormals();

  return processed;
}

function ensureUv2(geometry: THREE.BufferGeometry): void {
  if (!geometry.attributes.uv2 && geometry.attributes.uv) {
    geometry.setAttribute('uv2', geometry.attributes.uv.clone());
  }
}
