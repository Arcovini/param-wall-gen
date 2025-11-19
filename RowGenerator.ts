import * as THREE from 'three';

/**
 * RowGenerator - Handles row-by-row wall construction calculations
 *
 * Mathematical formulas:
 * - Row Height (Rh) = Block Height (Bh) + Cement Thickness (Bc)
 * - Number of Rows (NR) = Truncate(Wall Height (Wh) / Row Height (Rh))
 * - Completion Percentage per Row (Rp) = Row Height (Rh) / Wall Height (Wh)
 */

export interface RowSpecification {
  /** Row height (block height + cement thickness) */
  rowHeight: number;
  /** Total number of rows that fit in the wall */
  totalRows: number;
  /** Completion percentage represented by each row */
  completionPerRow: number;
  /** Actual wall height based on rows that fit */
  actualWallHeight: number;
}

export class RowGenerator {
  /**
   * Calculates row specifications based on wall and block parameters
   *
   * @param wallHeight - Desired wall height (Wh)
   * @param blockHeight - Block height (Bh)
   * @param cementThickness - Cement thickness (Bc)
   * @returns Row specifications
   */
  static calculateRowSpecs(
    wallHeight: number,
    blockHeight: number,
    cementThickness: number
  ): RowSpecification {
    // Rh = Bh + Bc
    const rowHeight = blockHeight + cementThickness;

    // NR = Truncate(Wh / Rh)
    const totalRows = Math.floor(wallHeight / rowHeight);

    // Rp = Rh / Wh
    const completionPerRow = rowHeight / wallHeight;

    // Actual height based on rows that fit
    // Don't include cement thickness after the last block
    const actualWallHeight = totalRows * blockHeight + (totalRows - 1) * cementThickness;

    return {
      rowHeight,
      totalRows,
      completionPerRow,
      actualWallHeight
    };
  }

  /**
   * Calculates how many rows should be visible based on completion percentage
   *
   * @param totalRows - Total number of rows in the wall
   * @param completion - Completion percentage (0.0 to 1.0)
   * @returns Number of rows to show (building from bottom to top)
   */
  static getVisibleRows(totalRows: number, completion: number): number {
    // Clamp completion between 0 and 1
    const clampedCompletion = Math.max(0, Math.min(1, completion));

    // Calculate rows to show (rounded down)
    // Rows are built from bottom (row 0) to top
    return Math.floor(totalRows * clampedCompletion);
  }

  /**
   * Calculates the actual height of the wall based on completion percentage
   *
   * @param specs - Row specifications
   * @param completion - Completion percentage (0.0 to 1.0)
   * @param blockHeight - Block height (Bh)
   * @param cementThickness - Cement thickness (Bc)
   * @returns Actual wall height for the given completion
   */
  static getCompletedHeight(
    specs: RowSpecification,
    completion: number,
    blockHeight: number,
    cementThickness: number
  ): number {
    const visibleRows = this.getVisibleRows(specs.totalRows, completion);

    if (visibleRows === 0) return 0;

    // Height includes all blocks + cement joints between them
    // Don't include cement after the last row
    return visibleRows * blockHeight + (visibleRows - 1) * cementThickness;
  }

