import * as THREE from 'three';
import { BlockGenerator, BlockVertices, BlockLeftVertices } from './BlockGenerator';
import { isManifoldWithBVH } from '../utils/csg/CsgValidator';
import { GeometryBuilder } from '../utils/geometry/GeometryBuilder';


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
   * Adds end caps to a row geometry.
   */
  private static addRowEndCaps(
    builder: GeometryBuilder,
    leftVertices: BlockLeftVertices,
    rightVertices: BlockVertices
  ): void {
    // Left cap
    const [vl0, vl1, vl2, vl3] = leftVertices.brick;
    const [vl4, vl5] = leftVertices.cementTop;

    builder.addQuad(vl2, vl0, vl1, vl3, false); // Brick cap
    builder.addQuad(vl3, vl1, vl4, vl5, true);  // Cement cap

    // Right cap
    const [vrCap0, vrCap1, vrCap2, vrCap3] = rightVertices.rightCement;
    const [vrCap4, vrCap5] = rightVertices.rightCorner;

    builder.addQuad(vrCap0, vrCap2, vrCap3, vrCap1, true); // Lower cement cap
    builder.addQuad(vrCap1, vrCap3, vrCap5, vrCap4, true); // Upper cement cap
  }

  /**
   * Creates row geometry with continuous UV mapping and shared vertices.
   * Uses BlockGenerator.addBlockToBuilder() for each block, sharing vertices between adjacent blocks.
   * @param rowIndex - The index of the row (0-based). Odd rows will be offset by half a block width.
   */
  static createRowGeometry(
    blockGenerator: BlockGenerator,
    actualWallWidth: number,
    wallLength: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number,
    rowIndex: number = 0
  ): THREE.BufferGeometry {
    const builder = new GeometryBuilder();
    const halfRowWidth = actualWallWidth / 2;
    const blocksHorizontal = Math.round(actualWallWidth / (blockWidth + cementThickness));

    // Calculate offset for odd rows (half a block width to the right)
    const rowOffset = (rowIndex % 2 === 1) ? (blockWidth / 2) : 0;

    // Calculate Y coordinates
    const totalHeight = blockHeight + cementThickness;
    const halfTotalHeight = totalHeight / 2;
    const yBottom = -halfTotalHeight;
    const yTopBrick = -halfTotalHeight + blockHeight;
    const yTopCement = halfTotalHeight;

    // Track vertices for sharing between blocks
    let prevVertices: BlockVertices | undefined;
    let firstBlockLeftVertices: BlockLeftVertices | undefined;
    let lastBlockRightVertices: BlockVertices | undefined;

    // Build each block using BlockGenerator
    for (let col = 0; col < blocksHorizontal; col++) {
      const xCenter = col * (blockWidth + cementThickness) - halfRowWidth + (blockWidth / 2) + rowOffset;
      const uLeft = col;
      const uRight = col + 1;

      const result = blockGenerator.addBlockToBuilder(
        builder,
        xCenter,
        blockWidth,
        blockHeight,
        wallLength,
        cementThickness,
        uLeft,
        uRight,
        yBottom,
        yTopBrick,
        yTopCement,
        prevVertices
      );

      // Store first block's left vertices for end cap
      if (col === 0 && result.leftVertices) {
        firstBlockLeftVertices = result.leftVertices;
      }

      // Update for next iteration
      prevVertices = result.rightVertices;
      lastBlockRightVertices = result.rightVertices;
    }

    // Add end caps
    if (firstBlockLeftVertices && lastBlockRightVertices) {
      this.addRowEndCaps(builder, firstBlockLeftVertices, lastBlockRightVertices);
    }

    const { brick, cement } = builder.getIndexCounts();
    console.log(`[RowGenerator] Built row with continuous UV mapping:
      Total vertices: ${builder.getVertexCount()}
      Blocks: ${blocksHorizontal}
      Expected without sharing: ${blocksHorizontal * 18 + 12}
      Vertices saved: ${(blocksHorizontal * 18 + 12) - builder.getVertexCount()}`);

    return builder.build();
  }

  /**
   * Creates a complete row as a single welded mesh.
   * Uses createRowGeometry() to build geometry with shared vertices from the start.
   * @param rowIndex - The index of the row (0-based). Odd rows will be offset by half a block width.
   */
  static createRow(
    blockGenerator: BlockGenerator,
    actualWallWidth: number,
    wallLength: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number,
    rowIndex: number = 0
  ): THREE.Mesh {
    // Build row geometry with shared vertices
    const rowGeometry = this.createRowGeometry(
      blockGenerator,
      actualWallWidth,
      wallLength,
      blockWidth,
      blockHeight,
      cementThickness,
      rowIndex
    );

    // Get materials
    const materials = [
      blockGenerator.getBrickMaterial(),
      blockGenerator.getCementMaterial()
    ];

    // Check if the row is manifold using enhanced BVH-based validation
    const manifoldResult = isManifoldWithBVH(rowGeometry);
    console.log(`[RowGenerator] Enhanced Manifold Check: ${manifoldResult.isManifold ? '✅' : '❌'} ${manifoldResult.message}`);
    console.log(`[RowGenerator] Details:`, manifoldResult.details);

    // Create and return the welded mesh
    const rowMesh = new THREE.Mesh(rowGeometry, materials);
    rowMesh.castShadow = true;
    rowMesh.receiveShadow = true;

    return rowMesh;
  }

  // Removed createRowSideMesh as it is now integrated
}
