/**
 * buildMasonryWall - Main API function for generating parametric masonry walls
 *
 * Implements the specification from the PDF challenge:
 * - Creates realistic masonry wall with ceramic blocks and cement joints
 * - Supports openings (doors, windows)
 * - Adds lintels above openings (when needed)
 * - Adds infill (encunhamento) at top
 * - Respects construction completion percentage
 */

import * as THREE from 'three';
import type { BuildMasonryWallParams } from './types';
import { WallManager } from './wall/WallManager';
import { OpeningGenerator } from './OpeningGenerator';
import { InfillGenerator } from './InfillGenerator';
import { LintelGenerator } from './LintelGenerator';
import { Brush, Evaluator, SUBTRACTION } from 'three-bvh-csg';

// Create a single instance of WallManager to reuse resources (textures, materials)
// This significantly improves performance by avoiding recompilation/reloading on every update
const generator = new WallManager();

/**
 * Helper: Calculate Y bounds for a specific row
 */
function getRowBounds(
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
 * Helper: Get array of row indices that intersect with an opening
 */
function getRowsIntersectingOpening(
  opening: { placement: { position: { y: number } }, size: { h: number } },
  wallHeight: number,
  blockHeight: number,
  cementThickness: number,
  totalRows: number
): number[] {
  const openingBottomY = opening.placement.position.y - opening.size.h / 2;
  const openingTopY = opening.placement.position.y + opening.size.h / 2;

  const rowHeight = blockHeight + cementThickness;
  const intersectingRows: number[] = [];

  for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
    const rowBounds = getRowBounds(rowIndex, wallHeight, blockHeight, cementThickness);

    // Check if opening intersects this row
    const intersects = !(openingBottomY >= rowBounds.maxY || openingTopY <= rowBounds.minY);

    if (intersects) {
      intersectingRows.push(rowIndex);
    }
  }

  return intersectingRows;
}

/**
 * Helper: Filter openings that intersect a specific row
 */
function getOpeningsForRow<T extends { placement: { position: { x: number; y: number; z: number } }, size: { h: number } }>(
  rowIndex: number,
  openings: T[],
  wallHeight: number,
  blockHeight: number,
  cementThickness: number
): T[] {
  const rowBounds = getRowBounds(rowIndex, wallHeight, blockHeight, cementThickness);

  return openings.filter(opening => {
    const openingBottomY = opening.placement.position.y - opening.size.h / 2;
    const openingTopY = opening.placement.position.y + opening.size.h / 2;

    // Check if opening intersects this row
    return !(openingBottomY >= rowBounds.maxY || openingTopY <= rowBounds.minY);
  });
}

/**
 * Generates a masonry wall based on the provided parameters.
 *
 * @param params - The parameters for building the wall.
 * @returns A THREE.Group containing the generated wall meshes.
 */
