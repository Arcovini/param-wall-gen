/**
 * CSG Operations - Provides a clean API for CSG boolean operations.
 * Hides the complexity of three-bvh-csg (Evaluator, Brush, etc.)
 */

import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Brush, Evaluator, SUBTRACTION, INTERSECTION } from 'three-bvh-csg';

// === Public Types ===

export interface CsgOptions {
  /** Remap material indices on cut faces */
  remapMaterialIndex?: { from: number; to: number };
  /** Skip vertex merging (preserves material groups) */
  preserveGroups?: boolean;
  /** Log prefix for debugging */
  logPrefix?: string;
}

export interface CsgSession {
  /** Subtract operand from target mesh (modifies target in-place) */
  subtract(target: THREE.Mesh, operand: THREE.Mesh, options?: CsgOptions): boolean;

  /** Subtract multiple operands from target mesh */
  subtractMany(target: THREE.Mesh, operands: THREE.Mesh[], options?: CsgOptions): boolean;

  /** Intersect target with bounds mesh (clips target to bounds) */
  intersect(target: THREE.Mesh, bounds: THREE.Mesh, options?: CsgOptions): boolean;
}

// === Public API ===

/**
 * Creates a CSG session with a configured evaluator.
 * Use this to perform multiple CSG operations efficiently.
 */
export function createSession(): CsgSession {
  const evaluator = new Evaluator();
  evaluator.attributes = ['position', 'normal', 'uv', 'uv2'];
  evaluator.useGroups = true;

  return {
    subtract(target: THREE.Mesh, operand: THREE.Mesh, options?: CsgOptions): boolean {
      return applyCsgOperation(target, operand, SUBTRACTION, evaluator, options);
    },

    subtractMany(target: THREE.Mesh, operands: THREE.Mesh[], options?: CsgOptions): boolean {
      let success = false;
      for (const operand of operands) {
        if (applyCsgOperation(target, operand, SUBTRACTION, evaluator, options)) {
          success = true;
        }
      }
      return success;
    },

    intersect(target: THREE.Mesh, bounds: THREE.Mesh, options?: CsgOptions): boolean {
      return applyCsgOperation(target, bounds, INTERSECTION, evaluator, options);
    }
  };
}

// === Internal Implementation ===

interface BrushTransform {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
}

/**
 * Applies a single CSG operation to a target mesh.
 */
function applyCsgOperation(
  target: THREE.Mesh,
  operand: THREE.Mesh,
  operation: typeof SUBTRACTION | typeof INTERSECTION,
  evaluator: Evaluator,
  options: CsgOptions = {}
): boolean {
  const logPrefix = options.logPrefix || 'CSG';

  try {
    // Ensure UV2 exists on both geometries
    ensureUv2(target.geometry);
    ensureUv2(operand.geometry);

    // Create brushes
    const targetBrush = createBrush(
      target.geometry,
      target.material,
      { position: target.position, rotation: target.rotation, scale: target.scale }
    );

    const operandBrush = createBrush(
      operand.geometry,
      operand.material,
      { position: operand.position, rotation: operand.rotation, scale: operand.scale }
    );

    // Perform CSG operation
    const result = evaluator.evaluate(targetBrush, operandBrush, operation);

    if (!result || !result.geometry || result.geometry.attributes.position.count === 0) {
      console.warn(`${logPrefix}: CSG operation produced no geometry`);
      return false;
    }

    // Remap material indices if specified
    if (options.remapMaterialIndex) {
      remapMaterialIndex(
        result.geometry,
        options.remapMaterialIndex.from,
        options.remapMaterialIndex.to
      );
    }

    // Post-process geometry
    const processedGeometry = postProcessGeometry(result.geometry, options);

    // Update target mesh
    target.geometry.dispose();
    target.geometry = processedGeometry;

    // CSG result is in world space - reset transform
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

/**
 * Creates a CSG brush with the given transform.
 */
function createBrush(
  geometry: THREE.BufferGeometry,
  material: THREE.Material | THREE.Material[],
  transform: BrushTransform
): Brush {
  const brush = new Brush(geometry, material);
  brush.position.copy(transform.position);
  brush.rotation.copy(transform.rotation);
  brush.scale.copy(transform.scale);
  brush.updateMatrixWorld();
  return brush;
}

/**
 * Post-processes CSG result geometry.
 */
function postProcessGeometry(
  geometry: THREE.BufferGeometry,
  options: CsgOptions
): THREE.BufferGeometry {
  let processed = geometry;

  // Merge vertices if not skipped
  if (!options.preserveGroups) {
    const merged = BufferGeometryUtils.mergeVertices(geometry, 0.001);
    if (merged !== geometry) {
      geometry.dispose();
      processed = merged;
    }
  }

  // Ensure uv2 exists
  ensureUv2(processed);

  // Recompute normals
  processed.computeVertexNormals();

  return processed;
}

/**
 * Remaps material indices in geometry groups.
 */
function remapMaterialIndex(
  geometry: THREE.BufferGeometry,
  fromIndex: number,
  toIndex: number
): void {
  if (geometry.groups) {
    geometry.groups.forEach(group => {
      if (group.materialIndex === fromIndex) {
        group.materialIndex = toIndex;
      }
    });
  }
}

/**
 * Ensures geometry has uv2 attribute.
 */
function ensureUv2(geometry: THREE.BufferGeometry): void {
  if (!geometry.attributes.uv2 && geometry.attributes.uv) {
    geometry.setAttribute('uv2', geometry.attributes.uv.clone());
  }
}
