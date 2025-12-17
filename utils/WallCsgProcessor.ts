/**
 * WallCsgProcessor - Higher-level CSG processing workflows for masonry walls
 * Handles complex operations like row processing, infill, and lintels
 */

import * as THREE from 'three';
import { Evaluator, SUBTRACTION, INTERSECTION } from 'three-bvh-csg';
import {
  applySequentialCsg,
  getOpeningsForRow,
  getRowBounds,
  type CsgOperation
} from './CsgUtils';

/**
 * Processes infill mesh with CSG operations
 * - Subtracts intersecting openings
 * - Intersects with actual wall bounds
 */
export function processInfillCsg(
  infillMesh: THREE.Mesh,
  openingDataList: Array<{
    opening: any;
    mesh: THREE.Mesh;
    intersectsWall: boolean;
  }>,
  actualWallGeometry: THREE.BufferGeometry,
  actualWallY: number,
  evaluator: Evaluator
): void {
  // Get infill bounds
  const infillBox = new THREE.Box3().setFromObject(infillMesh);
  const infillMinY = infillBox.min.y;
  const infillMaxY = infillBox.max.y;

  // Find openings that intersect with infill
  const intersectingOpenings = openingDataList.filter(data => {
    if (!data.intersectsWall) return false;

    const openingBottomY = data.opening.placement.position.y - data.opening.size.h / 2;
    const openingTopY = data.opening.placement.position.y + data.opening.size.h / 2;

    return !(openingBottomY >= infillMaxY || openingTopY <= infillMinY);
  });

  if (intersectingOpenings.length === 0) return;

  console.log(`Infill: Processing ${intersectingOpenings.length} intersecting opening(s)`);

  // Build operations array
  const operations: CsgOperation[] = intersectingOpenings.map(data => ({
    operandGeometry: data.mesh.geometry,
    operandMaterial: data.mesh.material,
    operandTransform: {
      position: data.mesh.position,
      rotation: data.mesh.rotation,
      scale: data.mesh.scale
    },
    operation: SUBTRACTION,
    options: {
      logPrefix: 'Infill opening subtraction'
    }
  }));

  // Apply all operations
  const success = applySequentialCsg(infillMesh, operations, evaluator);

  if (success) {
    console.log('Infill: All opening subtractions completed successfully');
  }
}

/**
 * Processes lintel meshes with CSG operations
 * - Subtracts intersecting openings from each lintel
 */
export function processLintelsCsg(
  lintelMeshes: THREE.Mesh[],
  openingDataList: Array<{
    opening: any;
    mesh: THREE.Mesh;
    intersectsWall: boolean;
  }>,
  evaluator: Evaluator
): void {
  if (lintelMeshes.length === 0) return;

  console.log(`Processing ${lintelMeshes.length} lintel(s) for CSG subtraction`);

  lintelMeshes.forEach((lintelMesh, lintelIndex) => {
    // Get lintel bounds
    const lintelBox = new THREE.Box3().setFromObject(lintelMesh);

    // Find openings that intersect with this lintel
    const intersectingOpenings = openingDataList.filter(data => {
      if (!data.intersectsWall) return false;

      const openingBox = new THREE.Box3().setFromObject(data.mesh);

      // Check 3D AABB intersection
      return lintelBox.intersectsBox(openingBox);
    });

    if (intersectingOpenings.length === 0) return;

    console.log(`Lintel ${lintelIndex}: Processing ${intersectingOpenings.length} intersecting opening(s)`);

    // Build operations array
    const operations: CsgOperation[] = intersectingOpenings.map(data => ({
      operandGeometry: data.mesh.geometry,
      operandMaterial: data.mesh.material,
      operandTransform: {
        position: data.mesh.position,
        rotation: data.mesh.rotation,
        scale: data.mesh.scale
      },
      operation: SUBTRACTION,
      options: {
        logPrefix: `Lintel ${lintelIndex} opening subtraction`,
        remapMaterialIndex: { from: 1, to: 0 } // Remap cut faces to Lintel material
      }
    }));

    // Apply all operations
    const success = applySequentialCsg(lintelMesh, operations, evaluator);

    if (success) {
      console.log(`Lintel ${lintelIndex}: All CSG operations completed successfully`);
    }
  });
}

