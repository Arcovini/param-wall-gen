import * as THREE from 'three';
import { BlockGenerator, BlockVertices } from './BlockGenerator';
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
   * Adds end caps to a row geometry with proper UVs and materials.
   * Creates dedicated vertices for caps (not shared with front/back faces).
   *
   * @param builder - GeometryBuilder to add vertices and faces to
   * @param xLeft - X position of left edge (first block's left side)
   * @param xRightBrick - X position of last brick's right edge
   * @param xRightCement - X position of last cement strip's right edge
   * @param yBottom - Y position of row bottom
   * @param yTopBrick - Y position of brick top
   * @param yTopCement - Y position of cement top (row top)
   * @param zFront - Z position of front face
   * @param zBack - Z position of back face
   */
  private static addRowEndCaps(
    builder: GeometryBuilder,
    xLeft: number,
    xRightBrick: number,
    xRightCement: number,
    yBottom: number,
    yTopBrick: number,
    yTopCement: number,
    zFront: number,
    zBack: number
  ): void {
    // === LEFT CAP (face normal toward -X, visible from outside) ===
    // Brick portion (larger, bottom)
    const lb0 = builder.addVertex(xLeft, yBottom, zBack, 0, 0);       // bottom-left
    const lb1 = builder.addVertex(xLeft, yBottom, zFront, 1, 0);      // bottom-right
    const lb2 = builder.addVertex(xLeft, yTopBrick, zFront, 1, 1);    // top-right
    const lb3 = builder.addVertex(xLeft, yTopBrick, zBack, 0, 1);     // top-left
    builder.addQuad(lb0, lb1, lb2, lb3, false); // brick material

    // Cement portion (thinner, top)
    const lc0 = builder.addVertex(xLeft, yTopBrick, zBack, 0, 0);     // bottom-left
    const lc1 = builder.addVertex(xLeft, yTopBrick, zFront, 1, 0);    // bottom-right
    const lc2 = builder.addVertex(xLeft, yTopCement, zFront, 1, 1);   // top-right
    const lc3 = builder.addVertex(xLeft, yTopCement, zBack, 0, 1);    // top-left
    builder.addQuad(lc0, lc1, lc2, lc3, true); // cement material

    // === RIGHT CAP AT BRICK EDGE (face normal toward +X, visible from outside) ===
    // Brick portion (larger, bottom)
    const rb0 = builder.addVertex(xRightBrick, yBottom, zFront, 0, 0);     // bottom-left
    const rb1 = builder.addVertex(xRightBrick, yBottom, zBack, 1, 0);      // bottom-right
    const rb2 = builder.addVertex(xRightBrick, yTopBrick, zBack, 1, 1);    // top-right
    const rb3 = builder.addVertex(xRightBrick, yTopBrick, zFront, 0, 1);   // top-left
    builder.addQuad(rb0, rb1, rb2, rb3, false); // brick material

    // Cement portion (thinner, top)
    const rc0 = builder.addVertex(xRightBrick, yTopBrick, zFront, 0, 0);   // bottom-left
    const rc1 = builder.addVertex(xRightBrick, yTopBrick, zBack, 1, 0);    // bottom-right
    const rc2 = builder.addVertex(xRightBrick, yTopCement, zBack, 1, 1);   // top-right
    const rc3 = builder.addVertex(xRightBrick, yTopCement, zFront, 0, 1);  // top-left
    builder.addQuad(rc0, rc1, rc2, rc3, true); // cement material

    // === RIGHT CAP AT CEMENT STRIP EDGE (face normal toward +X, visible from outside) ===
    // Lower portion - use brick material to match left side visual appearance
    const cs0 = builder.addVertex(xRightCement, yBottom, zFront, 0, 0);    // bottom-left
    const cs1 = builder.addVertex(xRightCement, yBottom, zBack, 1, 0);     // bottom-right
    const cs2 = builder.addVertex(xRightCement, yTopBrick, zBack, 1, 1);   // top-right
    const cs3 = builder.addVertex(xRightCement, yTopBrick, zFront, 0, 1);  // top-left
    builder.addQuad(cs0, cs1, cs2, cs3, false); // brick material (visual consistency)

    // Upper portion - cement material
    const cc0 = builder.addVertex(xRightCement, yTopBrick, zFront, 0, 0);  // bottom-left
    const cc1 = builder.addVertex(xRightCement, yTopBrick, zBack, 1, 0);   // bottom-right
    const cc2 = builder.addVertex(xRightCement, yTopCement, zBack, 1, 1);  // top-right
    const cc3 = builder.addVertex(xRightCement, yTopCement, zFront, 0, 1); // top-left
    builder.addQuad(cc0, cc1, cc2, cc3, true); // cement material
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

    // Calculate Z coordinates (depth)
    const halfDepth = wallLength / 2;
    const zFront = halfDepth;
    const zBack = -halfDepth;

    // Track vertices for sharing between blocks
    let prevVertices: BlockVertices | undefined;

    // Track X positions for end caps
    let xLeftCap: number | undefined;
    let xRightBrick: number | undefined;
    let xRightCement: number | undefined;

    // Build each block using BlockGenerator
    for (let col = 0; col < blocksHorizontal; col++) {
      const xCenter = col * (blockWidth + cementThickness) - halfRowWidth + (blockWidth / 2) + rowOffset;
      const uLeft = col;
      const uRight = col + 1;

      // Store first block's left edge for left cap
      if (col === 0) {
        xLeftCap = xCenter - blockWidth / 2;
      }

      // Store last block's right edges for right caps
      if (col === blocksHorizontal - 1) {
        xRightBrick = xCenter + blockWidth / 2;
        xRightCement = xCenter + blockWidth / 2 + cementThickness;
      }

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

      // Update for next iteration
      prevVertices = result.rightVertices;
    }

    // Add end caps with proper positions and UVs
    if (xLeftCap !== undefined && xRightBrick !== undefined && xRightCement !== undefined) {
      this.addRowEndCaps(
        builder,
        xLeftCap,
        xRightBrick,
        xRightCement,
        yBottom,
        yTopBrick,
        yTopCement,
        zFront,
        zBack
      );
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
