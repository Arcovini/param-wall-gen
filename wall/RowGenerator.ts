import * as THREE from 'three';
import type { OpeningBoundsForRow } from '../types';
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
   * Adds a single side cap (end face) at a given X position.
   * Creates brick + cement portions with proper UVs and materials.
   *
   * @param builder - GeometryBuilder to add vertices and faces to
   * @param x - X position of the cap
   * @param yBottom - Y position of row bottom
   * @param yTopBrick - Y position of brick top
   * @param yTopCement - Y position of cement top (row top)
   * @param zFront - Z position of front face
   * @param zBack - Z position of back face
   * @param facingRight - If true, face normal toward +X; if false, toward -X
   */
  private static addSingleSideCap(
    builder: GeometryBuilder,
    x: number,
    yBottom: number,
    yTopBrick: number,
    yTopCement: number,
    zFront: number,
    zBack: number,
    facingRight: boolean
  ): void {
    if (facingRight) {
      // Face normal toward +X (visible from +X direction, i.e., looking left)
      // Brick portion (larger, bottom)
      const rb0 = builder.addVertex(x, yBottom, zFront, 0, 0);
      const rb1 = builder.addVertex(x, yBottom, zBack, 1, 0);
      const rb2 = builder.addVertex(x, yTopBrick, zBack, 1, 1);
      const rb3 = builder.addVertex(x, yTopBrick, zFront, 0, 1);
      builder.addQuad(rb0, rb1, rb2, rb3, false); // brick material

      // Cement portion (thinner, top)
      const rc0 = builder.addVertex(x, yTopBrick, zFront, 0, 0);
      const rc1 = builder.addVertex(x, yTopBrick, zBack, 1, 0);
      const rc2 = builder.addVertex(x, yTopCement, zBack, 1, 1);
      const rc3 = builder.addVertex(x, yTopCement, zFront, 0, 1);
      builder.addQuad(rc0, rc1, rc2, rc3, true); // cement material
    } else {
      // Face normal toward -X (visible from -X direction, i.e., looking right)
      // Brick portion (larger, bottom)
      const lb0 = builder.addVertex(x, yBottom, zBack, 0, 0);
      const lb1 = builder.addVertex(x, yBottom, zFront, 1, 0);
      const lb2 = builder.addVertex(x, yTopBrick, zFront, 1, 1);
      const lb3 = builder.addVertex(x, yTopBrick, zBack, 0, 1);
      builder.addQuad(lb0, lb1, lb2, lb3, false); // brick material

      // Cement portion (thinner, top)
      const lc0 = builder.addVertex(x, yTopBrick, zBack, 0, 0);
      const lc1 = builder.addVertex(x, yTopBrick, zFront, 1, 0);
      const lc2 = builder.addVertex(x, yTopCement, zFront, 1, 1);
      const lc3 = builder.addVertex(x, yTopCement, zBack, 0, 1);
      builder.addQuad(lc0, lc1, lc2, lc3, true); // cement material
    }
  }

  /**
   * Adds end caps to a row geometry with proper UVs and materials.
   * Creates dedicated vertices for caps (not shared with front/back faces).
   * With bounds-clamping, we only need caps at the actual wall edges.
   *
   * @param builder - GeometryBuilder to add vertices and faces to
   * @param xLeft - X position of left edge
   * @param xRight - X position of right edge
   * @param _unused - Kept for API compatibility (deprecated)
   * @param yBottom - Y position of row bottom
   * @param yTopBrick - Y position of brick top
   * @param yTopCement - Y position of cement top (row top)
   * @param zFront - Z position of front face
   * @param zBack - Z position of back face
   */
  private static addRowEndCaps(
    builder: GeometryBuilder,
    xLeft: number,
    xRight: number,
    _unused: number,
    yBottom: number,
    yTopBrick: number,
    yTopCement: number,
    zFront: number,
    zBack: number
  ): void {
    // Left cap: face normal toward -X (visible from outside)
    this.addSingleSideCap(builder, xLeft, yBottom, yTopBrick, yTopCement, zFront, zBack, false);
    // Right cap: face normal toward +X (visible from outside)
    this.addSingleSideCap(builder, xRight, yBottom, yTopBrick, yTopCement, zFront, zBack, true);
  }

  /**
   * Creates row geometry with bounds-clamping approach.
   * Generates blocks within wall bounds, creating partial blocks at edges as needed.
   * No boolean/CSG operations required - geometry fits exactly within actualWallWidth.
   *
   * Pseudo-boolean: Skips blocks that are completely inside any opening bounds.
   *
   * @param rowIndex - The index of the row (0-based). Odd rows will be offset by half a block width.
   * @param openingBounds - Opening bounds that affect this row (pre-filtered by Y overlap).
   */
  static createRowGeometry(
    blockGenerator: BlockGenerator,
    actualWallWidth: number,
    wallLength: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number,
    rowIndex: number = 0,
    openingBounds: OpeningBoundsForRow[] = []
  ): THREE.BufferGeometry {
    const builder = new GeometryBuilder();
    const unitWidth = blockWidth + cementThickness;

    // Wall bounds
    const rowLeft = -actualWallWidth / 2;
    const rowRight = actualWallWidth / 2;

    // Calculate offset for odd rows (stagger pattern)
    const rowOffset = (rowIndex % 2 === 1) ? (blockWidth / 2) : 0;

    // Pattern starts at rowLeft minus offset (may be before wall edge for odd rows)
    const patternStart = rowLeft - rowOffset;

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

    // Track actual wall edge positions for end caps
    let actualLeftEdge: number | undefined;
    let actualRightEdge: number | undefined;

    // UV counter for texture continuity
    let uCounter = 0;

    // Generate blocks by iterating through pattern positions
    let patternX = patternStart;
    let blockCount = 0;
    let skippedByOpening = 0;

    while (patternX < rowRight) {
      // Ideal block boundaries (before clamping)
      const idealBrickLeft = patternX;
      const idealBrickRight = patternX + blockWidth;
      const idealCementRight = patternX + unitWidth;

      // Clamp to wall bounds
      const clampedBrickLeft = Math.max(idealBrickLeft, rowLeft);
      const clampedBrickRight = Math.min(idealBrickRight, rowRight);
      const clampedCementRight = Math.min(idealCementRight, rowRight);

      // Calculate actual widths after clamping
      const actualBrickWidth = clampedBrickRight - clampedBrickLeft;
      const actualCementWidth = Math.max(0, clampedCementRight - clampedBrickRight);

      // Skip if brick has no width (entirely outside wall bounds)
      if (actualBrickWidth <= 0) {
        patternX += unitWidth;
        continue;
      }

      // === OPENING BOUNDS CLAMPING ===
      // Similar to wall bounds clamping, but openings carve out space from blocks
      let effectiveBrickLeft = clampedBrickLeft;
      let effectiveBrickRight = clampedBrickRight;
      let effectiveCementRight = clampedCementRight;

      // Track if block edges were clamped by openings (for adding caps)
      let clampedOnRightByOpening = false;
      let clampedOnLeftByOpening = false;

      for (const opening of openingBounds) {
        // Check if block overlaps with opening horizontally
        if (effectiveBrickLeft < opening.right && effectiveBrickRight > opening.left) {

          if (effectiveBrickLeft >= opening.left && effectiveBrickRight <= opening.right) {
            // Case: Block completely inside opening → mark for skip
            effectiveBrickRight = effectiveBrickLeft;
          } else if (effectiveBrickLeft < opening.left && effectiveBrickRight > opening.right) {
            // Case: Block spans entire opening → keep left portion only
            effectiveBrickRight = opening.left;
            effectiveCementRight = Math.min(effectiveCementRight, opening.left);
            clampedOnRightByOpening = true;
          } else if (effectiveBrickLeft < opening.left) {
            // Case: Block overlaps opening on right → clamp right edge
            effectiveBrickRight = opening.left;
            effectiveCementRight = Math.min(effectiveCementRight, opening.left);
            clampedOnRightByOpening = true;
          } else {
            // Case: Block overlaps opening on left → clamp left edge
            effectiveBrickLeft = opening.right;
            clampedOnLeftByOpening = true;
          }
        }
      }

      // Recalculate widths after opening clamping
      const effectiveBrickWidth = effectiveBrickRight - effectiveBrickLeft;
      const effectiveCementWidth = Math.max(0, effectiveCementRight - effectiveBrickRight);

      // Skip if brick has no width after opening clamping
      if (effectiveBrickWidth <= 0) {
        skippedByOpening++;
        patternX += unitWidth;
        // Reset vertex sharing - next block can't share with previous non-adjacent block
        prevVertices = undefined;
        continue;
      }

      // Check if we need to reset vertex sharing due to opening gap
      // (block was clamped on left side, creating discontinuity)
      if (effectiveBrickLeft > clampedBrickLeft) {
        prevVertices = undefined;
      }

      // Track edge positions for end caps (use effective positions)
      if (actualLeftEdge === undefined) {
        actualLeftEdge = effectiveBrickLeft;
      }
      actualRightEdge = effectiveBrickRight + effectiveCementWidth;

      // Calculate UVs - based on position relative to pattern for "cut" appearance
      const uLeft = uCounter + (effectiveBrickLeft - idealBrickLeft) / blockWidth;
      const uRight = uCounter + (effectiveBrickRight - idealBrickLeft) / blockWidth;

      // Add block to geometry (using effective dimensions after opening clamping)
      const result = blockGenerator.addBlockToBuilder(
        builder,
        effectiveBrickLeft,
        effectiveBrickWidth,
        wallLength,
        effectiveCementWidth,
        uLeft,
        uRight,
        yBottom,
        yTopBrick,
        yTopCement,
        prevVertices
      );

      // Add opening edge caps (inner faces at opening boundaries)
      if (clampedOnLeftByOpening) {
        // Block was clamped on left → add cap facing -X (into the opening)
        this.addSingleSideCap(builder, effectiveBrickLeft, yBottom, yTopBrick, yTopCement, zFront, zBack, false);
      }
      if (clampedOnRightByOpening) {
        // Block was clamped on right → add cap facing +X (into the opening)
        // Use effective right edge (brick right + cement width, or just brick right if no cement)
        const capX = effectiveBrickRight + effectiveCementWidth;
        this.addSingleSideCap(builder, capX, yBottom, yTopBrick, yTopCement, zFront, zBack, true);
      }

      prevVertices = result.rightVertices;
      patternX += unitWidth;
      uCounter += 1;
      blockCount++;
    }

    // Add end caps with actual edge positions
    if (actualLeftEdge !== undefined && actualRightEdge !== undefined) {
      this.addRowEndCaps(
        builder,
        actualLeftEdge,
        actualRightEdge, // Right edge (brick or cement depending on last block)
        actualRightEdge, // Same as above since we clamp to wall bounds
        yBottom,
        yTopBrick,
        yTopCement,
        zFront,
        zBack
      );
    }

    console.log(`[RowGenerator] Built row ${rowIndex} with bounds-clamping:
      Wall width: ${actualWallWidth}, Blocks: ${blockCount}, Skipped by openings: ${skippedByOpening}
      Left edge: ${actualLeftEdge?.toFixed(3)}, Right edge: ${actualRightEdge?.toFixed(3)}`);

    return builder.build();
  }

  /**
   * Creates a complete row as a single welded mesh.
   * Uses createRowGeometry() to build geometry with shared vertices from the start.
   * @param rowIndex - The index of the row (0-based). Odd rows will be offset by half a block width.
   * @param openingBounds - Opening bounds that affect this row (pre-filtered by Y overlap).
   */
  static createRow(
    blockGenerator: BlockGenerator,
    actualWallWidth: number,
    wallLength: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number,
    rowIndex: number = 0,
    openingBounds: OpeningBoundsForRow[] = []
  ): THREE.Mesh {
    // Build row geometry with shared vertices
    const rowGeometry = this.createRowGeometry(
      blockGenerator,
      actualWallWidth,
      wallLength,
      blockWidth,
      blockHeight,
      cementThickness,
      rowIndex,
      openingBounds
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
