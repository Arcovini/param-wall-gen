import * as THREE from 'three';
import { BlockGenerator } from './BlockGenerator';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

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
   * Creates a complete row as a single watertight mesh with material groups.
   * Group 0: Blocks
   * Group 1: Cement
   */
  static createRow(
    blockGenerator: BlockGenerator,
    actualWallWidth: number,
    wallLength: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number,
    isLastRow: boolean,
    invertNormals: boolean // Kept for compatibility, but we build full 3D row now
  ): THREE.BufferGeometry {

    const halfRowWidth = actualWallWidth / 2;
    const halfWallLength = wallLength / 2;

    // Calculate how many blocks fit (reverse calculation for loop count)
    const blocksHorizontal = Math.round(actualWallWidth / (blockWidth + cementThickness));

    // Geometry data
    const vertices: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    // Helper to add vertex
    const addVertex = (x: number, y: number, z: number, nx: number, ny: number, nz: number, u: number, v: number) => {
      vertices.push(x, y, z);
      normals.push(nx, ny, nz);
      uvs.push(u, v);
      return (vertices.length / 3) - 1;
    };

    // Helper to add quad
    const addQuad = (v1: number, v2: number, v3: number, v4: number, materialIndex: number) => {
      indices.push(v1, v2, v3);
      indices.push(v1, v3, v4);
      // We will sort indices by material later or use addGroup
    };

    // We need to track indices for each material to separate them into groups
    const blockIndices: number[] = [];
    const cementIndices: number[] = [];

    const addQuadToGroup = (v1: number, v2: number, v3: number, v4: number, isCement: boolean) => {
      const target = isCement ? cementIndices : blockIndices;
      target.push(v1, v2, v3);
      target.push(v1, v3, v4);
    };

    // Z coords
    const zFront = halfWallLength;
    const zBack = -halfWallLength;

    // Y coords
    // Row local origin is at bottom-center? Or center-center?
    // WallGenerator expects center-center usually.
    // Let's build relative to (0,0,0) being the center of the BLOCK part of the row.
    // Block goes from -blockHeight/2 to +blockHeight/2.
    // Top cement goes from +blockHeight/2 to +blockHeight/2 + cementThickness.
    const yBottom = -blockHeight / 2;
    const yTopBlock = blockHeight / 2;
    const yTopCement = yTopBlock + (!isLastRow ? cementThickness : 0);

    // Iterate columns to build Front, Back, Top, Bottom faces
    for (let col = 0; col < blocksHorizontal; col++) {
      const isLastColumn = col === blocksHorizontal - 1;

      // X coords for this block
      // xStart is the left edge of the block
      const xBlockCenter = col * (blockWidth + cementThickness) - halfRowWidth + (blockWidth / 2);
      const xBlockLeft = xBlockCenter - blockWidth / 2;
      const xBlockRight = xBlockCenter + blockWidth / 2;

      // --- FRONT FACE (Z = zFront) ---
      // 1. Block Face
      let v1 = addVertex(xBlockLeft, yBottom, zFront, 0, 0, 1, 0, 0);
      let v2 = addVertex(xBlockRight, yBottom, zFront, 0, 0, 1, 1, 0);
      let v3 = addVertex(xBlockRight, yTopBlock, zFront, 0, 0, 1, 1, 1);
      let v4 = addVertex(xBlockLeft, yTopBlock, zFront, 0, 0, 1, 0, 1);
      addQuadToGroup(v1, v2, v3, v4, false); // Block

      // 2. Top Cement Face (Front Strip)
      if (!isLastRow) {
        v1 = addVertex(xBlockLeft, yTopBlock, zFront, 0, 0, 1, 0, 0);
        v2 = addVertex(xBlockRight, yTopBlock, zFront, 0, 0, 1, 1, 0);
        v3 = addVertex(xBlockRight, yTopCement, zFront, 0, 0, 1, 1, 1);
        v4 = addVertex(xBlockLeft, yTopCement, zFront, 0, 0, 1, 0, 1);
        addQuadToGroup(v1, v2, v3, v4, true); // Cement
      }

      // 3. Right Cement Face (Front Strip)
      if (!isLastColumn) {
        const xCementRight = xBlockRight + cementThickness;
        // Vertical part (next to block)
        // UVs: Scale V by blockHeight/blockWidth ratio to maintain aspect if needed, 
        // or just map 0-1. For cement, 0-1 is usually fine if texture is seamless.
        // But if it looks stretched, we might need to adjust.
        // Let's try to keep it simple 0-1 for now, but ensure winding is correct.

        v1 = addVertex(xBlockRight, yBottom, zFront, 0, 0, 1, 0, 0);
        v2 = addVertex(xCementRight, yBottom, zFront, 0, 0, 1, 1, 0);
        v3 = addVertex(xCementRight, yTopBlock, zFront, 0, 0, 1, 1, 1);
        v4 = addVertex(xBlockRight, yTopBlock, zFront, 0, 0, 1, 0, 1);
        addQuadToGroup(v1, v2, v3, v4, true); // Cement

        // Corner part (next to top cement)
        if (!isLastRow) {
          v1 = addVertex(xBlockRight, yTopBlock, zFront, 0, 0, 1, 0, 0);
          v2 = addVertex(xCementRight, yTopBlock, zFront, 0, 0, 1, 1, 0);
          v3 = addVertex(xCementRight, yTopCement, zFront, 0, 0, 1, 1, 1);
          v4 = addVertex(xBlockRight, yTopCement, zFront, 0, 0, 1, 0, 1);
          addQuadToGroup(v1, v2, v3, v4, true); // Cement
        }
      }

      // --- BACK FACE (Z = zBack) ---
      // Same as front but normal is (0,0,-1) and winding is reversed (or just swap v2/v4)
      // 1. Block Face
      v1 = addVertex(xBlockLeft, yBottom, zBack, 0, 0, -1, 0, 0);
      v2 = addVertex(xBlockRight, yBottom, zBack, 0, 0, -1, 1, 0);
      v3 = addVertex(xBlockRight, yTopBlock, zBack, 0, 0, -1, 1, 1);
      v4 = addVertex(xBlockLeft, yTopBlock, zBack, 0, 0, -1, 0, 1);
      addQuadToGroup(v4, v3, v2, v1, false); // Block (Reversed)

      // 2. Top Cement Face (Back Strip)
      if (!isLastRow) {
        v1 = addVertex(xBlockLeft, yTopBlock, zBack, 0, 0, -1, 0, 0);
        v2 = addVertex(xBlockRight, yTopBlock, zBack, 0, 0, -1, 1, 0);
        v3 = addVertex(xBlockRight, yTopCement, zBack, 0, 0, -1, 1, 1);
        v4 = addVertex(xBlockLeft, yTopCement, zBack, 0, 0, -1, 0, 1);
        addQuadToGroup(v4, v3, v2, v1, true); // Cement
      }

      // 3. Right Cement Face (Back Strip)
      if (!isLastColumn) {
        const xCementRight = xBlockRight + cementThickness;
        // Vertical part
        v1 = addVertex(xBlockRight, yBottom, zBack, 0, 0, -1, 0, 0);
        v2 = addVertex(xCementRight, yBottom, zBack, 0, 0, -1, 1, 0);
        v3 = addVertex(xCementRight, yTopBlock, zBack, 0, 0, -1, 1, 1);
        v4 = addVertex(xBlockRight, yTopBlock, zBack, 0, 0, -1, 0, 1);
        addQuadToGroup(v4, v3, v2, v1, true); // Cement

        // Corner part
        if (!isLastRow) {
          v1 = addVertex(xBlockRight, yTopBlock, zBack, 0, 0, -1, 0, 0);
          v2 = addVertex(xCementRight, yTopBlock, zBack, 0, 0, -1, 1, 0);
          v3 = addVertex(xCementRight, yTopCement, zBack, 0, 0, -1, 1, 1);
          v4 = addVertex(xBlockRight, yTopCement, zBack, 0, 0, -1, 0, 1);
          addQuadToGroup(v4, v3, v2, v1, true); // Cement
        }
      }

      // --- TOP FACE (Y = yTopCement or yTopBlock if last row) ---
      // This closes the top of the row.
      // It spans the block width.
      // If not last row, it's at yTopCement. If last row, it's at yTopBlock.
      const yTopCurrent = !isLastRow ? yTopCement : yTopBlock;

      // Material: 
      // If not last row, it's cement (top of cement joint).
      // If last row, it's the top of the wall. Usually this is capped with cement.
      // So we should use cement material for the top face of the last row as well.
      const isTopCement = true; // Always use cement for top face to simulate cap

      v1 = addVertex(xBlockLeft, yTopCurrent, zFront, 0, 1, 0, 0, 0);
      v2 = addVertex(xBlockRight, yTopCurrent, zFront, 0, 1, 0, 1, 0);
      v3 = addVertex(xBlockRight, yTopCurrent, zBack, 0, 1, 0, 1, 1);
      v4 = addVertex(xBlockLeft, yTopCurrent, zBack, 0, 1, 0, 0, 1);
      addQuadToGroup(v1, v2, v3, v4, isTopCement);

      // Right Cement Top
      if (!isLastColumn) {
        const xCementRight = xBlockRight + cementThickness;
        v1 = addVertex(xBlockRight, yTopCurrent, zFront, 0, 1, 0, 0, 0);
        v2 = addVertex(xCementRight, yTopCurrent, zFront, 0, 1, 0, 1, 0);
        v3 = addVertex(xCementRight, yTopCurrent, zBack, 0, 1, 0, 1, 1);
        v4 = addVertex(xBlockRight, yTopCurrent, zBack, 0, 1, 0, 0, 1);
        addQuadToGroup(v1, v2, v3, v4, true); // Always cement between blocks
      }

      // --- BOTTOM FACE (Y = yBottom) ---
      // This closes the bottom of the row.
      // Block part
      v1 = addVertex(xBlockLeft, yBottom, zFront, 0, -1, 0, 0, 0);
      v2 = addVertex(xBlockRight, yBottom, zFront, 0, -1, 0, 1, 0);
      v3 = addVertex(xBlockRight, yBottom, zBack, 0, -1, 0, 1, 1);
      v4 = addVertex(xBlockLeft, yBottom, zBack, 0, -1, 0, 0, 1);
      addQuadToGroup(v4, v3, v2, v1, false); // Block bottom is block material

      // Right Cement Bottom
      if (!isLastColumn) {
        const xCementRight = xBlockRight + cementThickness;
        v1 = addVertex(xBlockRight, yBottom, zFront, 0, -1, 0, 0, 0);
        v2 = addVertex(xCementRight, yBottom, zFront, 0, -1, 0, 1, 0);
        v3 = addVertex(xCementRight, yBottom, zBack, 0, -1, 0, 1, 1);
        v4 = addVertex(xBlockRight, yBottom, zBack, 0, -1, 0, 0, 1);
        addQuadToGroup(v4, v3, v2, v1, true); // Cement
      }
    }

    // --- SIDE CAPS (Left and Right ends of the row) ---
    const xLeft = -halfRowWidth;
    const xRight = halfRowWidth; // Should match the last block/cement right edge
    const yTopRow = !isLastRow ? yTopCement : yTopBlock;

    // Left Cap (Normal -1, 0, 0)
    // Spans from yBottom to yTopRow, zBack to zFront
    let v1 = addVertex(xLeft, yBottom, zBack, -1, 0, 0, 0, 0);
    let v2 = addVertex(xLeft, yBottom, zFront, -1, 0, 0, 1, 0);
    let v3 = addVertex(xLeft, yTopRow, zFront, -1, 0, 0, 1, 1);
    let v4 = addVertex(xLeft, yTopRow, zBack, -1, 0, 0, 0, 1);
    addQuadToGroup(v1, v2, v3, v4, false); // Block cap (User requested brick side)

    // Right Cap (Normal 1, 0, 0)
    v1 = addVertex(xRight, yBottom, zFront, 1, 0, 0, 0, 0);
    v2 = addVertex(xRight, yBottom, zBack, 1, 0, 0, 1, 0);
    v3 = addVertex(xRight, yTopRow, zBack, 1, 0, 0, 1, 1);
    let v4_right = addVertex(xRight, yTopRow, zFront, 1, 0, 0, 0, 1);
    addQuadToGroup(v1, v2, v3, v4_right, false); // Block cap (User requested brick side)

    // Construct Geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(uvs, 2));

    // Combine indices: Block first, then Cement
    const allIndices = [...blockIndices, ...cementIndices];
    geometry.setIndex(allIndices);

    // Add Groups
    geometry.addGroup(0, blockIndices.length, 0); // Material 0: Block
    geometry.addGroup(blockIndices.length, cementIndices.length, 1); // Material 1: Cement

    return geometry;
  }

  // Removed createRowSideMesh as it is now integrated
}
