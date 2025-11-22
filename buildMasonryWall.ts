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
import { Brush, Evaluator, SUBTRACTION, ADDITION } from 'three-bvh-csg';

// Create a single instance of WallManager to reuse resources (textures, materials)
// This significantly improves performance by avoiding recompilation/reloading on every update
const generator = new WallManager();

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

    // 1. Create a combined brush for all subtractions (openings + lintels)
    let combinedSubtractionBrush: Brush | null = null;

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

      if (intersects) {
        // Create a Brush from the opening mesh
        const openingBrush = new Brush(openingMesh.geometry, openingMesh.material);
        openingBrush.position.copy(openingMesh.position);
        openingBrush.rotation.copy(openingMesh.rotation);
        openingBrush.scale.copy(openingMesh.scale);
        openingBrush.updateMatrixWorld();

        if (!combinedSubtractionBrush) {
          // For the first subtraction, normalize it through an ADDITION with itself
          combinedSubtractionBrush = evaluator.evaluate(openingBrush, openingBrush, ADDITION);
        } else {
          // Union with existing subtractions
          combinedSubtractionBrush = evaluator.evaluate(combinedSubtractionBrush, openingBrush, ADDITION);
        }
      } else {
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
        wallGroup.userData.actualWallHeight || wallHeight // Pass current wall height
      );

      if (lintelMesh) {
        wallGroup.add(lintelMesh);

        // Add Lintel to CSG subtraction
        const lintelBrush = new Brush(lintelMesh.geometry, lintelMesh.material);
        lintelBrush.position.copy(lintelMesh.position);
        lintelBrush.rotation.copy(lintelMesh.rotation);
        lintelBrush.scale.copy(lintelMesh.scale);
        lintelBrush.updateMatrixWorld();

        if (!combinedSubtractionBrush) {
          combinedSubtractionBrush = evaluator.evaluate(lintelBrush, lintelBrush, ADDITION);
        } else {
          combinedSubtractionBrush = evaluator.evaluate(combinedSubtractionBrush, lintelBrush, ADDITION);
        }
      }
    });

    // 2. Subtract combined brush from wall mesh
    if (combinedSubtractionBrush) {
      const wallMesh = wallGroup.getObjectByName("WallMesh") as THREE.Mesh;

      if (wallMesh) {
        try {
          console.log("Starting CSG Subtraction...");
          // Store original geometry to restore if CSG fails
          const originalGeometry = wallMesh.geometry.clone();

          const wallBrush = new Brush(wallMesh.geometry, wallMesh.material);
          wallBrush.updateMatrixWorld();

          // Set subtraction brush material to match blocks (or main material)
          let blockMaterial: THREE.Material;
          if (Array.isArray(wallMesh.material) && wallMesh.material.length > 0) {
            blockMaterial = wallMesh.material[0];
          } else if (wallMesh.material instanceof THREE.Material) {
            blockMaterial = wallMesh.material;
          } else {
            // Fallback
            blockMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
          }

          (combinedSubtractionBrush as Brush).material = blockMaterial;

          console.log("WallBrush Attributes:", Object.keys(wallBrush.geometry.attributes));
          console.log("SubtractionBrush Attributes:", Object.keys((combinedSubtractionBrush as Brush).geometry.attributes));

          // Check for position specifically
          if (!wallBrush.geometry.attributes.position) console.error("WallBrush missing position!");
          if (!(combinedSubtractionBrush as Brush).geometry.attributes.position) console.error("SubtractionBrush missing position!");

          const result = evaluator.evaluate(wallBrush, combinedSubtractionBrush as Brush, SUBTRACTION);
          console.log("CSG Subtraction complete. Result geometry groups:", result.geometry.groups);

          // Validate the result geometry
          if (!result || !result.geometry || result.geometry.attributes.position.count === 0) {
            console.error("CSG operation resulted in empty or invalid geometry. Restoring original wall.");
            wallMesh.geometry.dispose();
            wallMesh.geometry = originalGeometry; // Restore original geometry
          } else {
            // Validate result has correct material groups
            const hasValidGroups = result.geometry.groups && result.geometry.groups.length >= 2;
            const hasCementGroup = result.geometry.groups.some(g => g.materialIndex === 1 && g.count > 0);

            if (hasValidGroups && hasCementGroup) {
              // Result is valid, apply it
              wallMesh.geometry.dispose();
              wallMesh.geometry = result.geometry;
              console.log("CSG result applied successfully");
            } else {
              // Result is corrupted, restore original
              console.warn("CSG result is corrupted (missing cement material group), restoring original geometry");
              result.geometry.dispose();
              // Keep original geometry (don't replace)
            }

            // Clean up the clone if we didn't need it
            if (wallMesh.geometry !== originalGeometry) {
              originalGeometry.dispose();
            }
          }

          // Re-assign materials if needed
          // The result mesh usually has materials set by the evaluator, but here we are just swapping geometry
          // on the existing mesh. The existing mesh has [Block, Cement].
          // The result geometry will have groups pointing to 0 and 1 (if we are lucky) or maybe more.
          // Since combinedOpeningBrush uses blockMaterial (which is index 0), the new faces should use index 0.
          // We need to ensure the mesh keeps its multi-material array.

        } catch (error) {
          console.error("CSG Operation failed:", error);
          // Continue without subtraction to avoid crashing the app
        }
      } else {
        console.warn("WallMesh not found for CSG");
      }
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

