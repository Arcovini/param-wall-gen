import * as THREE from 'three';
import type { OpeningBoundsForRow } from '../types';
import { BlockGenerator, BlockVertices } from './BlockGenerator';
import { isManifoldWithBVH } from '../utils/csg/CsgValidator';
import { GeometryBuilder } from '../utils/geometry/GeometryBuilder';
import { MaterialManager } from './MaterialManager';


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

    // Track if we need wall end caps at the fixed wall bounds
    // (only when a block actually touches the wall boundary, not an opening boundary)
    let needLeftWallCap = false;
    let needRightWallCap = false;

    // UV counter for texture continuity
    let uCounter = 0;

    // Track which opening edges have caps (to add missing ones at the end)
    // Key: opening edge X position (rounded for floating point comparison)
    const cappedOpeningEdges = new Set<string>();
    const roundForKey = (x: number) => x.toFixed(4);

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
      // Track which opening edges this block provides caps for
      let capsOpeningLeft: number | undefined;
      let capsOpeningRight: number | undefined;

      for (const opening of openingBounds) {
        // Check if block overlaps with or touches opening horizontally
        // Use inclusive bounds (<=, >=) to handle blocks whose edges coincide exactly
        // with opening boundaries - these still need caps even without clamping
        if (effectiveBrickLeft <= opening.right && effectiveBrickRight >= opening.left) {

          if (effectiveBrickLeft >= opening.left && effectiveBrickRight <= opening.right) {
            // Case: Block completely inside opening → mark for skip
            effectiveBrickRight = effectiveBrickLeft;
          } else if (effectiveBrickLeft < opening.left && effectiveBrickRight > opening.right) {
            // Case: Block spans entire opening → keep left portion only
            effectiveBrickRight = opening.left;
            effectiveCementRight = Math.min(effectiveCementRight, opening.left);
            clampedOnRightByOpening = true;
            capsOpeningLeft = opening.left;
          } else if (effectiveBrickLeft < opening.left) {
            // Case: Block overlaps opening on right → clamp right edge
            effectiveBrickRight = opening.left;
            effectiveCementRight = Math.min(effectiveCementRight, opening.left);
            clampedOnRightByOpening = true;
            capsOpeningLeft = opening.left;
          } else {
            // Case: Block overlaps opening on left → clamp left edge
            effectiveBrickLeft = opening.right;
            clampedOnLeftByOpening = true;
            capsOpeningRight = opening.right;
          }
        } else if (effectiveBrickLeft > opening.right && effectiveBrickLeft <= opening.right + unitWidth) {
          // Case: Block starts just after opening (within one unit width)
          // Check if extending would cause overlap with another opening
          const extendedLeft = opening.right;
          const wouldOverlapOther = openingBounds.some(other =>
            other !== opening && extendedLeft < other.right && effectiveBrickRight > other.left
          );
          if (!wouldOverlapOther) {
            // Safe to extend block back to opening edge
            effectiveBrickLeft = extendedLeft;
            clampedOnLeftByOpening = true;
            capsOpeningRight = opening.right;
          }
        } else if (effectiveBrickRight < opening.left && effectiveCementRight < opening.left && effectiveCementRight >= opening.left - unitWidth) {
          // Case: Block ends just before opening (within one unit width, doesn't reach)
          // Check if extending would cause overlap with another opening
          const extendedRight = opening.left;
          const wouldOverlapOther = openingBounds.some(other =>
            other !== opening && effectiveBrickLeft < other.right && extendedRight > other.left
          );
          if (!wouldOverlapOther) {
            // Safe to extend BRICK (not cement) to reach opening edge
            effectiveBrickRight = extendedRight;
            effectiveCementRight = extendedRight; // No cement after extended brick
            clampedOnRightByOpening = true;
            capsOpeningLeft = opening.left;
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

      // Track if this block touches wall bounds (for wall end caps)
      // Use small tolerance for floating point comparison
      const tolerance = 0.0001;
      if (Math.abs(effectiveBrickLeft - rowLeft) < tolerance && !clampedOnLeftByOpening) {
        needLeftWallCap = true;
      }
      const blockRightEdge = effectiveBrickRight + effectiveCementWidth;
      if (Math.abs(blockRightEdge - rowRight) < tolerance && !clampedOnRightByOpening) {
        needRightWallCap = true;
      }

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
      if (clampedOnLeftByOpening && capsOpeningRight !== undefined) {
        // Block was clamped on left → add cap facing -X (into the opening)
        this.addSingleSideCap(builder, effectiveBrickLeft, yBottom, yTopBrick, yTopCement, zFront, zBack, false);
        cappedOpeningEdges.add(roundForKey(capsOpeningRight) + '_R'); // Right edge of opening
      }
      if (clampedOnRightByOpening && capsOpeningLeft !== undefined) {
        // Block was clamped on right → add cap facing +X (into the opening)
        // Use effective right edge (brick right + cement width, or just brick right if no cement)
        const capX = effectiveBrickRight + effectiveCementWidth;
        this.addSingleSideCap(builder, capX, yBottom, yTopBrick, yTopCement, zFront, zBack, true);
        cappedOpeningEdges.add(roundForKey(capsOpeningLeft) + '_L'); // Left edge of opening
      }

      prevVertices = result.rightVertices;
      patternX += unitWidth;
      uCounter += 1;
      blockCount++;
    }

    // Add wall end caps at fixed wall bounds (rowLeft/rowRight)
    // Only add if a block actually touches that bound AND wasn't clamped by an opening there
    if (needLeftWallCap) {
      this.addSingleSideCap(builder, rowLeft, yBottom, yTopBrick, yTopCement, zFront, zBack, false);
    }
    if (needRightWallCap) {
      this.addSingleSideCap(builder, rowRight, yBottom, yTopBrick, yTopCement, zFront, zBack, true);
    }

    // Add missing opening caps
    // This handles the case where blocks fall completely inside an opening,
    // and the first block after the opening doesn't reach back to the opening edge
    for (const opening of openingBounds) {
      const leftKey = roundForKey(opening.left) + '_L';
      const rightKey = roundForKey(opening.right) + '_R';

      if (!cappedOpeningEdges.has(leftKey)) {
        // Missing cap at opening's left edge (blocks on the left didn't reach here)
        // Add cap facing +X (into the opening)
        this.addSingleSideCap(builder, opening.left, yBottom, yTopBrick, yTopCement, zFront, zBack, true);
      }
      if (!cappedOpeningEdges.has(rightKey)) {
        // Missing cap at opening's right edge (blocks on the right didn't reach here)
        // Add cap facing -X (into the opening)
        this.addSingleSideCap(builder, opening.right, yBottom, yTopBrick, yTopCement, zFront, zBack, false);
      }
    }

    console.log(`[RowGenerator] Built row ${rowIndex} with bounds-clamping:
      Wall width: ${actualWallWidth}, Blocks: ${blockCount}, Skipped by openings: ${skippedByOpening}
      Wall caps: left=${needLeftWallCap}, right=${needRightWallCap}`);

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

  /**
   * Creates a top cap for the wall showing the brick + cement pattern of the topmost row.
   * Creates horizontal faces (facing up +Y) at the top of the completed wall.
   *
   * Wall Top Cap Structure:
   * ```
   *                    Wall Width
   *     ◄─────────────────────────────────────────►
   *     ┌─────┬─┬─────┬─┬─────┬─┬─────┬─┬─────┬─┐  ← Top cap surface (Y = topY)
   *     │BRICK│C│BRICK│C│BRICK│C│BRICK│C│BRICK│C│     Facing up (+Y)
   *     └─────┴─┴─────┴─┴─────┴─┴─────┴─┴─────┴─┘
   *                         C = Cement joint
   *
   * Opening regions are skipped:
   *     ┌─────┬─┬─────┐     ┌─────┬─┬─────┬─┐
   *     │BRICK│C│BRICK│ GAP │BRICK│C│BRICK│C│
   *     └─────┴─┴─────┘     └─────┴─┴─────┴─┘
   *                   └─────┘
   *                   Opening
   * ```
   *
   * @param actualWallWidth - The actual wall width
   * @param wallLength - Wall depth (Z-axis)
   * @param blockWidth - Width of each block
   * @param blockHeight - Height of each block (unused but kept for consistency)
   * @param cementThickness - Thickness of cement layer
   * @param topRowIndex - Index of the topmost row (for stagger pattern calculation)
   * @param topY - Y position of the top surface
   * @param openingBounds - Opening bounds to skip (openings that reach the top)
   * @returns Top cap mesh (null if wall has no rows)
   */
  static createWallTopCap(
    actualWallWidth: number,
    wallLength: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number,
    topRowIndex: number,
    topY: number,
    openingBounds: OpeningBoundsForRow[] = []
  ): THREE.Mesh | null {
    if (topRowIndex < 0) {
      return null; // No rows, no cap needed
    }

    const brickMaterial = MaterialManager.getInstance().getBrickMaterial();
    const cementMaterial = MaterialManager.getInstance().getCementMaterial();

    const halfDepth = wallLength / 2;
    const zFront = halfDepth;
    const zBack = -halfDepth;

    const wallLeft = -actualWallWidth / 2;
    const wallRight = actualWallWidth / 2;

    // Separate arrays for brick and cement geometry
    const brickPositions: number[] = [];
    const brickUvs: number[] = [];
    const brickIndices: number[] = [];
    let brickVertexIndex = 0;

    const cementPositions: number[] = [];
    const cementUvs: number[] = [];
    const cementIndices: number[] = [];
    let cementVertexIndex = 0;

    // Match RowGenerator's stagger logic: odd rows have offset
    const rowOffset = (topRowIndex % 2 === 1) ? (blockWidth / 2) : 0;

    // Unit width (block + cement joint)
    const unitWidth = blockWidth + cementThickness;

    // Pattern starts from wall left edge with row offset
    const patternStart = wallLeft - rowOffset;

    // Helper to add a horizontal brick quad (facing up +Y)
    const addBrickHorizontalQuad = (x1: number, x2: number, y: number) => {
      const startIdx = brickVertexIndex;
      brickPositions.push(
        x1, y, zFront,
        x2, y, zFront,
        x2, y, zBack,
        x1, y, zBack
      );
      // Normalized UVs for proper texture tiling
      const uScale = (x2 - x1) / blockWidth;
      brickUvs.push(0, 0, uScale, 0, uScale, 1, 0, 1);
      brickIndices.push(
        startIdx + 0, startIdx + 1, startIdx + 2,
        startIdx + 0, startIdx + 2, startIdx + 3
      );
      brickVertexIndex += 4;
    };

    // Helper to add a horizontal cement quad (facing up +Y)
    const addCementHorizontalQuad = (x1: number, x2: number, y: number) => {
      const startIdx = cementVertexIndex;
      cementPositions.push(
        x1, y, zFront,
        x2, y, zFront,
        x2, y, zBack,
        x1, y, zBack
      );
      cementUvs.push(0, 0, 1, 0, 1, 1, 0, 1);
      cementIndices.push(
        startIdx + 0, startIdx + 1, startIdx + 2,
        startIdx + 0, startIdx + 2, startIdx + 3
      );
      cementVertexIndex += 4;
    };

    // Filter openings that intersect with the current wall top
    // An opening creates a gap if it spans the topY level:
    // - snappedBottomY <= topY (opening starts at or below cap)
    // - snappedTopY >= topY (opening ends at or above cap)
    // Use blockHeight as tolerance to account for geometry offset and row height differences
    const topOpenings = openingBounds.filter(opening =>
      opening.snappedBottomY <= topY + blockHeight &&
      opening.snappedTopY >= topY - blockHeight
    );

    // Generate block pattern across the full wall width
    let patternX = patternStart;
    let brickFaces = 0;
    let cementFaces = 0;

    while (patternX < wallRight) {
      const brickLeft = patternX;
      const brickRight = patternX + blockWidth;
      const cementRight = patternX + unitWidth;

      // Clamp to wall bounds
      let clampedBrickLeft = Math.max(brickLeft, wallLeft);
      let clampedBrickRight = Math.min(brickRight, wallRight);
      let clampedCementRight = Math.min(cementRight, wallRight);

      // Skip if completely outside wall bounds
      if (clampedBrickRight <= clampedBrickLeft) {
        patternX += unitWidth;
        continue;
      }

      // Apply opening clamping - skip or clamp blocks that overlap openings
      for (const opening of topOpenings) {
        // Check if brick overlaps this opening horizontally
        if (clampedBrickLeft < opening.right && clampedBrickRight > opening.left) {
          if (clampedBrickLeft >= opening.left && clampedBrickRight <= opening.right) {
            // Completely inside opening → skip
            clampedBrickRight = clampedBrickLeft;
          } else if (clampedBrickLeft < opening.left && clampedBrickRight > opening.right) {
            // Spans entire opening → keep left part only
            clampedBrickRight = opening.left;
            clampedCementRight = Math.min(clampedCementRight, opening.left);
          } else if (clampedBrickLeft < opening.left) {
            // Overlaps right into opening → clamp right edge
            clampedBrickRight = opening.left;
            clampedCementRight = Math.min(clampedCementRight, opening.left);
          } else {
            // Overlaps left from opening → clamp left edge
            clampedBrickLeft = opening.right;
          }
        }

        // Clamp cement to opening bounds
        if (clampedCementRight > clampedBrickRight) {
          if (clampedBrickRight < opening.right && clampedCementRight > opening.left) {
            if (clampedBrickRight >= opening.left) {
              clampedCementRight = Math.min(clampedCementRight, opening.left);
            }
          }
        }
      }

      // Add brick top face if visible after clamping
      if (clampedBrickRight > clampedBrickLeft) {
        addBrickHorizontalQuad(clampedBrickLeft, clampedBrickRight, topY);
        brickFaces++;
      }

      // Add cement joint face if visible
      if (clampedCementRight > clampedBrickRight && clampedBrickRight > wallLeft) {
        addCementHorizontalQuad(clampedBrickRight, clampedCementRight, topY);
        cementFaces++;
      }

      patternX += unitWidth;
    }

    // Skip if no geometry was created
    if (brickFaces === 0 && cementFaces === 0) {
      console.log(`[RowGenerator] Wall top cap skipped - no visible faces`);
      return null;
    }

    // Combine brick and cement geometry (brick first, then cement)
    const allPositions = [...brickPositions, ...cementPositions];
    const allUvs = [...brickUvs, ...cementUvs];

    // Offset cement indices by brick vertex count
    const brickVertexCount = brickPositions.length / 3;
    const offsetCementIndices = cementIndices.map(i => i + brickVertexCount);
    const allIndices = [...brickIndices, ...offsetCementIndices];

    // Create geometry
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(allPositions, 3));
    geom.setAttribute('uv', new THREE.Float32BufferAttribute(allUvs, 2));
    geom.setIndex(allIndices);

    // Set material groups: brick first, then cement
    geom.addGroup(0, brickIndices.length, 0);
    geom.addGroup(brickIndices.length, offsetCementIndices.length, 1);

    geom.computeVertexNormals();

    // Create mesh with both materials
    const topCap = new THREE.Mesh(geom, [brickMaterial, cementMaterial]);
    topCap.name = 'WallTopCap';
    topCap.castShadow = true;
    topCap.receiveShadow = true;

    console.log(`[RowGenerator] Created wall top cap at Y=${topY.toFixed(3)}, row ${topRowIndex} pattern (offset=${rowOffset.toFixed(3)}), ${brickFaces} brick faces, ${cementFaces} cement faces, ${topOpenings.length} openings skipped`);

    return topCap;
  }
}
