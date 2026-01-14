import * as THREE from 'three';
import { MaterialManager } from './MaterialManager';
import { GeometryBuilder } from './utils/geometry/GeometryBuilder';

export interface BlockVertices {
  rightCement: number[];
  rightCorner: number[];
}

export interface BlockLeftVertices {
  brick: number[];
  cementTop: number[];
}

export class BlockGenerator {
  constructor() {
    // Materials are managed by MaterialManager
  }

  /**
   * Adds a block to an existing GeometryBuilder, optionally sharing vertices with previous block.
   * Designed for building rows with continuous UV mapping and shared vertices.
   * Supports variable brick and cement widths for partial blocks at row edges.
   *
   * @param builder - The GeometryBuilder to add vertices and faces to
   * @param xLeft - X position of brick's left edge
   * @param brickWidth - Actual brick width (may be partial for edge blocks)
   * @param depth - Block depth (Z-axis)
   * @param cementWidth - Actual cement width (may be 0 or partial for edge blocks)
   * @param uLeft - UV left coordinate (for texture continuity across row)
   * @param uRight - UV right coordinate
   * @param yBottom - Y coordinate of bottom edge
   * @param yTopBrick - Y coordinate of top of brick
   * @param yTopCement - Y coordinate of top of cement
   * @param prevVertices - Optional vertices from previous block to share
   * @returns Object containing right edge vertices for next block to reuse, and left vertices for first block
   */
  addBlockToBuilder(
    builder: GeometryBuilder,
    xLeft: number,
    brickWidth: number,
    depth: number,
    cementWidth: number,
    uLeft: number,
    uRight: number,
    yBottom: number,
    yTopBrick: number,
    yTopCement: number,
    prevVertices?: BlockVertices
  ): { rightVertices: BlockVertices; leftVertices?: BlockLeftVertices } {
    const halfDepth = depth / 2;

    const xRight = xLeft + brickWidth;
    const xRightCement = xRight + cementWidth;
    const zFront = halfDepth;
    const zBack = -halfDepth;

    // === BRICK VERTICES ===
    let v0: number, v1: number, v2: number, v3: number;
    let v4: number, v5: number, v6: number, v7: number;
    let leftVertices: BlockLeftVertices | undefined;

    if (!prevVertices) {
      // First block: create all vertices
      v0 = builder.addVertex(xLeft, yBottom, zFront, uLeft, 0);
      v1 = builder.addVertex(xRight, yBottom, zFront, uRight, 0);
      v2 = builder.addVertex(xRight, yTopBrick, zFront, uRight, 1);
      v3 = builder.addVertex(xLeft, yTopBrick, zFront, uLeft, 1);
      v4 = builder.addVertex(xLeft, yBottom, zBack, uLeft, 0);
      v5 = builder.addVertex(xRight, yBottom, zBack, uRight, 0);
      v6 = builder.addVertex(xRight, yTopBrick, zBack, uRight, 1);
      v7 = builder.addVertex(xLeft, yTopBrick, zBack, uLeft, 1);

      leftVertices = { brick: [v0, v3, v4, v7], cementTop: [] };
    } else {
      // Subsequent blocks: reuse right edge from previous block as left edge
      v0 = prevVertices.rightCement[0];
      v3 = prevVertices.rightCement[1];
      v4 = prevVertices.rightCement[2];
      v7 = prevVertices.rightCement[3];

      // Create new vertices for right edge
      v1 = builder.addVertex(xRight, yBottom, zFront, uRight, 0);
      v2 = builder.addVertex(xRight, yTopBrick, zFront, uRight, 1);
      v5 = builder.addVertex(xRight, yBottom, zBack, uRight, 0);
      v6 = builder.addVertex(xRight, yTopBrick, zBack, uRight, 1);
    }

    // Brick faces
    builder.addQuad(v0, v1, v2, v3, false); // Front
    builder.addQuad(v5, v4, v7, v6, false); // Back
    // Bottom face removed - not visible in wall construction

    // === TOP CEMENT PORTION (always exists - mortar between rows) ===
    let vt0: number, vt1: number, vt2: number, vt3: number;

    if (!prevVertices) {
      vt0 = builder.addVertex(xLeft, yTopCement, zFront, uLeft, 1);
      vt1 = builder.addVertex(xRight, yTopCement, zFront, uRight, 1);
      vt2 = builder.addVertex(xLeft, yTopCement, zBack, uLeft, 1);
      vt3 = builder.addVertex(xRight, yTopCement, zBack, uRight, 1);

      if (leftVertices) {
        leftVertices.cementTop = [vt0, vt2];
      }
    } else {
      vt0 = prevVertices.rightCorner[0];
      vt2 = prevVertices.rightCorner[1];
      vt1 = builder.addVertex(xRight, yTopCement, zFront, uRight, 1);
      vt3 = builder.addVertex(xRight, yTopCement, zBack, uRight, 1);
    }

    // Top cement faces (above brick)
    builder.addQuad(v3, v2, vt1, vt0, true); // Front
    builder.addQuad(v6, v7, vt2, vt3, true); // Back
    // Top face removed - covered by row above

    // === RIGHT CEMENT STRIP (only if cementWidth > 0) ===
    let rightCement: number[] = [];
    let rightCorner: number[] = [];

    if (cementWidth > 0) {
      // Right cement strip vertices
      const vr0 = builder.addVertex(xRightCement, yBottom, zFront, uRight, 0);
      const vr1 = builder.addVertex(xRightCement, yTopBrick, zFront, uRight, 0.8);
      const vr2 = builder.addVertex(xRightCement, yBottom, zBack, uRight, 0);
      const vr3 = builder.addVertex(xRightCement, yTopBrick, zBack, uRight, 0.8);

      // Right cement faces
      builder.addQuad(v1, vr0, vr1, v2, true); // Front
      builder.addQuad(vr2, v5, v6, vr3, true); // Back
      // Bottom face removed - not visible in wall construction

      // Corner cement vertices
      const vc0 = builder.addVertex(xRightCement, yTopCement, zFront, uRight, 1);
      const vc1 = builder.addVertex(xRightCement, yTopCement, zBack, uRight, 1);

      // Corner faces
      builder.addQuad(v2, vr1, vc0, vt1, true); // Front
      builder.addQuad(vr3, v6, vt3, vc1, true); // Back
      // Top face removed - covered by row above

      rightCement = [vr0, vr1, vr2, vr3];
      rightCorner = [vc0, vc1];
    } else {
      // No cement strip - use brick right edge vertices for sharing
      rightCement = [v1, v2, v5, v6];
      rightCorner = [vt1, vt3];
    }

    return {
      rightVertices: { rightCement, rightCorner },
      leftVertices
    };
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