/**
 * Processes a single row with CSG operations
 * - Subtracts intersecting openings
 * - Subtracts intersecting lintels
 * - Intersects with actual wall bounds (horizontal cut with cement caps)
 */
export function processRowCsg(
  rowMesh: THREE.Mesh,
  rowIndex: number,
  openings: any[],
  openingDataList: Array<{
    opening: any;
    mesh: THREE.Mesh;
    lintelMesh: THREE.Mesh | null;
    intersectsWall: boolean;
  }>,
  wallHeight: number,
  blockHeight: number,
  cementThickness: number,
  actualWallGeometry: THREE.BufferGeometry,
  actualWallY: number,
  evaluator: Evaluator
): void {
  const operations: CsgOperation[] = [];

  // 1. Add opening subtractions
  const openingsForThisRow = getOpeningsForRow(
    rowIndex,
    openings,
    wallHeight,
    blockHeight,
    cementThickness
  );

  if (openingsForThisRow.length > 0) {
    console.log(`Row ${rowIndex}: Processing ${openingsForThisRow.length} intersecting opening(s)`);

    openingsForThisRow.forEach(opening => {
      const openingData = openingDataList.find(d => d.opening === opening);
      if (!openingData || !openingData.intersectsWall) return;

      operations.push({
        operandGeometry: openingData.mesh.geometry,
        operandMaterial: openingData.mesh.material,
        operandTransform: {
          position: openingData.mesh.position,
          rotation: openingData.mesh.rotation,
          scale: openingData.mesh.scale
        },
        operation: SUBTRACTION,
        options: {
          logPrefix: `Row ${rowIndex} opening subtraction`,
          skipMergeVertices: true, // Preserve material groups
          remapMaterialIndex: { from: 2, to: 1 } // Remap cut faces to Cement
        }
      });
    });
  }

  // 2. Add lintel subtractions
  const lintelsForThisRow = openingDataList.filter(data => {
    if (!data.lintelMesh) return false;

    const lintelBox = new THREE.Box3().setFromObject(data.lintelMesh);
    const rowBounds = getRowBounds(rowIndex, wallHeight, blockHeight, cementThickness);

    return !(lintelBox.max.y <= rowBounds.minY || lintelBox.min.y >= rowBounds.maxY);
  });

  if (lintelsForThisRow.length > 0) {
    console.log(`Row ${rowIndex}: Processing ${lintelsForThisRow.length} intersecting lintel(s)`);

    lintelsForThisRow.forEach(data => {
      if (!data.lintelMesh) return;

      operations.push({
        operandGeometry: data.lintelMesh.geometry,
        operandMaterial: data.lintelMesh.material,
        operandTransform: {
          position: data.lintelMesh.position,
          rotation: data.lintelMesh.rotation,
          scale: data.lintelMesh.scale
        },
        operation: SUBTRACTION,
        options: {
          logPrefix: `Row ${rowIndex} lintel subtraction`
        }
      });
    });
  }

  // 3. Add horizontal cut (intersection with actual wall bounds)
  if (actualWallGeometry) {
    operations.push({
      operandGeometry: actualWallGeometry,
      operandMaterial: new THREE.MeshBasicMaterial(),
      operandTransform: {
        position: new THREE.Vector3(0, actualWallY, 0),
        rotation: new THREE.Euler(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1)
      },
      operation: INTERSECTION,
      options: {
        logPrefix: `Row ${rowIndex} horizontal cut`,
        skipMergeVertices: true, // Preserve material groups
        remapMaterialIndex: { from: 2, to: 1 } // Remap cut faces to Cement
      }
    });
  }

  // Apply all operations sequentially
  if (operations.length > 0) {
    const success = applySequentialCsg(rowMesh, operations, evaluator);

    if (success) {
      console.log(`Row ${rowIndex}: All CSG operations completed successfully`);
    }
  }
}

