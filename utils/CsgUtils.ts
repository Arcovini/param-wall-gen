/**
 * CSG Utilities - Helper functions for CSG operations
 * Reduces code duplication in buildMasonryWall.ts
 */

import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Brush, Evaluator, SUBTRACTION, INTERSECTION } from 'three-bvh-csg';

export interface CsgOperationOptions {
  skipMergeVertices?: boolean;
  remapMaterialIndex?: { from: number; to: number };
  logPrefix?: string;
}

export interface BrushTransform {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
}

/**
 * Creates a brush with proper transform based on coordinate space
 * @param geometry - The geometry for the brush
 * @param material - The material for the brush
 * @param transform - Position, rotation, scale
 * @param isWorldSpace - If true, uses identity transform (geometry already in world space)
 */
export function createBrush(
  geometry: THREE.BufferGeometry,
  material: THREE.Material | THREE.Material[],
  transform: BrushTransform,
  isWorldSpace: boolean = false
): Brush {
  const brush = new Brush(geometry, material);

  if (isWorldSpace) {
    brush.position.set(0, 0, 0);
    brush.rotation.set(0, 0, 0);
    brush.scale.set(1, 1, 1);
  } else {
    brush.position.copy(transform.position);
    brush.rotation.copy(transform.rotation);
    brush.scale.copy(transform.scale);
  }

  brush.updateMatrixWorld();
  return brush;
}

/**
 * Post-processes CSG result geometry
 * - Optionally merges vertices
 * - Ensures uv2 attribute exists
 * - Recomputes normals
 * @param geometry - The geometry to process
 * @param options - Processing options
 */
export function postProcessCsgGeometry(
  geometry: THREE.BufferGeometry,
  options: CsgOperationOptions = {}
): THREE.BufferGeometry {
  let processedGeometry = geometry;

  // Merge vertices if not skipped
  if (!options.skipMergeVertices) {
    const merged = BufferGeometryUtils.mergeVertices(geometry, 0.001);
    if (merged !== geometry) {
      geometry.dispose();
      processedGeometry = merged;
    }
  }

  // Ensure uv2 exists for proper rendering (lightmap support)
  if (!processedGeometry.attributes.uv2 && processedGeometry.attributes.uv) {
    processedGeometry.setAttribute('uv2', processedGeometry.attributes.uv.clone());
  }

  // Recompute normals for proper lighting
  processedGeometry.computeVertexNormals();

  return processedGeometry;
}

/**
 * Remaps material indices in geometry groups
 * Useful for assigning cut faces to specific materials (e.g., cement)
 * @param geometry - The geometry with material groups
 * @param fromIndex - Source material index
 * @param toIndex - Target material index
 */
