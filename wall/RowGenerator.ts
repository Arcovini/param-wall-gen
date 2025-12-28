import * as THREE from 'three';
import { BlockGenerator } from './BlockGenerator';
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
   * Creates row geometry with continuous UV mapping and shared vertices.
   * UVs are mapped continuously across the entire row (0 to 1) allowing vertex sharing at interfaces.
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

    // Calculate dimensions
    const halfWidth = blockWidth / 2;
    const halfDepth = wallLength / 2;
    const totalHeight = blockHeight + cementThickness;
    const halfTotalHeight = totalHeight / 2;

    const yBottom = -halfTotalHeight;
    const yTopBrick = -halfTotalHeight + blockHeight;
    const yTopCement = halfTotalHeight;
    const zFront = halfDepth;
    const zBack = -halfDepth;

    // Track vertices from previous block for sharing
    let prevRightCementVertices: number[] = [];
    let prevRightCornerVertices: number[] = [];

    // Track first block's left edge vertices for left cap
    let firstBlockLeftVertices: number[] = [];
    let firstBlockLeftTopVertices: number[] = [];

    // Build each block with continuous UV mapping
    for (let col = 0; col < blocksHorizontal; col++) {
      const xCenter = col * (blockWidth + cementThickness) - halfRowWidth + halfWidth + rowOffset;
      const xLeft = xCenter - halfWidth;
      const xRight = xCenter + halfWidth;
      const xRightCement = xRight + cementThickness;

      // UV coordinates (repeating: 0 to N for texture repetition)
      const uLeft = col;
      const uRight = col + 1;
      const uRightCement = col + 1;

      // === BRICK VERTICES ===
      let v0, v1, v2, v3, v4, v5, v6, v7;

      if (col === 0) {
        // First block: create all vertices
        v0 = builder.addVertex(xLeft, yBottom, zFront, uLeft, 0);
        v1 = builder.addVertex(xRight, yBottom, zFront, uRight, 0);
        v2 = builder.addVertex(xRight, yTopBrick, zFront, uRight, 1);
        v3 = builder.addVertex(xLeft, yTopBrick, zFront, uLeft, 1);
        v4 = builder.addVertex(xLeft, yBottom, zBack, uLeft, 0);
        v5 = builder.addVertex(xRight, yBottom, zBack, uRight, 0);
        v6 = builder.addVertex(xRight, yTopBrick, zBack, uRight, 1);
        v7 = builder.addVertex(xLeft, yTopBrick, zBack, uLeft, 1);

        firstBlockLeftVertices = [v0, v3, v4, v7];
      } else {
        // Subsequent blocks: reuse right edge from previous block as left edge
        v0 = prevRightCementVertices[0];
        v3 = prevRightCementVertices[1];
        v4 = prevRightCementVertices[2];
        v7 = prevRightCementVertices[3];

        // Create new vertices for right edge
        v1 = builder.addVertex(xRight, yBottom, zFront, uRight, 0);
        v2 = builder.addVertex(xRight, yTopBrick, zFront, uRight, 1);
        v5 = builder.addVertex(xRight, yBottom, zBack, uRight, 0);
        v6 = builder.addVertex(xRight, yTopBrick, zBack, uRight, 1);
      }

      // Brick faces
      builder.addQuad(v0, v1, v2, v3, false); // Front
      builder.addQuad(v5, v4, v7, v6, false); // Back
      builder.addQuad(v4, v5, v1, v0, false); // Bottom

      // === CEMENT PORTION ===
      if (cementThickness > 0) {
        let vt0, vt1, vt2, vt3;
        if (col === 0) {
          vt0 = builder.addVertex(xLeft, yTopCement, zFront, uLeft, 1);
          vt1 = builder.addVertex(xRight, yTopCement, zFront, uRight, 1);
          vt2 = builder.addVertex(xLeft, yTopCement, zBack, uLeft, 1);
          vt3 = builder.addVertex(xRight, yTopCement, zBack, uRight, 1);

          firstBlockLeftTopVertices = [vt0, vt2];
        } else {
          vt0 = prevRightCornerVertices[0];
          vt2 = prevRightCornerVertices[1];
          vt1 = builder.addVertex(xRight, yTopCement, zFront, uRight, 1);
          vt3 = builder.addVertex(xRight, yTopCement, zBack, uRight, 1);
        }

        // Top cement faces
        builder.addQuad(v3, v2, vt1, vt0, true); // Front
        builder.addQuad(v6, v7, vt2, vt3, true); // Back
        builder.addQuad(vt0, vt1, vt3, vt2, true); // Top

        // Right cement strip vertices
        const vr0 = builder.addVertex(xRightCement, yBottom, zFront, uRightCement, 0);
        const vr1 = builder.addVertex(xRightCement, yTopBrick, zFront, uRightCement, 0.8);
        const vr2 = builder.addVertex(xRightCement, yBottom, zBack, uRightCement, 0);
        const vr3 = builder.addVertex(xRightCement, yTopBrick, zBack, uRightCement, 0.8);

        // Right cement faces
        builder.addQuad(v1, vr0, vr1, v2, true); // Front
        builder.addQuad(vr2, v5, v6, vr3, true); // Back
        builder.addQuad(v5, vr2, vr0, v1, true); // Bottom of cement strip

        // Corner cement vertices
        const vc0 = builder.addVertex(xRightCement, yTopCement, zFront, uRightCement, 1);
        const vc1 = builder.addVertex(xRightCement, yTopCement, zBack, uRightCement, 1);

        // Corner faces
        builder.addQuad(v2, vr1, vc0, vt1, true); // Front
        builder.addQuad(vr3, v6, vt3, vc1, true); // Back
        builder.addQuad(vt1, vc0, vc1, vt3, true); // Top

        prevRightCementVertices = [vr0, vr1, vr2, vr3];
        prevRightCornerVertices = [vc0, vc1];
      }
    }

    // === END CAPS ===
    // Left cap
    const vl0 = firstBlockLeftVertices[0];
    const vl1 = firstBlockLeftVertices[1];
    const vl2 = firstBlockLeftVertices[2];
    const vl3 = firstBlockLeftVertices[3];
    const vl4 = firstBlockLeftTopVertices[0];
    const vl5 = firstBlockLeftTopVertices[1];

    builder.addQuad(vl2, vl0, vl1, vl3, false); // Brick cap
    builder.addQuad(vl3, vl1, vl4, vl5, true);  // Cement cap

    // Right cap
    const vrCap0 = prevRightCementVertices[0];
    const vrCap1 = prevRightCementVertices[1];
    const vrCap2 = prevRightCementVertices[2];
    const vrCap3 = prevRightCementVertices[3];
    const vrCap4 = prevRightCornerVertices[0];
    const vrCap5 = prevRightCornerVertices[1];

    builder.addQuad(vrCap0, vrCap2, vrCap3, vrCap1, true); // Lower cement cap
    builder.addQuad(vrCap1, vrCap3, vrCap5, vrCap4, true); // Upper cement cap

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
