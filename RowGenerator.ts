import * as THREE from 'three';
import { BlockGenerator } from './BlockGenerator';
import { GeometryUtils } from './utils/GeometryUtils';
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
   * Creates row geometry with continuous UV mapping and shared vertices.
   * UVs are mapped continuously across the entire row (0 to 1) allowing vertex sharing at interfaces.
   */
  static createRowGeometry(
    blockGenerator: BlockGenerator,
    actualWallWidth: number,
    wallLength: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number
  ): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    const halfRowWidth = actualWallWidth / 2;
    const blocksHorizontal = Math.round(actualWallWidth / (blockWidth + cementThickness));

    const vertices: number[] = [];
    const uvs: number[] = [];
    const brickIndices: number[] = [];
    const cementIndices: number[] = [];

    let vertexIndex = 0;

    // Helper to add a vertex with UV
    const addVertex = (x: number, y: number, z: number, u: number, v: number): number => {
      vertices.push(x, y, z);
      uvs.push(u, v);
      return vertexIndex++;
    };

    // Helper to add a quad face
    const addQuad = (v0: number, v1: number, v2: number, v3: number, isCement: boolean) => {
      (isCement ? cementIndices : brickIndices).push(v0, v1, v2);
      (isCement ? cementIndices : brickIndices).push(v0, v2, v3);
    };

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
    let prevRightBrickVertices: number[] = [];
    let prevRightCementVertices: number[] = [];
    let prevRightTopCementVertices: number[] = [];
    let prevRightCornerVertices: number[] = [];

    // Build each block with continuous UV mapping
    for (let col = 0; col < blocksHorizontal; col++) {
      const xCenter = col * (blockWidth + cementThickness) - halfRowWidth + halfWidth;
      const xLeft = xCenter - halfWidth;
      const xRight = xCenter + halfWidth;
      const xRightCement = xRight + cementThickness;

      // Calculate UV coordinates for this block (repeating: 0 to N)
      // This allows texture to repeat N times across the row while sharing vertices
      const uLeft = col;
      const uRight = col + 1;
      const uRightCement = col + 1; // Same as uRight for seamless texture

      // === BRICK VERTICES ===
      let v0, v1, v2, v3, v4, v5, v6, v7;

      if (col === 0) {
        // First block: create all vertices
        v0 = addVertex(xLeft, yBottom, zFront, uLeft, 0);
        v1 = addVertex(xRight, yBottom, zFront, uRight, 0);
        v2 = addVertex(xRight, yTopBrick, zFront, uRight, 1);
        v3 = addVertex(xLeft, yTopBrick, zFront, uLeft, 1);
        v4 = addVertex(xLeft, yBottom, zBack, uLeft, 0);
        v5 = addVertex(xRight, yBottom, zBack, uRight, 0);
        v6 = addVertex(xRight, yTopBrick, zBack, uRight, 1);
        v7 = addVertex(xLeft, yTopBrick, zBack, uLeft, 1);

        prevRightBrickVertices = [v1, v2, v5, v6];
      } else {
        // Subsequent blocks: reuse right edge from previous block as left edge
        v0 = prevRightCementVertices[0]; // bottomFront from prev right cement
        v3 = prevRightCementVertices[1]; // topFront from prev right cement
        v4 = prevRightCementVertices[2]; // bottomBack from prev right cement
        v7 = prevRightCementVertices[3]; // topBack from prev right cement

        // Create new vertices for right edge
        v1 = addVertex(xRight, yBottom, zFront, uRight, 0);
        v2 = addVertex(xRight, yTopBrick, zFront, uRight, 1);
        v5 = addVertex(xRight, yBottom, zBack, uRight, 0);
        v6 = addVertex(xRight, yTopBrick, zBack, uRight, 1);

        prevRightBrickVertices = [v1, v2, v5, v6];
      }

      // Brick faces
      addQuad(v0, v1, v2, v3, false); // Front
      addQuad(v5, v4, v7, v6, false); // Back
      addQuad(v4, v5, v1, v0, false); // Bottom

      // === CEMENT PORTION ===
      if (cementThickness > 0) {
        // Top cement cap vertices
        let vt0, vt1, vt2, vt3;
        if (col === 0) {
          vt0 = addVertex(xLeft, yTopCement, zFront, uLeft, 1);
          vt1 = addVertex(xRight, yTopCement, zFront, uRight, 1);
          vt2 = addVertex(xLeft, yTopCement, zBack, uLeft, 1);
          vt3 = addVertex(xRight, yTopCement, zBack, uRight, 1);

          prevRightTopCementVertices = [vt1, vt3];
        } else {
          // Reuse from previous block
          vt0 = prevRightCornerVertices[0];
          vt2 = prevRightCornerVertices[1];
          vt1 = addVertex(xRight, yTopCement, zFront, uRight, 1);
          vt3 = addVertex(xRight, yTopCement, zBack, uRight, 1);

          prevRightTopCementVertices = [vt1, vt3];
        }

        // Top cement faces
        addQuad(v3, v2, vt1, vt0, true); // Front
        addQuad(v6, v7, vt2, vt3, true); // Back
        addQuad(vt0, vt1, vt3, vt2, true); // Top

        // Right cement strip vertices
        const vr0 = addVertex(xRightCement, yBottom, zFront, uRightCement, 0);
        const vr1 = addVertex(xRightCement, yTopBrick, zFront, uRightCement, 0.8);
        const vr2 = addVertex(xRightCement, yBottom, zBack, uRightCement, 0);
        const vr3 = addVertex(xRightCement, yTopBrick, zBack, uRightCement, 0.8);

        // Right cement faces
        addQuad(v1, vr0, vr1, v2, true); // Front
        addQuad(vr2, v5, v6, vr3, true); // Back

        // Corner cement vertices
        const vc0 = addVertex(xRightCement, yTopCement, zFront, uRightCement, 1);
        const vc1 = addVertex(xRightCement, yTopCement, zBack, uRightCement, 1);

        // Corner faces
        addQuad(v2, vr1, vc0, vt1, true); // Front
        addQuad(vr3, v6, vt3, vc1, true); // Back
        addQuad(vt1, vc0, vc1, vt3, true); // Top

        // Store for next block
        prevRightCementVertices = [vr0, vr1, vr2, vr3];
        prevRightCornerVertices = [vc0, vc1];
      }
    }

    // === END CAPS ===
    // Left cap
    const xLeftCap = -halfRowWidth;
    const vl0 = addVertex(xLeftCap, yBottom, zFront, 0, 0);
    const vl1 = addVertex(xLeftCap, yTopBrick, zFront, 0, 1);
    const vl2 = addVertex(xLeftCap, yBottom, zBack, 1, 0);
    const vl3 = addVertex(xLeftCap, yTopBrick, zBack, 1, 1);
    const vl4 = addVertex(xLeftCap, yTopCement, zFront, 0, 1);
    const vl5 = addVertex(xLeftCap, yTopCement, zBack, 1, 1);

    addQuad(vl2, vl0, vl1, vl3, false); // Brick cap
    addQuad(vl3, vl1, vl4, vl5, true);  // Cement cap

    // Right cap (full height cement)
    const xRightCap = blocksHorizontal * (blockWidth + cementThickness) - halfRowWidth;
    const vr0 = addVertex(xRightCap, yBottom, zFront, 0, 0);
    const vr1 = addVertex(xRightCap, yTopBrick, zFront, 0, 1);
    const vr2 = addVertex(xRightCap, yBottom, zBack, 1, 0);
    const vr3 = addVertex(xRightCap, yTopBrick, zBack, 1, 1);
    const vr4 = addVertex(xRightCap, yTopCement, zFront, 0, 1);
    const vr5 = addVertex(xRightCap, yTopCement, zBack, 1, 1);

    addQuad(vr0, vr2, vr3, vr1, true); // Lower cement cap (brick height)
    addQuad(vr1, vr3, vr5, vr4, true); // Upper cement cap (cement thickness)

    // Set attributes
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(uvs, 2));

    // Set indices
    const allIndices = [...brickIndices, ...cementIndices];
    geometry.setIndex(allIndices);

    // Set material groups
    geometry.clearGroups();
    geometry.addGroup(0, brickIndices.length, 0); // Brick
    geometry.addGroup(brickIndices.length, cementIndices.length, 1); // Cement

    // Compute normals
    geometry.computeVertexNormals();

    console.log(`[RowGenerator] Built row with continuous UV mapping:
      Total vertices: ${vertexIndex}
      Blocks: ${blocksHorizontal}
      Expected without sharing: ${blocksHorizontal * 18 + 12}
      Vertices saved: ${(blocksHorizontal * 18 + 12) - vertexIndex}`);

    return geometry;
  }

  /**
   * Creates a complete row as a single welded mesh.
   * Uses createRowGeometry() to build geometry with shared vertices from the start.
   */
  static createRow(
    blockGenerator: BlockGenerator,
    actualWallWidth: number,
    wallLength: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number
  ): THREE.Mesh {
    // Build row geometry with shared vertices
    const rowGeometry = this.createRowGeometry(
      blockGenerator,
      actualWallWidth,
      wallLength,
      blockWidth,
      blockHeight,
      cementThickness
    );

    // Get materials
    const materials = [
      blockGenerator.getBrickMaterial(),
      blockGenerator.getCementMaterial()
    ];

    // Check if the row is manifold
    const manifoldResult = GeometryUtils.isManifold(rowGeometry);
    console.log(`[RowGenerator] Manifold Check: ${manifoldResult.isManifold ? '✅' : '❌'} ${manifoldResult.message}`);

    // Create and return the welded mesh
    const rowMesh = new THREE.Mesh(rowGeometry, materials);
    rowMesh.castShadow = true;
    rowMesh.receiveShadow = true;

    return rowMesh;
  }

  // Removed createRowSideMesh as it is now integrated
}
