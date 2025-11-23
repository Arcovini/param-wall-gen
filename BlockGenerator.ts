import * as THREE from 'three';
import { MaterialManager } from './MaterialManager';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export class BlockGenerator {
  constructor() {
    // Materials are managed by MaterialManager
  }

  /**
   * Creates an open-sided block geometry with cement on top and right side.
   * The block consists of:
   * - Brick portion (front, back, bottom - NO left/right sides)
   * - Cement layer on TOP (front, back, top face)
   * - Cement strip on RIGHT side (front, back, right face - full height)
   * 
   * Left side is completely open (no faces).
   * 
   * This method builds geometry with SHARED VERTICES from the start for proper welding.
   * 
   * @param width Block width (X-axis)
   * @param height Block height (Y-axis) - brick portion only (excluding cement)
   * @param depth Block depth (Z-axis, wallLength)
   * @param cementThickness Thickness of cement layers
   * @returns BufferGeometry with minimum vertex count and material groups
   */
  createBlockGeometry(
    width: number,
    height: number,
    depth: number,
    cementThickness: number = 0
  ): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();

    // Define all unique vertices for the block
    const vertices: number[] = [];
    const indices: number[] = [];
    const uvs: number[] = [];

    // Material group tracking
    const brickIndices: number[] = [];
    const cementIndices: number[] = [];

    // Calculate positions
    const halfWidth = width / 2;
    const halfDepth = depth / 2;
    // Total height includes: brick + top cement
    const totalHeight = height + cementThickness;
    const halfTotalHeight = totalHeight / 2;

    const yBottom = -halfTotalHeight;
    const yTopBrick = -halfTotalHeight + height;
    const yTopCement = halfTotalHeight;

    const xLeft = -halfWidth;
    const xRight = halfWidth;
    const zFront = halfDepth;
    const zBack = -halfDepth;

    let vertexIndex = 0;
    let uvIndex = 0;

    /**
     * Helper to add a vertex with UV
     */
    const addVertex = (x: number, y: number, z: number, u: number, v: number): number => {
      vertices.push(x, y, z);
      uvs.push(u, v);
      return vertexIndex++;
    };

    /**
     * Helper to add a quad face (two triangles) with proper UVs
     * Vertices should be ordered counter-clockwise when viewed from the front
     */
    const addQuad = (v0: number, v1: number, v2: number, v3: number, isCement: boolean) => {
      // Triangle 1: v0, v1, v2
      (isCement ? cementIndices : brickIndices).push(v0, v1, v2);

      // Triangle 2: v0, v2, v3
      (isCement ? cementIndices : brickIndices).push(v0, v2, v3);
    };

    // ===== BRICK VERTICES (8 corners of the central brick box) =====
    // Bottom-left-front
    const v0 = addVertex(xLeft, yBottom, zFront, 0, 0);
    // Bottom-right-front  
    const v1 = addVertex(xRight, yBottom, zFront, 1, 0);
    // Top-right-front (at brick height)
    const v2 = addVertex(xRight, yTopBrick, zFront, 1, 1);
    // Top-left-front (at brick height)
    const v3 = addVertex(xLeft, yTopBrick, zFront, 0, 1);

    // Bottom-left-back
    const v4 = addVertex(xLeft, yBottom, zBack, 0, 0);
    // Bottom-right-back
    const v5 = addVertex(xRight, yBottom, zBack, 1, 0);
    // Top-right-back (at brick height)
    const v6 = addVertex(xRight, yTopBrick, zBack, 1, 1);
    // Top-left-back (at brick height)
    const v7 = addVertex(xLeft, yTopBrick, zBack, 0, 1);

    // ===== BRICK FACES =====
    // Front face (brick portion only)
    addQuad(v0, v1, v2, v3, false);

    // Back face
    addQuad(v5, v4, v7, v6, false);

    // Bottom face
    addQuad(v4, v5, v1, v0, false);

    // ===== CEMENT PORTION =====
    if (cementThickness > 0) {
      // === TOP CEMENT CAP ===
      // Vertices at very top (above brick)
      const vt0 = addVertex(xLeft, yTopCement, zFront, 0, 1);
      const vt1 = addVertex(xRight, yTopCement, zFront, 1, 1);
      const vt2 = addVertex(xLeft, yTopCement, zBack, 0, 1);
      const vt3 = addVertex(xRight, yTopCement, zBack, 1, 1);

      // Front face of top cement
      addQuad(v3, v2, vt1, vt0, true);

      // Back face of top cement
      addQuad(v6, v7, vt2, vt3, true);

      // Top face of top cement (flipped winding for correct normal)
      addQuad(vt0, vt1, vt3, vt2, true);

      // === RIGHT CEMENT STRIP (vertical, brick height only) ===
      // Vertices on the right edge extended by cement thickness
      const xRightCement = xRight + cementThickness;

      // Right cement vertices at brick level
      const vr0 = addVertex(xRightCement, yBottom, zFront, 1, 0);
      const vr1 = addVertex(xRightCement, yTopBrick, zFront, 1, 0.8);
      const vr2 = addVertex(xRightCement, yBottom, zBack, 1, 0);
      const vr3 = addVertex(xRightCement, yTopBrick, zBack, 1, 0.8);

      // Front face of right cement (brick height)
      addQuad(v1, vr0, vr1, v2, true);

      // Back face of right cement (brick height)
      addQuad(vr2, v5, v6, vr3, true);

      // === CORNER CEMENT (where top and right meet) ===
      // Corner vertices at the top
      const vc0 = addVertex(xRightCement, yTopCement, zFront, 1, 1);
      const vc1 = addVertex(xRightCement, yTopCement, zBack, 1, 1);

      // Front face of corner
      addQuad(v2, vr1, vc0, vt1, true);

      // Back face of corner
      addQuad(vr3, v6, vt3, vc1, true);

      // Top face of corner (extends the top cement to the right)
      addQuad(vt1, vc0, vc1, vt3, true);
    }

    // Set attributes
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(uvs, 2));

    // Set indices
    const allIndices = [...brickIndices, ...cementIndices];
    geometry.setIndex(allIndices);

    // Set material groups
    geometry.clearGroups();
    geometry.addGroup(0, brickIndices.length, 0); // Material index 0: Brick
    geometry.addGroup(brickIndices.length, cementIndices.length, 1); // Material index 1: Cement

    // Compute normals properly
    geometry.computeVertexNormals();

    // Diagnostic
    console.log(`[BlockGenerator] Vertex Stats:
      Total vertices: ${vertexIndex}
      Brick indices: ${brickIndices.length}
      Cement indices: ${cementIndices.length}
      Expected: 18 vertices (8 brick + 4 top cement + 4 right cement + 2 corner)`);

    return geometry;
  }

  /**
   * Returns the shared brick material
   */
  getBrickMaterial(): THREE.Material {
    return MaterialManager.getInstance().getBrickMaterial();
  }

  /**
   * Returns the shared cement material
   */
  getCementMaterial(): THREE.Material {
    return MaterialManager.getInstance().getCementMaterial();
  }

  /**
   * Disposes of resources
   */
  dispose(): void {
    // Materials are managed by MaterialManager, so we don't dispose them here
  }
}
