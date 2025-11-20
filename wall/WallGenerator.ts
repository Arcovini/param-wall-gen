import * as THREE from 'three';
import { applyPlacement } from '../WallPlacement';
import { RowGenerator } from '../RowGenerator';
import { BlockGenerator } from '../BlockGenerator';

/**
 * WallGenerator - Generates a grid of blocks to fill wall dimensions
 * Handles block positioning, cement joints, and material reuse
 */
export class WallGenerator {
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

    // Calculate actual wall dimensions based on blocks that fit
    // Don't include cement thickness after the last block
    const actualWallWidth = blocksHorizontal > 0
      ? blocksHorizontal * blockWidth + (blocksHorizontal - 1) * cementThickness
      : 0;
    const fullWallHeight = blocksVertical * blockHeight + (blocksVertical - 1) * cementThickness;
    const completedWallHeight = rowsToShow > 0
      ? rowsToShow * blockHeight + (rowsToShow - 1) * cementThickness
      : 0;

    // Generate Rows
    for (let row = 0; row < rowsToShow; row++) {
      const isLastRow = row === rowsToShow - 1;

      // Calculate Y position for this row
      // Center of the row
      const rowY = row * (blockHeight + cementThickness) - (fullWallHeight / 2) + (blockHeight / 2);

      // 1. Front Row (z = 0)
      const frontRow = RowGenerator.createRow(
        this.blockGenerator,
        wallWidth,
        blockWidth,
        blockHeight,
        cementThickness,
        isLastRow,
        false // No normal inversion
      );
      frontRow.position.set(0, rowY, 0);
      wallGroup.add(frontRow);

      // 2. Back Row (z = -wallLength)
      const backRow = RowGenerator.createRow(
        this.blockGenerator,
        wallWidth,
        blockWidth,
        blockHeight,
        cementThickness,
        isLastRow,
        true // Invert normals
      );
      backRow.position.set(0, rowY, -wallLength);
      wallGroup.add(backRow);

      // 3. Side Edges for this row
      // Note: RowGenerator.createRowSideMesh creates a mesh centered at (0,0,0) locally?
      // No, looking at createRowSideMesh, it uses rowY passed in to set absolute Y positions.
      // But if we want to attach it to the row, it should be relative.
      // However, createRowSideMesh returns a single mesh for the row.
      // Let's attach it to the wallGroup and use the absolute Y calculated inside it, 
      // OR (better) attach it to the wallGroup and position it.
      // The current createRowSideMesh implementation uses `rowY` to set vertex positions.
      // So we just add it to wallGroup at (0,0,0).

      const hasTopCement = !isLastRow;
      const materials = {
        block: this.blockGenerator.getBrickMaterial(),
        cement: this.blockGenerator.getCementMaterial()
      };

      const sideEdges = RowGenerator.createRowSideMesh(
        row,
        rowY,
        actualWallWidth, // Use actual width so caps align with blocks
        wallLength,
        blockHeight,
        cementThickness,
        materials,
        hasTopCement
      );
      // sideEdges vertices are already positioned at rowY
      wallGroup.add(sideEdges);
    }

    // Create top and bottom caps for the wall
    this.createWallCaps(wallGroup, actualWallWidth, completedWallHeight, wallLength, fullWallHeight);

    // Apply placement transformations to the wall group
    applyPlacement(wallGroup, { x: positionX, y: positionY, z: positionZ }, yawDegrees);

    return wallGroup;
  }

  /**
   * Creates top and bottom caps for the wall
   */
  private createWallCaps(group: THREE.Group, wallWidth: number, completedWallHeight: number, wallLength: number, fullWallHeight: number): void {
    // Calculate edge positions based on bottom-up construction
    const bottomY = -fullWallHeight / 2;
    const topY = bottomY + completedWallHeight;
    const cementMaterial = this.blockGenerator.getCementMaterial();

    // Top edge plane
    const topEdgeGeometry = new THREE.PlaneGeometry(wallWidth, wallLength);
    const topEdgeMesh = new THREE.Mesh(topEdgeGeometry, cementMaterial);
    topEdgeMesh.position.set(0, topY, -wallLength / 2);
    topEdgeMesh.rotation.x = Math.PI / 2;
    topEdgeMesh.scale.z = -1; // Flip normal
    topEdgeMesh.castShadow = true;
    topEdgeMesh.receiveShadow = true;
    group.add(topEdgeMesh);

    // Bottom edge plane
    const bottomEdgeGeometry = new THREE.PlaneGeometry(wallWidth, wallLength);
    const bottomEdgeMesh = new THREE.Mesh(bottomEdgeGeometry, cementMaterial);
    bottomEdgeMesh.position.set(0, bottomY, -wallLength / 2);
    bottomEdgeMesh.rotation.x = -Math.PI / 2;
    bottomEdgeMesh.scale.z = -1; // Flip normal
    bottomEdgeMesh.castShadow = true;
    bottomEdgeMesh.receiveShadow = true;
    group.add(bottomEdgeMesh);
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
