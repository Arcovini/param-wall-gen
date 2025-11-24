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
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { BuildMasonryWallParams } from './types';
import { WallManager } from './wall/WallManager';
import { OpeningGenerator } from './OpeningGenerator';
import { InfillGenerator } from './InfillGenerator';
import { LintelGenerator } from './LintelGenerator';
import { Brush, Evaluator, SUBTRACTION, INTERSECTION, ADDITION } from 'three-bvh-csg';

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
    evaluator.useGroups = true; // Explicitly enable material groups handling

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
        wallGroup.userData.actualWallHeight || wallHeight,
        cementThickness
      );

      if (lintelMesh) {
        // Explicitly align lintel with opening mesh to ensure horizontal centering
        // This overrides any potential discrepancy in LintelGenerator's positioning
        lintelMesh.position.x = openingMesh.position.x;
        lintelMesh.position.z = openingMesh.position.z;

        // Ensure vertical positioning is correct (bottom of lintel at top of opening)
        // openingTopY is openingY + size.h / 2
        // Add cementThickness to account for the mortar joint between opening and lintel
        const openingTopY = opening.placement.position.y + opening.size.h / 2;
        const lintelHeight = (lintelMesh.geometry as THREE.BoxGeometry).parameters.height;
        lintelMesh.position.y = openingTopY + cementThickness + lintelHeight;

        wallGroup.add(lintelMesh);
      }

      openingDataList.push({
        opening,
        mesh: openingMesh,
        lintelMesh,
        intersectsWall: intersects
      });

      console.log(`[Debug] Opening ${openingDataList.length}:
        Pos: (${opening.placement.position.x}, ${opening.placement.position.y}, ${opening.placement.position.z})
        Size: ${opening.size.l}x${opening.size.h}x${opening.size.w}
        Mesh Pos: (${openingMesh.position.x}, ${openingMesh.position.y}, ${openingMesh.position.z})
        Lintel Pos: ${lintelMesh ? `(${lintelMesh.position.x}, ${lintelMesh.position.y}, ${lintelMesh.position.z})` : 'N/A'}
        Lintel Width: ${lintelMesh ? (lintelMesh.geometry as THREE.BoxGeometry).parameters.width : 'N/A'}
      `);
    });

    // Create a map for fast opening lookup
    const openingMap = new Map<typeof openings[0], OpeningData>();
    openingDataList.forEach(data => {
      openingMap.set(data.opening, data);
    });

    // 2. Apply CSG to infill (subtract openings from top infill)
    const infillMesh = wallGroup.children.find(
      child => child instanceof THREE.Mesh && child.name === "TopInfill"
    ) as THREE.Mesh | undefined;

    if (infillMesh) {
      console.log('Processing infill CSG subtraction');

      // Get infill bounds
      const infillBox = new THREE.Box3().setFromObject(infillMesh);
      const infillMinY = infillBox.min.y;
      const infillMaxY = infillBox.max.y;

      // Find openings that intersect with infill
      const intersectingOpenings = openingDataList.filter(data => {
        if (!data.intersectsWall) return false;

        const openingBottomY = data.opening.placement.position.y - data.opening.size.h / 2;
        const openingTopY = data.opening.placement.position.y + data.opening.size.h / 2;

        // Check if opening intersects infill Y-bounds
        return !(openingBottomY >= infillMaxY || openingTopY <= infillMinY);
      });

      if (intersectingOpenings.length > 0) {
        console.log(`Infill: Processing ${intersectingOpenings.length} intersecting opening(s)`);

        // Store original geometry to restore if CSG fails
        const originalGeometry = infillMesh.geometry.clone();
        let currentGeometry = originalGeometry;
        let csgApplied = false;
        let isFirstIteration = true;

        // Subtract each opening from the infill
        intersectingOpenings.forEach(openingData => {
          try {
            const infillBrush = new Brush(currentGeometry, infillMesh.material);

            // Only apply position on first iteration
            if (isFirstIteration) {
              infillBrush.position.copy(infillMesh.position);
              infillBrush.rotation.copy(infillMesh.rotation);
              infillBrush.scale.copy(infillMesh.scale);
            } else {
              infillBrush.position.set(0, 0, 0);
              infillBrush.rotation.set(0, 0, 0);
              infillBrush.scale.set(1, 1, 1);
            }
            infillBrush.updateMatrixWorld();

            // Subtract opening
            const openingBrush = new Brush(openingData.mesh.geometry, openingData.mesh.material);
            openingBrush.position.copy(openingData.mesh.position);
            openingBrush.rotation.copy(openingData.mesh.rotation);
            openingBrush.scale.copy(openingData.mesh.scale);
            openingBrush.updateMatrixWorld();

            const result = evaluator.evaluate(infillBrush, openingBrush, SUBTRACTION);

            // Post-CSG cleanup: merge vertices and recompute normals
            if (result && result.geometry && result.geometry.attributes.position.count > 0) {
              const mergedGeometry = BufferGeometryUtils.mergeVertices(result.geometry, 0.001);
              result.geometry.dispose();
              result.geometry = mergedGeometry;

              // Ensure uv2 exists for proper rendering
              if (!result.geometry.attributes.uv2 && result.geometry.attributes.uv) {
                result.geometry.setAttribute('uv2', result.geometry.attributes.uv.clone());
              }

              result.geometry.computeVertexNormals();

              // Dispose previous iteration's geometry (but not original)
              if (!isFirstIteration && currentGeometry !== originalGeometry) {
                currentGeometry.dispose();
              }
              currentGeometry = result.geometry;
              csgApplied = true;
              isFirstIteration = false;
              console.log('Infill: Applied opening subtraction successfully');
            }
          } catch (error) {
            console.error('Infill: Failed to subtract opening:', error);
          }
        });

        // Apply final geometry if any CSG was successful
        if (csgApplied) {
          infillMesh.geometry.dispose();
          infillMesh.geometry = currentGeometry;

          // CSG result is in world space - reset transform to identity
          infillMesh.position.set(0, 0, 0);
          infillMesh.rotation.set(0, 0, 0);
          infillMesh.scale.set(1, 1, 1);
          infillMesh.updateMatrix();

          console.log('Infill: All CSG operations completed successfully');
        } else {
          // No CSG applied, clean up
          if (currentGeometry !== originalGeometry) {
            currentGeometry.dispose();
          }
        }

        // Always dispose the original clone if we didn't use it
        if (infillMesh.geometry !== originalGeometry) {
          originalGeometry.dispose();
        }
      }
    }

    // 3. Apply CSG to lintels (subtract openings from lintels)
    const lintelMeshes = openingDataList
      .map(data => data.lintelMesh)
      .filter((mesh): mesh is THREE.Mesh => mesh !== null);

    if (lintelMeshes.length > 0) {
      console.log(`Processing ${lintelMeshes.length} lintel(s) for CSG subtraction`);

      lintelMeshes.forEach((lintelMesh, lintelIndex) => {
        // Get lintel bounds
        const lintelBox = new THREE.Box3().setFromObject(lintelMesh);
        const lintelMinY = lintelBox.min.y;
        const lintelMaxY = lintelBox.max.y;
        const lintelMinX = lintelBox.min.x;
        const lintelMaxX = lintelBox.max.x;
        const lintelMinZ = lintelBox.min.z;
        const lintelMaxZ = lintelBox.max.z;

        // Find openings that intersect with this lintel
        const intersectingOpenings = openingDataList.filter(data => {
          if (!data.intersectsWall) return false;

          const openingMinY = data.opening.placement.position.y - data.opening.size.h / 2;
          const openingMaxY = data.opening.placement.position.y + data.opening.size.h / 2;
          const openingMinX = data.opening.placement.position.x - data.opening.size.l / 2;
          const openingMaxX = data.opening.placement.position.x + data.opening.size.l / 2;
          const openingMinZ = data.opening.placement.position.z - data.opening.size.w / 2;
          const openingMaxZ = data.opening.placement.position.z + data.opening.size.w / 2;

          // Check 3D AABB intersection
          return !(
            openingMinY >= lintelMaxY || openingMaxY <= lintelMinY ||
            openingMinX >= lintelMaxX || openingMaxX <= lintelMinX ||
            openingMinZ >= lintelMaxZ || openingMaxZ <= lintelMinZ
          );
        });

        if (intersectingOpenings.length > 0) {
          console.log(`Lintel ${lintelIndex}: Processing ${intersectingOpenings.length} intersecting opening(s)`);

          // Store original geometry to restore if CSG fails
          const originalGeometry = lintelMesh.geometry.clone();
          let currentGeometry = originalGeometry;
          let csgApplied = false;
          let isFirstIteration = true;

          // Subtract each opening from the lintel
          intersectingOpenings.forEach(openingData => {
            try {
              const lintelBrush = new Brush(currentGeometry, lintelMesh.material);

              // Only apply position on first iteration
              if (isFirstIteration) {
                lintelBrush.position.copy(lintelMesh.position);
                lintelBrush.rotation.copy(lintelMesh.rotation);
                lintelBrush.scale.copy(lintelMesh.scale);
              } else {
                lintelBrush.position.set(0, 0, 0);
                lintelBrush.rotation.set(0, 0, 0);
                lintelBrush.scale.set(1, 1, 1);
              }
              lintelBrush.updateMatrixWorld();

              // Subtract opening
              const openingBrush = new Brush(openingData.mesh.geometry, openingData.mesh.material);
              openingBrush.position.copy(openingData.mesh.position);
              openingBrush.rotation.copy(openingData.mesh.rotation);
              openingBrush.scale.copy(openingData.mesh.scale);
              openingBrush.updateMatrixWorld();

              const result = evaluator.evaluate(lintelBrush, openingBrush, SUBTRACTION);

              // Post-CSG cleanup: merge vertices and recompute normals
              if (result && result.geometry && result.geometry.attributes.position.count > 0) {
                // Remap cut faces (index 1) to Lintel Material (index 0)
                // Lintel has 1 material (0), Opening adds 1 (1)
                if (result.geometry.groups) {
                  result.geometry.groups.forEach(group => {
                    if (group.materialIndex === 1) {
                      group.materialIndex = 0;
                    }
                  });
                }

                const mergedGeometry = BufferGeometryUtils.mergeVertices(result.geometry, 0.001);
                result.geometry.dispose();
                result.geometry = mergedGeometry;

                // Ensure uv2 exists for proper rendering
                if (!result.geometry.attributes.uv2 && result.geometry.attributes.uv) {
                  result.geometry.setAttribute('uv2', result.geometry.attributes.uv.clone());
                }

                result.geometry.computeVertexNormals();

                // Dispose previous iteration's geometry (but not original)
                if (!isFirstIteration && currentGeometry !== originalGeometry) {
                  currentGeometry.dispose();
                }
                currentGeometry = result.geometry;
                csgApplied = true;
                isFirstIteration = false;
                console.log(`Lintel ${lintelIndex}: Applied opening subtraction successfully`);
              }
            } catch (error) {
              console.error(`Lintel ${lintelIndex}: Failed to subtract opening:`, error);
            }
          });

          // Apply final geometry if any CSG was successful
          if (csgApplied) {
            lintelMesh.geometry.dispose();
            lintelMesh.geometry = currentGeometry;

            // CSG result is in world space - reset transform to identity
            lintelMesh.position.set(0, 0, 0);
            lintelMesh.rotation.set(0, 0, 0);
            lintelMesh.scale.set(1, 1, 1);
            lintelMesh.updateMatrix();

            console.log(`Lintel ${lintelIndex}: All CSG operations completed successfully`);
          } else {
            // No CSG applied, clean up
            if (currentGeometry !== originalGeometry) {
              currentGeometry.dispose();
            }
          }

          // Always dispose the original clone if we didn't use it
          if (lintelMesh.geometry !== originalGeometry) {
            originalGeometry.dispose();
          }
        }
      });
    }

    // 4. Find all row meshes
    const rowMeshes = wallGroup.children.filter(
      child => child instanceof THREE.Mesh && child.name.startsWith("RowMesh_")
    ) as THREE.Mesh[];

    console.log(`Starting per-row CSG: ${rowMeshes.length} rows, ${openingDataList.length} openings`);

    // 5. For each row, perform CSG with relevant openings
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
          // Log geometry info before CSG
          if (isFirstIteration) {
            console.log(`Row ${rowIndex}: Input geometry - vertices: ${currentGeometry.attributes.position.count}, indexed: ${!!currentGeometry.index}`);
            console.log(`Row ${rowIndex}: Opening geometry - vertices: ${openingData.mesh.geometry.attributes.position.count}, indexed: ${!!openingData.mesh.geometry.index}`);
          }

          // Use indexed geometry directly for CSG
          // Manifold indexed geometry may produce better boundary faces
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

          if (result && result.geometry) {
            const groupInfo = result.geometry.groups ? `groups: ${result.geometry.groups.length}` : 'no groups';
            console.log(`Row ${rowIndex}: CSG result - vertices: ${result.geometry.attributes.position.count}, indexed: ${!!result.geometry.index}, ${groupInfo}`);

            if (result.geometry.groups && result.geometry.groups.length > 0) {
              result.geometry.groups.forEach((g, i) => {
                console.log(`  Group ${i}: start=${g.start}, count=${g.count}, materialIndex=${g.materialIndex}`);
              });
            }
          }

          // Post-CSG cleanup
          if (result && result.geometry && result.geometry.attributes.position.count > 0) {
            // SKIP mergeVertices as it destroys material groups!
            // The CSG result already has correct groups for the cut faces.

            // Remap cut faces (index 2) to Cement (index 1)
            // The opening brush adds a new material group at the end (index 2)
            if (result.geometry.groups) {
              result.geometry.groups.forEach(group => {
                if (group.materialIndex === 2) {
                  group.materialIndex = 1; // Set to Cement
                }
              });
            }

            // Ensure uv2 exists for proper rendering
            if (!result.geometry.attributes.uv2 && result.geometry.attributes.uv) {
              result.geometry.setAttribute('uv2', result.geometry.attributes.uv.clone());
            }

            result.geometry.computeVertexNormals();
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

      // Separate loop for Lintel Subtraction
      // Lintels might intersect rows that the opening itself doesn't (since lintel is above opening)
      // So we need to check all lintels against this row
      const lintelsForThisRow = openingDataList.filter(data => {
        if (!data.lintelMesh) return false;

        const lintelBox = new THREE.Box3().setFromObject(data.lintelMesh);
        const rowBounds = getRowBounds(rowIndex, wallHeight, blockHeight, cementThickness);

        // Check Y-axis intersection
        // Note: rowBounds are in local Y relative to wall center, but lintelBox is in world Y (if placed in group)
        // However, getRowBounds returns Y relative to wall center (0,0,0)
        // And lintelMesh is placed relative to wall center (0,0,0)
        // So coordinate systems match

        return !(lintelBox.max.y <= rowBounds.minY || lintelBox.min.y >= rowBounds.maxY);
      });

      if (lintelsForThisRow.length > 0) {
        console.log(`Row ${rowIndex}: Processing ${lintelsForThisRow.length} intersecting lintel(s)`);

        lintelsForThisRow.forEach(data => {
          if (!data.lintelMesh) return;

          try {
            // Subtract lintel
            const lintelBrush = new Brush(data.lintelMesh.geometry, data.lintelMesh.material);
            lintelBrush.position.copy(data.lintelMesh.position);
            lintelBrush.rotation.copy(data.lintelMesh.rotation);
            lintelBrush.scale.copy(data.lintelMesh.scale);
            lintelBrush.updateMatrixWorld();

            // Prepare row brush
            // If CSG was already applied (by openings or previous lintels), geometry is in world space
            // If not, it's in local space
            const rowBrush = new Brush(currentGeometry, rowMesh.material);

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

            let result = evaluator.evaluate(rowBrush, lintelBrush, SUBTRACTION);

            // Post-CSG cleanup for lintel subtraction
            if (result && result.geometry && result.geometry.attributes.position.count > 0) {
              const mergedGeometry = BufferGeometryUtils.mergeVertices(result.geometry, 0.001);
              result.geometry.dispose();
              result.geometry = mergedGeometry;

              // Ensure uv2 exists for proper rendering
              if (!result.geometry.attributes.uv2 && result.geometry.attributes.uv) {
                result.geometry.setAttribute('uv2', result.geometry.attributes.uv.clone());
              }

              result.geometry.computeVertexNormals();

              // Update geometry
              if (!isFirstIteration && currentGeometry !== originalGeometry) {
                currentGeometry.dispose();
              }
              currentGeometry = result.geometry;
              csgApplied = true;
              isFirstIteration = false;
              console.log(`Row ${rowIndex}: Applied lintel subtraction successfully`);
            }
          } catch (error) {
            console.error(`Row ${rowIndex}: Failed to subtract lintel:`, error);
          }
        });
      }

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

    // 6. Intersect infill and lintels with actual wall bounds
    // This ensures they only exist where the actual wall material exists

    // Recalculate actual wall width to ensure we have the precise masonry dimensions
    // independent of userData which might be stale or missing
    const blocksHorizontal = Math.floor(wallWidth / (blockWidth + cementThickness));
    const calculatedActualWidth = blocksHorizontal > 0
      ? blocksHorizontal * blockWidth + (blocksHorizontal - 1) * cementThickness
      : 0;

    const actualWallWidth = calculatedActualWidth;
    const actualWallHeight = wallGroup.userData.actualWallHeight || wallHeight;

    if (actualWallWidth > 0 && actualWallHeight > 0) {
      console.log(`[buildMasonryWall] Intersecting with Actual Wall: ${actualWallWidth}x${actualWallHeight}`);

      // Create a box geometry representing the actual wall bounds
      // Make it slightly deeper (1.2x) to ensure clean intersection with lintels in Z-axis
      const actualWallGeometry = new THREE.BoxGeometry(actualWallWidth, actualWallHeight, wallLength * 1.2);
      const actualWallMaterial = new THREE.MeshBasicMaterial();

      // Position at the bottom of the wall (same as row positioning)
      const actualWallY = -wallHeight / 2 + actualWallHeight / 2;

      // 6a. Intersect infill with actual wall
      if (infillMesh && infillMesh.geometry.attributes.position.count > 0) {
        try {
          console.log('Intersecting infill with actual wall bounds');

          const infillBrush = new Brush(infillMesh.geometry, infillMesh.material);
          infillBrush.position.copy(infillMesh.position);
          infillBrush.rotation.copy(infillMesh.rotation);
          infillBrush.scale.copy(infillMesh.scale);
          infillBrush.updateMatrixWorld();

          const wallBrush = new Brush(actualWallGeometry, actualWallMaterial);
          wallBrush.position.set(0, actualWallY, 0);
          wallBrush.updateMatrixWorld();

          const result = evaluator.evaluate(infillBrush, wallBrush, INTERSECTION);

          if (result && result.geometry && result.geometry.attributes.position.count > 0) {
            const mergedGeometry = BufferGeometryUtils.mergeVertices(result.geometry, 0.001);
            result.geometry.dispose();

            // Ensure uv2 exists for proper rendering
            if (!mergedGeometry.attributes.uv2 && mergedGeometry.attributes.uv) {
              mergedGeometry.setAttribute('uv2', mergedGeometry.attributes.uv.clone());
            }

            mergedGeometry.computeVertexNormals();

            infillMesh.geometry.dispose();
            infillMesh.geometry = mergedGeometry;

            // Result is in world space
            infillMesh.position.set(0, 0, 0);
            infillMesh.rotation.set(0, 0, 0);
            infillMesh.scale.set(1, 1, 1);
            infillMesh.updateMatrix();

            console.log('Infill: Intersection with actual wall completed');
          }
        } catch (error) {
          console.error('Infill: Failed to intersect with actual wall:', error);
        }
      }

      // 6b. Intersect lintels with actual wall
      if (lintelMeshes.length > 0) {
        lintelMeshes.forEach((lintelMesh, lintelIndex) => {
          if (!lintelMesh || lintelMesh.geometry.attributes.position.count === 0) {
            return;
          }

          try {
            console.log(`Intersecting lintel ${lintelIndex} with actual wall bounds`);

            const lintelBrush = new Brush(lintelMesh.geometry, lintelMesh.material);
            lintelBrush.position.copy(lintelMesh.position);
            lintelBrush.rotation.copy(lintelMesh.rotation);
            lintelBrush.scale.copy(lintelMesh.scale);
            lintelBrush.updateMatrixWorld();

            const wallBrush = new Brush(actualWallGeometry, actualWallMaterial);
            wallBrush.position.set(0, actualWallY, 0);
            wallBrush.updateMatrixWorld();

            const result = evaluator.evaluate(lintelBrush, wallBrush, INTERSECTION);

            if (result && result.geometry && result.geometry.attributes.position.count > 0) {
              const mergedGeometry = BufferGeometryUtils.mergeVertices(result.geometry, 0.001);
              result.geometry.dispose();

              // Ensure uv2 exists for proper rendering
              if (!mergedGeometry.attributes.uv2 && mergedGeometry.attributes.uv) {
                mergedGeometry.setAttribute('uv2', mergedGeometry.attributes.uv.clone());
              }

              mergedGeometry.computeVertexNormals();

              lintelMesh.geometry.dispose();
              lintelMesh.geometry = mergedGeometry;

              // Result is in world space
              lintelMesh.position.set(0, 0, 0);
              lintelMesh.rotation.set(0, 0, 0);
              lintelMesh.scale.set(1, 1, 1);
              lintelMesh.updateMatrix();

              console.log(`Lintel ${lintelIndex}: Intersection with actual wall completed`);
            } else {
              // No intersection with actual wall (e.g. lintel is floating above the wall)
              // Remove the lintel from the scene
              console.log(`Lintel ${lintelIndex}: No intersection with actual wall, removing lintel`);
              lintelMesh.removeFromParent();
              lintelMesh.geometry.dispose();
            }
          } catch (error) {
            console.error(`Lintel ${lintelIndex}: Failed to intersect with actual wall:`, error);
          }
        });
      }

      // Clean up the temporary actual wall geometry
      actualWallGeometry.dispose();
    }
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