export function remapMaterialIndex(
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
 * Applies a CSG operation (subtraction or intersection) to a mesh
 * Handles all the complexity of CSG workflow:
 * - Brush creation
 * - Coordinate space management
 * - Post-processing
 * - Material remapping
 * - Geometry disposal
 *
 * @param targetMesh - The mesh to operate on
 * @param operandGeometry - The geometry to subtract/intersect
 * @param operandMaterial - The material of the operand
 * @param operandTransform - The transform of the operand
 * @param operation - SUBTRACTION or INTERSECTION
 * @param evaluator - The CSG evaluator
 * @param isWorldSpace - Whether target geometry is already in world space
 * @param options - Additional options
 * @returns Updated geometry or null if operation failed
 */
export function applyCsgToMesh(
  targetMesh: THREE.Mesh,
  operandGeometry: THREE.BufferGeometry,
  operandMaterial: THREE.Material | THREE.Material[],
  operandTransform: BrushTransform,
  operation: typeof SUBTRACTION | typeof INTERSECTION,
  evaluator: Evaluator,
  isWorldSpace: boolean = false,
  options: CsgOperationOptions = {}
): THREE.BufferGeometry | null {
  const logPrefix = options.logPrefix || 'CSG';

  try {
    // Create target brush
    const targetBrush = createBrush(
      targetMesh.geometry,
      targetMesh.material,
      {
        position: targetMesh.position,
        rotation: targetMesh.rotation,
        scale: targetMesh.scale
      },
      isWorldSpace
    );

    // Create operand brush
    const operandBrush = createBrush(
      operandGeometry,
      operandMaterial,
      operandTransform,
      false // operand is always in its own local space
    );

    // Perform CSG operation
    const result = evaluator.evaluate(targetBrush, operandBrush, operation);

    // Validate result
    if (!result || !result.geometry || result.geometry.attributes.position.count === 0) {
      console.warn(`${logPrefix}: CSG operation produced no geometry`);
      return null;
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
    const processedGeometry = postProcessCsgGeometry(result.geometry, options);

    console.log(`${logPrefix}: CSG operation completed successfully`);
    return processedGeometry;

  } catch (error) {
    console.error(`${logPrefix}: CSG operation failed:`, error);
    return null;
  }
}

/**
 * Applies multiple CSG operations sequentially to a mesh
 * Manages geometry disposal and coordinate space transitions
 *
 * @param targetMesh - The mesh to operate on
 * @param operations - Array of operations to apply
 * @param evaluator - The CSG evaluator
 * @returns True if any operation was applied successfully
 */
export interface CsgOperation {
  operandGeometry: THREE.BufferGeometry;
  operandMaterial: THREE.Material | THREE.Material[];
  operandTransform: BrushTransform;
  operation: typeof SUBTRACTION | typeof INTERSECTION;
  options?: CsgOperationOptions;
}

export function applySequentialCsg(
  targetMesh: THREE.Mesh,
  operations: CsgOperation[],
  evaluator: Evaluator
): boolean {
  if (operations.length === 0) return false;

  const originalGeometry = targetMesh.geometry.clone();
  let currentGeometry = originalGeometry;
  let csgApplied = false;
  let isWorldSpace = false;

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const logPrefix = op.options?.logPrefix || `Operation ${i + 1}`;

    // Create a temporary mesh with current geometry
    const tempMesh = new THREE.Mesh(currentGeometry, targetMesh.material);
    tempMesh.position.copy(isWorldSpace ? new THREE.Vector3(0, 0, 0) : targetMesh.position);
    tempMesh.rotation.copy(isWorldSpace ? new THREE.Euler(0, 0, 0) : targetMesh.rotation);
    tempMesh.scale.copy(isWorldSpace ? new THREE.Vector3(1, 1, 1) : targetMesh.scale);

    const result = applyCsgToMesh(
      tempMesh,
      op.operandGeometry,
      op.operandMaterial,
      op.operandTransform,
      op.operation,
      evaluator,
      isWorldSpace,
      op.options
    );

    if (result) {
      // Dispose previous iteration's geometry (but not original)
      if (csgApplied && currentGeometry !== originalGeometry) {
        currentGeometry.dispose();
      }
      currentGeometry = result;
      csgApplied = true;
      isWorldSpace = true; // After first CSG, geometry is in world space
    }
  }

  // Apply final geometry if any CSG was successful
  if (csgApplied) {
    targetMesh.geometry.dispose();
    targetMesh.geometry = currentGeometry;

    // CSG result is in world space - reset transform to identity
    targetMesh.position.set(0, 0, 0);
    targetMesh.rotation.set(0, 0, 0);
    targetMesh.scale.set(1, 1, 1);
    targetMesh.updateMatrix();
  } else {
    // No CSG applied, clean up
    if (currentGeometry !== originalGeometry) {
      currentGeometry.dispose();
    }
  }

  // Always dispose the original clone if we didn't use it
  if (targetMesh.geometry !== originalGeometry) {
    originalGeometry.dispose();
  }

  return csgApplied;
}

/**
 * Creates a brush from a mesh with its current transform
 */
export function createBrushFromMesh(mesh: THREE.Mesh, isWorldSpace: boolean = false): Brush {
  return createBrush(
    mesh.geometry,
    mesh.material,
    {
      position: mesh.position,
      rotation: mesh.rotation,
      scale: mesh.scale
    },
    isWorldSpace
  );
}

/**
 * Helper: Calculate Y bounds for a specific row
 */
export function getRowBounds(
  rowIndex: number,
  wallHeight: number,
  blockHeight: number,
  cementThickness: number
): { minY: number; maxY: number } {
  const rowHeight = blockHeight + cementThickness;
  const rowCenterY = -wallHeight / 2 + rowIndex * rowHeight + blockHeight / 2;

  return {
    minY: rowCenterY - (rowHeight / 2),
    maxY: rowCenterY + (rowHeight / 2)
  };
}

/**
 * Helper: Check if an opening intersects with a row
 */
export function doesOpeningIntersectRow(
  opening: { placement: { position: { y: number } }, size: { h: number } },
  rowIndex: number,
  wallHeight: number,
  blockHeight: number,
  cementThickness: number
): boolean {
  const openingBottomY = opening.placement.position.y - opening.size.h / 2;
  const openingTopY = opening.placement.position.y + opening.size.h / 2;
  const rowBounds = getRowBounds(rowIndex, wallHeight, blockHeight, cementThickness);

  return !(openingBottomY >= rowBounds.maxY || openingTopY <= rowBounds.minY);
}

/**
 * Helper: Filter openings that intersect a specific row
 */
export function getOpeningsForRow<T extends { placement: { position: { x: number; y: number; z: number } }, size: { h: number } }>(
  rowIndex: number,
  openings: T[],
  wallHeight: number,
  blockHeight: number,
  cementThickness: number
): T[] {
  return openings.filter(opening =>
    doesOpeningIntersectRow(opening, rowIndex, wallHeight, blockHeight, cementThickness)
  );
}