export function buildMasonryWall(params: BuildMasonryWallParams): THREE.Group {
  const { wall, openings, task } = params;

  // Extract wall dimensions
  // Note: We map the params to the generator's expected input
  // wall.size.w -> wallWidth (horizontal length)
  // wall.size.h -> wallHeight (vertical height)
  // wall.size.l -> wallLength (depth/thickness)
  const wallWidth = wall.size.w;
  const wallHeight = wall.size.h;
  const wallLength = wall.size.l;

  // Extract block dimensions
  const blockWidth = wall.blockSize.l;
  const blockHeight = wall.blockSize.h;

  // Extract cement thickness
  const cementThickness = wall.cementThickness;

  // Extract placement
  const positionX = wall.placement.position.x;
  const positionY = wall.placement.position.y;
  const positionZ = wall.placement.position.z;

  // Convert yaw from radians (params) to degrees (generator) if needed, 
  // or just pass radians if generator expects them.
  // WallGenerator.generateWallGroup expects yawDegrees.
  // params.wall.placement.direction.yaw is in radians.
  const yawDegrees = wall.placement.direction.yaw * (180 / Math.PI);

  // Generate the wall group using the singleton generator
  const wallGroup = generator.generateWallGroup(
    wallWidth,
    wallHeight,
    wallLength,
    blockWidth,
    blockHeight,
    cementThickness,
    positionX,
    positionY,
    positionZ,
    yawDegrees,
    task.completion
  );

  // Add top infill (encunhamento) if wall is 100% complete
  if (task.completion >= 1.0) {
    const infillGenerator = new InfillGenerator();
    const actualWallWidth = wallGroup.userData.actualWallWidth || wallWidth;

    const infillMesh = infillGenerator.createTopInfill(
      actualWallWidth,
      wallHeight,
      wallLength,
      blockHeight,
      cementThickness
    );

    if (infillMesh) {
      wallGroup.add(infillMesh);
    }
  }

  // Generate openings and perform CSG subtraction
  const openingGenerator = new OpeningGenerator();
  const lintelGenerator = new LintelGenerator();

  if (openings && openings.length > 0) {
    const evaluator = new Evaluator();
    evaluator.attributes = ['position', 'normal', 'uv', 'uv2']; // Preserve attributes including uv2

    // Calculate wall bounds for intersection testing
    const wallHalfWidth = wallWidth / 2;
    const wallHalfHeight = wallHeight / 2;
    const wallHalfLength = wallLength / 2;

    // 1. Create opening meshes and store them with their data
    type OpeningData = {
      opening: typeof openings[0];
      mesh: THREE.Mesh;
      lintelMesh: THREE.Mesh | null;
      intersectsWall: boolean;
    };

    const openingDataList: OpeningData[] = [];

    openings.forEach(opening => {
      const openingMesh = openingGenerator.createOpeningMesh(opening);

      // Check if opening intersects with wall bounds
      const openingHalfWidth = opening.size.l / 2;
      const openingHalfHeight = opening.size.h / 2;
      const openingHalfDepth = opening.size.w / 2;

      const openingX = opening.placement.position.x;
      const openingY = opening.placement.position.y;
      const openingZ = opening.placement.position.z;

      // Simple AABB intersection test (assumes wall is centered at origin before placement)
      const intersects =
        Math.abs(openingX) < (wallHalfWidth + openingHalfWidth) &&
        Math.abs(openingY) < (wallHalfHeight + openingHalfHeight) &&
        Math.abs(openingZ) < (wallHalfLength + openingHalfDepth);

      if (!intersects) {
        console.warn('Opening is outside wall bounds, skipping CSG operation:', opening.placement.position);
      }

      // Visualization (always show, even if out of bounds)
      if (params.visualization && params.visualization !== 'none') {
        const visMesh = openingMesh.clone();
        if (params.visualization === 'wireframe') {
          visMesh.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        } else {
          // Default is red from OpeningGenerator
          visMesh.material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5 });
        }
        wallGroup.add(visMesh);
      }

      // Generate Lintel for this opening
      const lintelMesh = lintelGenerator.createLintel(
        opening,
        wallHeight,
        wallLength,
        blockHeight,
        blockWidth,
        wallGroup.userData.actualWallHeight || wallHeight
      );

      if (lintelMesh) {
        wallGroup.add(lintelMesh);
      }

      openingDataList.push({
        opening,
        mesh: openingMesh,
        lintelMesh,
        intersectsWall: intersects
      });
    });

    // Create a map for fast opening lookup
    const openingMap = new Map<typeof openings[0], OpeningData>();
    openingDataList.forEach(data => {
      openingMap.set(data.opening, data);
    });

    // 2. Find all row meshes
    const rowMeshes = wallGroup.children.filter(
      child => child instanceof THREE.Mesh && child.name.startsWith("RowMesh_")
    ) as THREE.Mesh[];

    console.log(`Starting per-row CSG: ${rowMeshes.length} rows, ${openingDataList.length} openings`);

    // 3. For each row, perform CSG with relevant openings
    rowMeshes.forEach((rowMesh, rowIndex) => {
      // Find openings that intersect this row
      const openingsForThisRow = getOpeningsForRow(
        rowIndex,
        openings,
        wallHeight,
        blockHeight,
        cementThickness
      );

      if (openingsForThisRow.length === 0) {
        return; // Skip rows with no openings
      }

      console.log(`Row ${rowIndex}: Processing ${openingsForThisRow.length} intersecting opening(s)`);

      // Store original geometry to restore if CSG fails
      const originalGeometry = rowMesh.geometry.clone();
      let currentGeometry = originalGeometry;
      let csgApplied = false;
      let isFirstIteration = true;

      // Iterate over openings and subtract each one individually
      openingsForThisRow.forEach(opening => {
        const openingData = openingMap.get(opening);

        if (!openingData || !openingData.intersectsWall) {
          return;
        }

        try {
          // Create row brush from current geometry
          const rowBrush = new Brush(currentGeometry, rowMesh.material);

          // Only apply position on first iteration (original geometry in local space)
          // After first CSG, geometry is in world space - use identity transform
          if (isFirstIteration) {
            rowBrush.position.copy(rowMesh.position);
            rowBrush.rotation.copy(rowMesh.rotation);
            rowBrush.scale.copy(rowMesh.scale);
          } else {
            rowBrush.position.set(0, 0, 0);
            rowBrush.rotation.set(0, 0, 0);
            rowBrush.scale.set(1, 1, 1);
          }
          rowBrush.updateMatrixWorld();

          // Subtract opening
          const openingBrush = new Brush(openingData.mesh.geometry, openingData.mesh.material);
          openingBrush.position.copy(openingData.mesh.position);
          openingBrush.rotation.copy(openingData.mesh.rotation);
          openingBrush.scale.copy(openingData.mesh.scale);
          openingBrush.updateMatrixWorld();

          let result = evaluator.evaluate(rowBrush, openingBrush, SUBTRACTION);

          // Subtract lintel if it exists
          if (openingData.lintelMesh && result && result.geometry) {
            const lintelBrush = new Brush(openingData.lintelMesh.geometry, openingData.lintelMesh.material);
            lintelBrush.position.copy(openingData.lintelMesh.position);
            lintelBrush.rotation.copy(openingData.lintelMesh.rotation);
            lintelBrush.scale.copy(openingData.lintelMesh.scale);
            lintelBrush.updateMatrixWorld();

            // Result from previous CSG is in world space - use identity transform
            const tempBrush = new Brush(result.geometry, rowMesh.material);
            tempBrush.position.set(0, 0, 0);
            tempBrush.rotation.set(0, 0, 0);
            tempBrush.scale.set(1, 1, 1);
            tempBrush.updateMatrixWorld();

            result = evaluator.evaluate(tempBrush, lintelBrush, SUBTRACTION);
          }

          // Validate and update current geometry
          if (result && result.geometry && result.geometry.attributes.position.count > 0) {
            const hasValidGroups = result.geometry.groups && result.geometry.groups.length >= 1;
            const hasAnyFaces = result.geometry.groups.some(g => g.count > 0);

            if (hasValidGroups && hasAnyFaces) {
              // Dispose previous iteration's geometry (but not original)
              if (!isFirstIteration && currentGeometry !== originalGeometry) {
                currentGeometry.dispose();
              }
              currentGeometry = result.geometry;
              csgApplied = true;
              isFirstIteration = false;  // Subsequent iterations use world-space geometry
              console.log(`Row ${rowIndex}: Applied opening successfully`);
            }
          }
        } catch (error) {
          console.error(`Row ${rowIndex}: Failed to subtract opening:`, error);
        }
      });

      // Apply final geometry if any CSG was successful
      if (csgApplied) {
        rowMesh.geometry.dispose();
        rowMesh.geometry = currentGeometry;

        // CSG result is in world space - reset transform to identity
        rowMesh.position.set(0, 0, 0);
        rowMesh.rotation.set(0, 0, 0);
        rowMesh.scale.set(1, 1, 1);
        rowMesh.updateMatrix();

        console.log(`Row ${rowIndex}: All CSG operations completed successfully`);
      } else {
        // No CSG applied, clean up
        if (currentGeometry !== originalGeometry) {
          currentGeometry.dispose();
        }
      }

      // Always dispose the original clone if we didn't use it
      if (rowMesh.geometry !== originalGeometry) {
        originalGeometry.dispose();
      }
    });
  }

  // We can dispose the generator's material if we don't cache it, 
  // but since we want the meshes to keep the material, we shouldn't dispose it immediately 
  // unless we clone the material for each mesh or share it globally.
  // For this simple implementation, let's just let the GC handle the class instance, 
  // but the material needs to persist. 
  // The OpeningGenerator creates a material in constructor. 
  // If we dispose it, the meshes will lose their material.
  // So we should NOT call dispose() here if we want the meshes to be visible.
  // Ideally OpeningGenerator should be a singleton or managed resource if we want to reuse materials.
  // For now, creating a new material for each build call is acceptable but not optimal.

  // Add metadata to the group (preserve existing userData from WallGenerator)
  wallGroup.userData = {
    ...wallGroup.userData, // Preserve actualWallWidth, actualWallHeight
    objectType: 'MasonryWall',
    wall: wall,
    openings: openings,
    task: {
      completion: task.completion
    }
  };

  return wallGroup;
}

