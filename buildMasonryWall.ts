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
import { WallGenerator } from './wall/WallGenerator';
import { OpeningGenerator } from './OpeningGenerator';
import { Brush, Evaluator, SUBTRACTION, ADDITION } from 'three-bvh-csg';

// Create a single instance of WallGenerator to reuse resources (textures, materials)
// This significantly improves performance by avoiding recompilation/reloading on every update
const generator = new WallGenerator();

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

  // Generate openings and perform CSG subtraction
  const openingGenerator = new OpeningGenerator();

  if (openings && openings.length > 0) {
    const evaluator = new Evaluator();
    evaluator.attributes = ['position', 'normal', 'uv', 'uv2']; // Preserve attributes including uv2

    // 1. Create a combined brush for all openings
    let combinedOpeningBrush: Brush | null = null;

    openings.forEach(opening => {
      const openingMesh = openingGenerator.createOpeningMesh(opening);

      // Create a Brush from the opening mesh
      const openingBrush = new Brush(openingMesh.geometry, openingMesh.material);
      openingBrush.position.copy(openingMesh.position);
      openingBrush.rotation.copy(openingMesh.rotation);
      openingBrush.scale.copy(openingMesh.scale);
      openingBrush.updateMatrixWorld();

      if (!combinedOpeningBrush) {
        combinedOpeningBrush = openingBrush;
      } else {
        // Union with existing openings
        combinedOpeningBrush = evaluator.evaluate(combinedOpeningBrush, openingBrush, ADDITION);
      }
    });

    // 2. Subtract combined opening brush from wall mesh
    if (combinedOpeningBrush) {
      const wallMesh = wallGroup.getObjectByName("WallMesh") as THREE.Mesh;

      if (wallMesh) {
        try {
          console.log("Starting CSG Subtraction...");
          const wallBrush = new Brush(wallMesh.geometry, wallMesh.material);
          wallBrush.updateMatrixWorld();

          // Set opening brush material to match blocks (or main material)
          let blockMaterial: THREE.Material;
          if (Array.isArray(wallMesh.material) && wallMesh.material.length > 0) {
            blockMaterial = wallMesh.material[0];
          } else if (wallMesh.material instanceof THREE.Material) {
            blockMaterial = wallMesh.material;
          } else {
            // Fallback
            blockMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
          }

          (combinedOpeningBrush as Brush).material = blockMaterial;

          const result = evaluator.evaluate(wallBrush, combinedOpeningBrush as Brush, SUBTRACTION);
          console.log("CSG Subtraction complete. Result geometry groups:", result.geometry.groups);

          wallMesh.geometry.dispose();
          wallMesh.geometry = result.geometry;

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

  // Add metadata to the group
  wallGroup.userData = {
    objectType: 'MasonryWall',
    wall: wall,
    openings: openings,
    task: {
      completion: task.completion
    }
  };

  return wallGroup;
}

