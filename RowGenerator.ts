import * as THREE from 'three';
import { BlockGenerator } from './BlockGenerator';


export interface RowSpecification {
  rowHeight: number;
  totalRows: number;
  completionPerRow: number;
  actualWallHeight: number;
}

export class RowGenerator {
  static calculateRowSpecs(
    wallHeight: number,
    blockHeight: number,
    cementThickness: number
  ): RowSpecification {
    const rowHeight = blockHeight + cementThickness;
    const totalRows = Math.floor(wallHeight / rowHeight);
    const completionPerRow = rowHeight / wallHeight;
    const actualWallHeight = totalRows * blockHeight + (totalRows - 1) * cementThickness;

    return {
      rowHeight,
      totalRows,
      completionPerRow,
      actualWallHeight
    };
  }

  static getVisibleRows(totalRows: number, completion: number): number {
    const clampedCompletion = Math.max(0, Math.min(1, completion));
    return Math.floor(totalRows * clampedCompletion);
  }

  static getCompletedHeight(
    specs: RowSpecification,
    completion: number,
    blockHeight: number,
    cementThickness: number
  ): number {
    const visibleRows = this.getVisibleRows(specs.totalRows, completion);
    if (visibleRows === 0) return 0;
    return visibleRows * blockHeight + (visibleRows - 1) * cementThickness;
  }

  static getRowCompletionPercentage(rowIndex: number, totalRows: number): number {
    if (totalRows === 0) return 0;
    return (rowIndex + 1) / totalRows;
  }

  /**
   * Creates a complete row as a Group of block meshes.
   * Each block is an instance of the geometry from BlockGenerator.
   */
  static createRow(
    blockGenerator: BlockGenerator,
    actualWallWidth: number,
    wallLength: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number
  ): THREE.Group {
    const rowGroup = new THREE.Group();

    const halfRowWidth = actualWallWidth / 2;
    const blocksHorizontal = Math.round(actualWallWidth / (blockWidth + cementThickness));

    // Create block geometry once for the entire row (performance optimization)
    // Pass false for closeRightSide to avoid internal perpendicular faces
    const blockGeo = blockGenerator.createBlockGeometry(blockWidth, blockHeight, wallLength, cementThickness);

    // Get materials
    const materials = [
      blockGenerator.getBrickMaterial(),
      blockGenerator.getCementMaterial()
    ];

    // Create and position blocks
    for (let col = 0; col < blocksHorizontal; col++) {
      // Calculate position for this block (accounting for block width + cement thickness spacing)
      const xPosition = col * (blockWidth + cementThickness) - halfRowWidth + (blockWidth / 2);

      const blockMesh = new THREE.Mesh(blockGeo, materials);
      blockMesh.position.set(xPosition, cementThickness / 2, 0);
      blockMesh.castShadow = true;
      blockMesh.receiveShadow = true;

      rowGroup.add(blockMesh);
    }

    // Create caps geometry
    // Split into Brick and Cement parts
    const brickCapGeo = new THREE.PlaneGeometry(wallLength, blockHeight);
    const cementCapGeo = new THREE.PlaneGeometry(wallLength, cementThickness);

    // Calculate Y positions
    // Row is centered at brick center (y=0)
    const brickCapY = 0;
    const cementCapY = blockHeight / 2 + cementThickness / 2;

    // === LEFT SIDE ===

    // Left Brick Cap
    const leftBrickCap = new THREE.Mesh(brickCapGeo, materials[0]); // Brick material
    leftBrickCap.rotation.y = -Math.PI / 2;
    leftBrickCap.position.set(-halfRowWidth, brickCapY, 0);
    leftBrickCap.castShadow = true;
    leftBrickCap.receiveShadow = true;
    leftBrickCap.name = 'LeftBrickCap';
    rowGroup.add(leftBrickCap);

    // Left Cement Cap
    const leftCementCap = new THREE.Mesh(cementCapGeo, materials[1]); // Cement material
    leftCementCap.rotation.y = -Math.PI / 2;
    leftCementCap.position.set(-halfRowWidth, cementCapY, 0);
    leftCementCap.castShadow = true;
    leftCementCap.receiveShadow = true;
    leftCementCap.name = 'LeftCementCap';
    rowGroup.add(leftCementCap);

    // === RIGHT SIDE ===

    // Position: End of the last block's cement
    const rightCapX = blocksHorizontal * (blockWidth + cementThickness) - halfRowWidth;

    // Right Brick Cap
    const rightBrickCap = new THREE.Mesh(brickCapGeo, materials[0]); // Brick material
    rightBrickCap.rotation.y = Math.PI / 2;
    rightBrickCap.position.set(rightCapX, brickCapY, 0);
    rightBrickCap.castShadow = true;
    rightBrickCap.receiveShadow = true;
    rightBrickCap.name = 'RightBrickCap';
    rowGroup.add(rightBrickCap);

    // Right Cement Cap
    const rightCementCap = new THREE.Mesh(cementCapGeo, materials[1]); // Cement material
    rightCementCap.rotation.y = Math.PI / 2;
    rightCementCap.position.set(rightCapX, cementCapY, 0);
    rightCementCap.castShadow = true;
    rightCementCap.receiveShadow = true;
    rightCementCap.name = 'RightCementCap';
    rowGroup.add(rightCementCap);

    return rowGroup;
  }

  // Removed createRowSideMesh as it is now integrated
}
