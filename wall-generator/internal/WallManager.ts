import * as THREE from 'three';
import type { OpeningBoundsForRow } from '../types';
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
   *
   * @param openingBounds - Pre-computed opening bounds for pseudo-boolean row generation.
   *                        Blocks completely inside these bounds will be skipped.
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
    completion: number = 1.0,
    openingBounds: OpeningBoundsForRow[] = []
  ): THREE.Group {
    // Create a new group to hold all wall meshes
    const wallGroup = new THREE.Group();
    this.wallGroup = wallGroup;

    // Calculate grid dimensions
    const blocksVertical = Math.floor(wallHeight / (blockHeight + cementThickness));

    // Calculate how many rows to show based on completion percentage
    const rowsToShow = RowGenerator.getVisibleRows(blocksVertical, completion);

    // Calculate completed wall height based on visible rows
    const completedWallHeight = rowsToShow > 0
      ? rowsToShow * blockHeight + (rowsToShow - 1) * cementThickness
      : 0;

    // Geometry offset (same as in snapToRowBoundaries)
    const geometryOffset = -cementThickness / 2;
    const rowHeight = blockHeight + cementThickness;
    const wallBottomY = -wallHeight / 2;

    // Generate Rows - create separate meshes for each row
    // With bounds-clamping, RowGenerator creates partial blocks at edges
    // to fit exactly within wallWidth (no CSG clipping needed)
    for (let row = 0; row < rowsToShow; row++) {
      // Calculate Y position for this row
      // Align to bottom of the wall (target height)
      // Start at -wallHeight/2
      const rowY = -wallHeight / 2 + row * (blockHeight + cementThickness) + (blockHeight / 2);

      // Calculate actual block Y bounds for this row (with geometry offset)
      const blockBottomY = wallBottomY + row * rowHeight + geometryOffset;
      const blockTopY = blockBottomY + blockHeight;

      // Filter openings that completely cover this row vertically
      // (row blocks are inside opening's snapped Y bounds)
      const openingsForRow = openingBounds.filter(opening =>
        opening.snappedBottomY <= blockBottomY && opening.snappedTopY >= blockTopY
      );

      // Create Row with target wallWidth and opening bounds for pseudo-boolean
      const rowMesh = RowGenerator.createRow(
        this.blockGenerator,
        wallWidth,  // Target width - RowGenerator creates partial blocks to fit exactly
        wallLength,
        blockWidth,
        blockHeight,
        cementThickness,
        row,
        openingsForRow  // Pass openings that affect this row
      );

      // Position the row mesh
      rowMesh.position.set(0, rowY, 0);
      rowMesh.name = `RowMesh_${row}`;

      wallGroup.add(rowMesh);
    }

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
  }
}
