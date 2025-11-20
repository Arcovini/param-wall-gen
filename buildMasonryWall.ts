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

  // Generate openings
  // Create a temporary instance of OpeningGenerator
  // In a real scenario, we might want to manage this instance better, but for now it's fine
  const openingGenerator = new OpeningGenerator();

  if (openings && openings.length > 0) {
    openings.forEach(opening => {
      const openingMesh = openingGenerator.createOpeningMesh(opening);
      // Add opening to the wall group
      // Note: The wall group has already been transformed by applyPlacement in generateWallGroup
      // So if we add children to it, they will be transformed relative to the wall group.
      // However, the opening positions are likely in world coordinates or relative to the wall's origin BEFORE transformation?
      // If opening positions are relative to the wall's local origin (bottom-center or similar), then adding them to wallGroup is correct.
      // If opening positions are absolute world coordinates, we shouldn't add them to the transformed wallGroup directly without inverse transform.

      // Assumption: Opening positions are relative to the wall's origin (0,0,0) before placement.
      // The wallGroup returned by generateWallGroup has placement applied.
      // So if we add to wallGroup, the opening will move WITH the wall.
      // This is likely the desired behavior.

      wallGroup.add(openingMesh);
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

