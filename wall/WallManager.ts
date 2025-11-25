import * as THREE from 'three';
import { applyPlacement } from './WallPlacement';
import { RowGenerator } from './RowGenerator';
import { BlockGenerator } from './BlockGenerator';

/**
 * WallGenerator - Generates a grid of blocks to fill wall dimensions
 * Handles block positioning, cement joints, and material reuse
 */
export class WallManager {
  private scene: THREE.Scene | null = null;
  private wallGroup: THREE.Group | null = null;
  private blockGenerator: BlockGenerator;

  constructor() {
    this.blockGenerator = new BlockGenerator();
  }

  /**
   * Creates a 3D wall and adds it to the scene
   */
  createWall(
    wallWidth: number,
    wallHeight: number,
    wallLength: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number,
    scene: THREE.Scene,
    positionX: number = 0,
    positionY: number = 0,
    positionZ: number = 0,
    yawDegrees: number = 0,
    completion: number = 1.0
  ): void {
    this.scene = scene;

    // Clear previous wall
    this.clearWall();

    // Generate the wall group
    this.wallGroup = this.generateWallGroup(
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
      completion
    );

    // Add to scene
    this.scene.add(this.wallGroup);
  }

  /**
   * Generates a wall group without adding it to the scene
   * Useful for external consumers like buildMasonryWall
   */
  generateWallGroup(
    wallWidth: number,
    wallHeight: number,
    wallLength: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number,
    positionX: number = 0,
    positionY: number = 0,
    positionZ: number = 0,
    yawDegrees: number = 0,
    completion: number = 1.0
  ): THREE.Group {
    // Create a new group to hold all wall meshes
    const wallGroup = new THREE.Group();
    this.wallGroup = wallGroup;

    // Calculate grid dimensions (truncate to integer)
    const blocksHorizontal = Math.floor(wallWidth / (blockWidth + cementThickness));
    const blocksVertical = Math.floor(wallHeight / (blockHeight + cementThickness));

    // Calculate how many rows to show based on completion percentage
    const rowsToShow = RowGenerator.getVisibleRows(blocksVertical, completion);

    console.log("WallManager:", {
      wallWidth, wallHeight, blockHeight, cementThickness,
      blocksVertical, completion, rowsToShow
    });

    // Calculate actual wall dimensions based on blocks that fit
    // Don't include cement thickness after the last block
    const actualWallWidth = blocksHorizontal > 0
      ? blocksHorizontal * blockWidth + (blocksHorizontal - 1) * cementThickness
      : 0;
    const completedWallHeight = rowsToShow > 0
      ? rowsToShow * blockHeight + (rowsToShow - 1) * cementThickness
      : 0;

    // Add extra blocks for horizontal truncation (one on each side)
    const expandedBlocksHorizontal = blocksHorizontal + 2;
    const expandedWallWidth = expandedBlocksHorizontal > 0
      ? expandedBlocksHorizontal * blockWidth + (expandedBlocksHorizontal - 1) * cementThickness
      : 0;

    // Generate Rows - create separate meshes for each row
    for (let row = 0; row < rowsToShow; row++) {
      // Calculate Y position for this row
      // Align to bottom of the wall (target height)
      // Start at -wallHeight/2
      const rowY = -wallHeight / 2 + row * (blockHeight + cementThickness) + (blockHeight / 2);

      // Create Row (returns a welded mesh with shared vertices)
      // Use expandedWallWidth to generate extra blocks
      const rowMesh = RowGenerator.createRow(
        this.blockGenerator,
        expandedWallWidth,
        wallLength,
        blockWidth,
        blockHeight,
        cementThickness,
        row
      );

      // Position the row mesh
      rowMesh.position.set(0, rowY, 0);
      rowMesh.name = `RowMesh_${row}`;

      // Add row mesh directly to wall group (no merging)
      wallGroup.add(rowMesh);
    }

    console.log(`WallManager: Created ${rowsToShow} separate row meshes`);

    // Apply placement transformations to the wall group
    applyPlacement(wallGroup, { x: positionX, y: positionY, z: positionZ }, yawDegrees);

    // Store calculated dimensions in userData for other generators to use
    // Store the TARGET wallWidth as actualWallWidth so buildMasonryWall uses it for intersection
    wallGroup.userData.actualWallWidth = wallWidth;
    wallGroup.userData.actualWallHeight = completedWallHeight;

    return wallGroup;
  }

  /**
   * Updates the wall dimensions and regenerates the 3D wall
   */
  updateWall(
    wallWidth: number,
    wallHeight: number,
    wallLength: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number,
    positionX: number = 0,
    positionY: number = 0,
    positionZ: number = 0,
    yawDegrees: number = 0,
    completion: number = 1.0
  ): void {
    if (this.scene) {
      this.createWall(wallWidth, wallHeight, wallLength, blockWidth, blockHeight, cementThickness, this.scene, positionX, positionY, positionZ, yawDegrees, completion);
    }
  }

  /**
   * Clears all blocks and cement joints from the scene
   */
  private clearWall(): void {
    if (!this.scene) return;

    // Remove wall group from scene if it exists
    if (this.wallGroup) {
      this.scene.remove(this.wallGroup);

      // Dispose of geometries in the group
      this.wallGroup.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          // Materials are managed by BlockGenerator, so we don't dispose them here
        }
      });

      this.wallGroup = null;
    }
  }

  /**
   * Disposes of all resources (geometries, materials, textures)
   */
  dispose(): void {
    this.clearWall();
    this.blockGenerator.dispose();
  }
}
