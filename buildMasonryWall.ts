/**
 * buildMasonryWall - Main API function for generating parametric masonry walls
 *
 * - Creates realistic masonry wall with ceramic blocks and cement joints
 * - Supports openings (doors, windows)
 * - Adds lintels above openings (when needed)
 * - Adds infill (encunhamento) at top
 * - Respects construction completion percentage
 *
 * REFACTORED: Now uses centralized CSG utilities to reduce code duplication
 */

import * as THREE from 'three';
import type { BuildMasonryWallParams } from './types';
import { WallManager } from './wall/WallManager';
import { OpeningGenerator } from './wall/OpeningGenerator';
import { InfillGenerator } from './wall/InfillGenerator';
import { LintelGenerator } from './wall/LintelGenerator';
import { Evaluator } from 'three-bvh-csg';
import {
  processInfillCsg,
  processLintelsCsg,
  processAllRowsCsg,
  intersectWithActualWall
} from './utils/WallCsgProcessor';

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
  const yawDegrees = wall.placement.direction.yaw * (180 / Math.PI);

  // Calculate actual wall height based on completion percentage
  const totalRows = Math.floor(wallHeight / (blockHeight + cementThickness));
  const visibleRows = Math.floor(totalRows * Math.max(0, Math.min(1, task.completion)));
  const actualWallHeight = visibleRows > 0
    ? visibleRows * blockHeight + (visibleRows - 1) * cementThickness
    : 0;

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
    evaluator.attributes = ['position', 'normal', 'uv', 'uv2'];
    evaluator.useGroups = true;

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
        actualWallHeight,
        cementThickness
      );

      if (lintelMesh) {
        lintelMesh.position.x = openingMesh.position.x;
        lintelMesh.position.z = openingMesh.position.z;

        const openingHeight = (openingMesh.geometry as THREE.BoxGeometry).parameters.height;
        const openingTopY = opening.placement.position.y + openingHeight / 2;
        const lintelHeight = (lintelMesh.geometry as THREE.BoxGeometry).parameters.height;
        lintelMesh.position.y = openingTopY + lintelHeight / 2;

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

    // 2. Apply CSG to infill (subtract openings)
    const infillMesh = wallGroup.children.find(
      child => child instanceof THREE.Mesh && child.name === "TopInfill"
    ) as THREE.Mesh | undefined;

    if (infillMesh) {
      processInfillCsg(infillMesh, openingDataList, null as any, 0, evaluator);
    }

    // 3. Apply CSG to lintels (subtract openings)
    const lintelMeshes = openingDataList
      .map(data => data.lintelMesh)
      .filter((mesh): mesh is THREE.Mesh => mesh !== null);

    processLintelsCsg(lintelMeshes, openingDataList, evaluator);

    // 4. Calculate actual wall dimensions
    const blocksHorizontal = Math.floor(wallWidth / (blockWidth + cementThickness));
    const calculatedActualWidth = blocksHorizontal > 0
      ? blocksHorizontal * blockWidth + (blocksHorizontal - 1) * cementThickness
      : 0;
    const actualWallWidth = wallGroup.userData.actualWallWidth || calculatedActualWidth;

    // 5. Process all rows with CSG (openings, lintels, and horizontal cuts)
    const rowMeshes = wallGroup.children.filter(
      child => child instanceof THREE.Mesh && child.name.startsWith("RowMesh_")
    ) as THREE.Mesh[];

    processAllRowsCsg(
      rowMeshes,
      openings,
      openingDataList,
      wallHeight,
      blockHeight,
      cementThickness,
      actualWallWidth,
      actualWallHeight,
      wallLength,
      evaluator
    );

    // 6. Intersect infill and lintels with actual wall bounds
    if (actualWallWidth > 0 && actualWallHeight > 0) {
      const actualWallGeometry = new THREE.BoxGeometry(actualWallWidth, actualWallHeight, wallLength * 1.2);
      const actualWallY = -wallHeight / 2 + actualWallHeight / 2;

      // Ensure uv2 exists
      if (!actualWallGeometry.attributes.uv2 && actualWallGeometry.attributes.uv) {
        actualWallGeometry.setAttribute('uv2', actualWallGeometry.attributes.uv.clone());
      }

      console.log(`[buildMasonryWall] Intersecting with Actual Wall: ${actualWallWidth}x${actualWallHeight}`);

      // Intersect infill
      if (infillMesh && infillMesh.geometry.attributes.position.count > 0) {
        intersectWithActualWall([infillMesh], actualWallGeometry, actualWallY, evaluator, 'Infill');
      }

      // Intersect lintels
      if (lintelMeshes.length > 0) {
        intersectWithActualWall(lintelMeshes, actualWallGeometry, actualWallY, evaluator, 'Lintel');
      }

      // Clean up
      actualWallGeometry.dispose();
    }
  } else {
    // No openings - still need to apply actualWall intersection to all rows
    const evaluator = new Evaluator();
    evaluator.attributes = ['position', 'normal', 'uv', 'uv2'];
    evaluator.useGroups = true;

    const rowMeshes = wallGroup.children.filter(
      child => child instanceof THREE.Mesh && child.name?.startsWith('RowMesh')
    ) as THREE.Mesh[];

    const blocksHorizontal = Math.floor(wallWidth / (blockWidth + cementThickness));
    const calculatedActualWidth = blocksHorizontal > 0
      ? blocksHorizontal * blockWidth + (blocksHorizontal - 1) * cementThickness
      : 0;
    const actualWallWidth = wallGroup.userData.actualWallWidth || calculatedActualWidth;

    processAllRowsCsg(
      rowMeshes,
      [],
      [],
      wallHeight,
      blockHeight,
      cementThickness,
      actualWallWidth,
      actualWallHeight,
      wallLength,
      evaluator
    );
  }

  // Add metadata to the group
  wallGroup.userData = {
    ...wallGroup.userData,
    objectType: 'MasonryWall',
    wall: wall,
    openings: openings,
    task: {
      completion: task.completion
    }
  };

  return wallGroup;
}