  /**
   * Gets the completion percentage achieved by a specific row
   *
   * @param rowIndex - Row index (0-based, 0 = bottom row)
   * @param totalRows - Total number of rows
   * @returns Completion percentage after this row is built (0.0 to 1.0)
   */
  static getRowCompletionPercentage(rowIndex: number, totalRows: number): number {
    if (totalRows === 0) return 0;
    return (rowIndex + 1) / totalRows;
  }
  /**
   * Creates a single mesh containing all side caps for a specific row
   * Uses BufferGeometry groups to support multiple materials (Block and Cement)
   *
   * @param rowIndex - The index of the row being generated
   * @param rowY - The Y position of the center of the row (block center)
   * @param wallWidth - Total width of the wall
   * @param wallLength - Length (depth) of the wall
   * @param blockHeight - Height of the block
   * @param cementThickness - Thickness of the cement
   * @param materials - Materials to use for block and cement caps
   * @param hasTopCement - Whether to generate side caps for the top cement joint
   * @returns Single Mesh containing all side faces
   */
  static createRowSideMesh(
    rowIndex: number,
    rowY: number,
    wallWidth: number,
    wallLength: number,
    blockHeight: number,
    cementThickness: number,
    materials: { block: THREE.Material; cement: THREE.Material },
    hasTopCement: boolean
  ): THREE.Mesh {
    const halfWallWidth = wallWidth / 2;

    const vertices: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    // Z positions (same for all)
    // Wall is from 0 to -wallLength.
    // Front is 0, Back is -wallLength.
    const zFront = 0;
    const zBack = -wallLength;

    // Y positions
    const yBlockBottom = rowY - blockHeight / 2;
    const yBlockTop = rowY + blockHeight / 2;
    const yCementTop = yBlockTop + cementThickness;

    // Clear arrays and restart with better structure
    vertices.length = 0;
    normals.length = 0;
    uvs.length = 0;

    // Left Side Vertices (Base 0)
    RowGenerator.addSideStripVertices(vertices, normals, uvs, true, halfWallWidth, zBack, zFront, yBlockBottom, yBlockTop, yCementTop, hasTopCement, blockHeight, cementThickness);
    const rightSideBase = vertices.length / 3;

    // Right Side Vertices
    RowGenerator.addSideStripVertices(vertices, normals, uvs, false, halfWallWidth, zBack, zFront, yBlockBottom, yBlockTop, yCementTop, hasTopCement, blockHeight, cementThickness);

    // Now generate indices

    // Group 0: Blocks
    // Left Block (vertices 0,1,2,3)
    RowGenerator.addQuadIndices(indices, 0, true);
    // Right Block (vertices rightSideBase+0, rightSideBase+1, rightSideBase+2, rightSideBase+3)
    RowGenerator.addQuadIndices(indices, rightSideBase, false);

    const blockIndexCount = indices.length;

    // Group 1: Cement
    if (hasTopCement) {
      // Left Cement (vertices 2,3,4,5 relative to base 0)
      RowGenerator.addQuadIndices(indices, 2, true);
      // Right Cement (vertices rightSideBase+2, rightSideBase+3, rightSideBase+4, rightSideBase+5)
      RowGenerator.addQuadIndices(indices, rightSideBase + 2, false);
    }

    const cementIndexCount = indices.length - blockIndexCount;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);

    geometry.addGroup(0, blockIndexCount, 0); // Block Material
    if (cementIndexCount > 0) {
      geometry.addGroup(blockIndexCount, cementIndexCount, 1); // Cement Material
    }

    const mesh = new THREE.Mesh(geometry, [materials.block, materials.cement]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    return mesh;
  }

  // Helper methods for the above (to be placed inside class or as private static)
  private static addSideStripVertices(
    vertices: number[], normals: number[], uvs: number[],
    isLeft: boolean, halfWidth: number, zBack: number, zFront: number,
    yBot: number, yMid: number, yTop: number, hasTopCement: boolean,
    blockHeight: number, cementThickness: number
  ) {
    const x = isLeft ? -halfWidth : halfWidth;
    const nx = isLeft ? -1 : 1;
    const levels = [yBot, yMid];
    if (hasTopCement) levels.push(yTop);

    const totalStackHeight = blockHeight + (hasTopCement ? cementThickness : 0);

    levels.forEach(y => {
      // Back
      vertices.push(x, y, zBack);
      normals.push(nx, 0, 0);
      uvs.push(isLeft ? 0 : 1, (y - yBot) / totalStackHeight);

      // Front
      vertices.push(x, y, zFront);
      normals.push(nx, 0, 0);
      uvs.push(isLeft ? 1 : 0, (y - yBot) / totalStackHeight);
    });
  }

  private static addQuadIndices(indices: number[], base: number, isLeft: boolean) {
    // Quad between base+0, base+1 (bottom) and base+2, base+3 (top)
    // Vertices:
    // base+0: Bottom-Back
    // base+1: Bottom-Front
    // base+2: Top-Back
    // base+3: Top-Front
    if (isLeft) {
      // CCW for -X normal
      indices.push(base, base + 1, base + 2); // Triangle 1: Bottom-Back, Bottom-Front, Top-Back
      indices.push(base + 2, base + 1, base + 3); // Triangle 2: Top-Back, Bottom-Front, Top-Front
    } else {
      // CCW for +X normal (reverse winding)
      indices.push(base, base + 2, base + 1); // Triangle 1: Bottom-Back, Top-Back, Bottom-Front
      indices.push(base + 2, base + 3, base + 1); // Triangle 2: Top-Back, Top-Front, Bottom-Front
    }
  }
}