/**
 * Processes all rows with CSG operations
 * Unified logic for both with-openings and without-openings cases
 */
export function processAllRowsCsg(
  rowMeshes: THREE.Mesh[],
  openings: any[],
  openingDataList: Array<{
    opening: any;
    mesh: THREE.Mesh;
    lintelMesh: THREE.Mesh | null;
    intersectsWall: boolean;
  }>,
  wallHeight: number,
  blockHeight: number,
  cementThickness: number,
  actualWallWidth: number,
  actualWallHeight: number,
  wallLength: number,
  evaluator: Evaluator
): void {
  if (rowMeshes.length === 0) return;

  console.log(`Starting per-row CSG: ${rowMeshes.length} rows, ${openings.length} openings`);

  // Create actualWall geometry for horizontal cutting (shared by all rows)
  const actualWallGeometry = new THREE.BoxGeometry(actualWallWidth, actualWallHeight, wallLength * 1.2);
  const actualWallY = -wallHeight / 2 + actualWallHeight / 2;

  // Ensure uv2 exists on actualWall geometry for CSG
  if (!actualWallGeometry.attributes.uv2 && actualWallGeometry.attributes.uv) {
    actualWallGeometry.setAttribute('uv2', actualWallGeometry.attributes.uv.clone());
  }

  console.log(`[WallCsgProcessor] Actual wall bounds for horizontal cutting: ${actualWallWidth}x${actualWallHeight}`);

  // Process each row
  rowMeshes.forEach((rowMesh, rowIndex) => {
    // Ensure uv2 exists before CSG
    if (!rowMesh.geometry.attributes.uv2 && rowMesh.geometry.attributes.uv) {
      rowMesh.geometry.setAttribute('uv2', rowMesh.geometry.attributes.uv.clone());
    }

    processRowCsg(
      rowMesh,
      rowIndex,
      openings,
      openingDataList,
      wallHeight,
      blockHeight,
      cementThickness,
      actualWallGeometry,
      actualWallY,
      evaluator
    );
  });

  // Clean up shared geometry
  actualWallGeometry.dispose();
}

/**
 * Intersects meshes with actual wall bounds
 * Used for infill and lintels to ensure they only exist where wall material exists
 */
export function intersectWithActualWall(
  meshes: THREE.Mesh[],
  actualWallGeometry: THREE.BufferGeometry,
  actualWallY: number,
  evaluator: Evaluator,
  meshType: string = 'Mesh'
): void {
  if (meshes.length === 0) return;

  const actualWallMaterial = new THREE.MeshBasicMaterial();

  meshes.forEach((mesh, index) => {
    if (!mesh || mesh.geometry.attributes.position.count === 0) {
      return;
    }

    try {
      console.log(`Intersecting ${meshType} ${index} with actual wall bounds`);

      const operations: CsgOperation[] = [{
        operandGeometry: actualWallGeometry,
        operandMaterial: actualWallMaterial,
        operandTransform: {
          position: new THREE.Vector3(0, actualWallY, 0),
          rotation: new THREE.Euler(0, 0, 0),
          scale: new THREE.Vector3(1, 1, 1)
        },
        operation: INTERSECTION,
        options: {
          logPrefix: `${meshType} ${index} intersection`
        }
      }];

      const success = applySequentialCsg(mesh, operations, evaluator);

      if (success) {
        console.log(`${meshType} ${index}: Intersection with actual wall completed`);
      } else if (meshType === 'Lintel') {
        // No intersection with actual wall (e.g. lintel is floating above the wall)
        console.log(`${meshType} ${index}: No intersection with actual wall, removing`);
        mesh.removeFromParent();
        mesh.geometry.dispose();
      }
    } catch (error) {
      console.error(`${meshType} ${index}: Failed to intersect with actual wall:`, error);
    }
  });
}
