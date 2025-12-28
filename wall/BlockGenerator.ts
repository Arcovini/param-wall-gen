import * as THREE from 'three';
import { MaterialManager } from './MaterialManager';
import { GeometryBuilder } from '../utils/geometry/GeometryBuilder';

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
    const builder = new GeometryBuilder();

    // Calculate positions
    const halfWidth = width / 2;
    const halfDepth = depth / 2;
    const totalHeight = height + cementThickness;
    const halfTotalHeight = totalHeight / 2;

    const yBottom = -halfTotalHeight;
    const yTopBrick = -halfTotalHeight + height;
    const yTopCement = halfTotalHeight;

    const xLeft = -halfWidth;
    const xRight = halfWidth;
    const zFront = halfDepth;
    const zBack = -halfDepth;

    // ===== BRICK VERTICES (8 corners of the central brick box) =====
    const v0 = builder.addVertex(xLeft, yBottom, zFront, 0, 0);
    const v1 = builder.addVertex(xRight, yBottom, zFront, 1, 0);
    const v2 = builder.addVertex(xRight, yTopBrick, zFront, 1, 1);
    const v3 = builder.addVertex(xLeft, yTopBrick, zFront, 0, 1);
    const v4 = builder.addVertex(xLeft, yBottom, zBack, 0, 0);
    const v5 = builder.addVertex(xRight, yBottom, zBack, 1, 0);
    const v6 = builder.addVertex(xRight, yTopBrick, zBack, 1, 1);
    const v7 = builder.addVertex(xLeft, yTopBrick, zBack, 0, 1);

    // ===== BRICK FACES =====
    builder.addQuad(v0, v1, v2, v3, false); // Front
    builder.addQuad(v5, v4, v7, v6, false); // Back
    builder.addQuad(v4, v5, v1, v0, false); // Bottom

    // ===== CEMENT PORTION =====
    if (cementThickness > 0) {
      // Top cement cap vertices
      const vt0 = builder.addVertex(xLeft, yTopCement, zFront, 0, 1);
      const vt1 = builder.addVertex(xRight, yTopCement, zFront, 1, 1);
      const vt2 = builder.addVertex(xLeft, yTopCement, zBack, 0, 1);
      const vt3 = builder.addVertex(xRight, yTopCement, zBack, 1, 1);

      builder.addQuad(v3, v2, vt1, vt0, true); // Front
      builder.addQuad(v6, v7, vt2, vt3, true); // Back
      builder.addQuad(vt0, vt1, vt3, vt2, true); // Top

      // Right cement strip vertices
      const xRightCement = xRight + cementThickness;
      const vr0 = builder.addVertex(xRightCement, yBottom, zFront, 1, 0);
      const vr1 = builder.addVertex(xRightCement, yTopBrick, zFront, 1, 0.8);
      const vr2 = builder.addVertex(xRightCement, yBottom, zBack, 1, 0);
      const vr3 = builder.addVertex(xRightCement, yTopBrick, zBack, 1, 0.8);

      builder.addQuad(v1, vr0, vr1, v2, true); // Front
      builder.addQuad(vr2, v5, v6, vr3, true); // Back

      // Corner cement vertices
      const vc0 = builder.addVertex(xRightCement, yTopCement, zFront, 1, 1);
      const vc1 = builder.addVertex(xRightCement, yTopCement, zBack, 1, 1);

      builder.addQuad(v2, vr1, vc0, vt1, true); // Front
      builder.addQuad(vr3, v6, vt3, vc1, true); // Back
      builder.addQuad(vt1, vc0, vc1, vt3, true); // Top
    }

    const { brick, cement } = builder.getIndexCounts();
    console.log(`[BlockGenerator] Vertex Stats:
      Total vertices: ${builder.getVertexCount()}
      Brick indices: ${brick}
      Cement indices: ${cement}
      Expected: 18 vertices (8 brick + 4 top cement + 4 right cement + 2 corner)`);

    return builder.build();
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
