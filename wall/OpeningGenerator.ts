import * as THREE from 'three';
import type { OpeningParams } from '../types';
import { LintelGenerator } from './LintelGenerator';
import { MaterialManager } from './MaterialManager';

/**
 * Data structure for tracking opening-related meshes
 */
export interface OpeningData {
  opening: OpeningParams;
  mesh: THREE.Mesh;                    // The snapped + oversized opening mesh (used for CSG)
  originalMesh: THREE.Mesh;            // The original opening mesh (exact params, for red visualization)
  snappedVisMesh: THREE.Mesh;          // The snapped opening mesh (exact snapped dims, for blue visualization)
  lintelMesh: THREE.Mesh | null;
  intersectsWall: boolean;
  snappedBounds: SnappedBounds | null; // Snapping information (null if snapping not applied)
}

/**
 * Wall bounds for intersection testing
 */
export interface WallBounds {
  halfWidth: number;
  halfHeight: number;
  halfLength: number;
}

/**
 * Context needed for opening processing
 */
export interface OpeningProcessContext {
  wallHeight: number;
  wallLength: number;
  blockHeight: number;
  blockWidth: number;
  actualWallHeight: number;
  cementThickness: number;
}

/**
 * Calculates the Y position where infill begins (base of infill).
 * Returns null if there's no infill gap.
 */
export function calculateInfillBaseY(
  wallHeight: number,
  blockHeight: number,
  cementThickness: number
): number | null {
  const blocksVertical = Math.floor(wallHeight / (blockHeight + cementThickness));
  const fullWallHeight = blocksVertical * blockHeight + (blocksVertical - 1) * cementThickness;
  const gap = wallHeight - fullWallHeight;

  if (gap <= 0) {
    return null; // No infill
  }

  // Infill base Y in centered coordinate system
  // Wall top = wallHeight/2, infill height = gap
  // Infill base = wallTop - gap = wallHeight/2 - gap
  return wallHeight / 2 - gap;
}

/**
 * Snapped opening bounds result
 */
export interface SnappedBounds {
  originalBottomY: number;
  originalTopY: number;
  snappedBottomY: number;
  snappedTopY: number;
  originalHeight: number;
  snappedHeight: number;
}

/**
 * Snaps opening top and bottom to row block edges.
 *
 * Row structure (from bottom to top):
 * ```
 * ┌─────────────────────────┐ ← Block top (snap point for opening TOP)
 * │         BLOCK           │  blockHeight
 * ├─────────────────────────┤ ← Block bottom (snap point for opening BOTTOM)
 * │        CEMENT           │  cementThickness
 * └─────────────────────────┘
 * ```
 *
 * IMPORTANT: Geometry offset correction
 * - RowGenerator builds geometry centered on row-center (total height)
 * - WallManager positions mesh at block-center
 * - This creates an offset of -cementThickness/2 for actual block positions
 *
 * Actual snap points (accounting for geometry offset):
 * - Block bottoms at: wallBottomY + i * rowHeight - cementThickness/2
 * - Block tops at: wallBottomY + i * rowHeight + blockHeight - cementThickness/2
 *
 * Snapping rules:
 * - Opening bottom → snaps DOWN to nearest block bottom (floor)
 * - Opening top → snaps UP to nearest block top (ceil)
 *
 * This ensures the snapped opening always ENCOMPASSES the original opening
 * and aligns with complete block edges (not cement joints).
 */
export function snapToRowBoundaries(
  openingCenterY: number,
  openingHeight: number,
  wallHeight: number,
  blockHeight: number,
  cementThickness: number
): SnappedBounds {
  const rowHeight = blockHeight + cementThickness;
  const wallBottomY = -wallHeight / 2;

  // Geometry offset: rows are centered on row-center but positioned at block-center
  const geometryOffset = -cementThickness / 2;

  const originalBottomY = openingCenterY - openingHeight / 2;
  const originalTopY = openingCenterY + openingHeight / 2;

  // Actual block bottoms are at: wallBottomY + i * rowHeight + geometryOffset
  const bottomRowIndex = Math.floor((originalBottomY - wallBottomY - geometryOffset) / rowHeight);
  const snappedBottomY = wallBottomY + bottomRowIndex * rowHeight + geometryOffset;

  // Actual block tops are at: wallBottomY + i * rowHeight + blockHeight + geometryOffset
  const topRowIndex = Math.ceil((originalTopY - wallBottomY - blockHeight - geometryOffset) / rowHeight);
  let snappedTopY = wallBottomY + topRowIndex * rowHeight + blockHeight + geometryOffset;

  // Ensure minimum height of one block
  if (snappedTopY <= snappedBottomY) {
    snappedTopY = snappedBottomY + blockHeight;
  }

  return {
    originalBottomY,
    originalTopY,
    snappedBottomY,
    snappedTopY,
    originalHeight: openingHeight,
    snappedHeight: snappedTopY - snappedBottomY
  };
}

/**
 * OpeningGenerator - Generates and processes wall openings
 * 
 * Handles:
 * - Opening mesh creation
 * - Intersection checking with wall bounds
 * - Visualization mesh creation
 * - Lintel generation and positioning
 * - Batch processing of all openings
 */
export class OpeningGenerator {
  private material: THREE.MeshBasicMaterial;
  private lintelGenerator: LintelGenerator;

  constructor() {
    this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.lintelGenerator = new LintelGenerator();
  }

  /**
   * Creates an original (non-snapped) mesh for visualization purposes
   * @param params Parameters for the opening
   * @returns A THREE.Mesh representing the original opening dimensions
   */
  createOriginalMesh(params: OpeningParams): THREE.Mesh {
    const { size, placement } = params;

    const geometry = new THREE.BoxGeometry(size.l, size.h, size.w);

    // Ensure uv2 exists for consistency
    if (!geometry.attributes.uv2) {
      geometry.setAttribute('uv2', geometry.attributes.uv.clone());
    }

    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(
      placement.position.x,
      placement.position.y,
      placement.position.z
    );

    return mesh;
  }

  /**
   * Creates a snapped visualization mesh (exact snapped dimensions, no oversizing)
   * Used for blue visualization to show the row-aligned opening bounds
   * Also used for infill CSG when extended to wall top
   * @param params Parameters for the opening (for width/depth)
   * @param snappedBounds The snapped Y bounds
   * @param extendToWallTop Optional: extend mesh to wall top (+ small buffer) for infill CSG
   * @returns A THREE.Mesh representing the snapped opening dimensions
   */
  createSnappedVisualizationMesh(
    params: OpeningParams,
    snappedBounds: SnappedBounds,
    extendToWallTop?: { wallHeight: number }
  ): THREE.Mesh {
    const { size, placement } = params;

    // Calculate effective height and center Y
    let effectiveHeight = snappedBounds.snappedHeight;
    let effectiveCenterY = snappedBounds.snappedBottomY + effectiveHeight / 2;

    // If extension requested, extend slightly above wall top for clean CSG cuts
    if (extendToWallTop) {
      const wallTopY = extendToWallTop.wallHeight / 2;
      const buffer = 0.01;  // Small buffer for clean CSG
      effectiveHeight = (wallTopY + buffer) - snappedBounds.snappedBottomY;
      effectiveCenterY = snappedBounds.snappedBottomY + effectiveHeight / 2;
    }

    const geometry = new THREE.BoxGeometry(size.l, effectiveHeight, size.w);

    // Ensure uv2 exists for consistency
    if (!geometry.attributes.uv2) {
      geometry.setAttribute('uv2', geometry.attributes.uv.clone());
    }

    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(
      placement.position.x,
      effectiveCenterY,
      placement.position.z
    );

    return mesh;
  }

  /**
   * Creates a mesh representing an opening with row-snapped bounds
   * @param params Parameters for the opening
   * @param ctx Context with wall/block dimensions for snapping
   * @param oversizeFactor Optional factor to oversize the opening for cleaner CSG cuts (default: 1.05)
   * @returns Object with snapped mesh and snapping information
   */
  createOpeningMesh(
    params: OpeningParams,
    ctx: OpeningProcessContext,
    oversizeFactor: number = 1.05
  ): { mesh: THREE.Mesh; snappedBounds: SnappedBounds } {
    const { size, placement } = params;

    // Snap opening bounds to row boundaries
    const snappedBounds = snapToRowBoundaries(
      placement.position.y,
      size.h,
      ctx.wallHeight,
      ctx.blockHeight,
      ctx.cementThickness
    );

    // Calculate effective height and center Y from snapped bounds
    let effectiveHeight = snappedBounds.snappedHeight;
    let effectiveCenterY = snappedBounds.snappedBottomY + effectiveHeight / 2;

    // Also check if snapped opening should extend to wall top (infill region)
    const infillBaseY = calculateInfillBaseY(
      ctx.wallHeight,
      ctx.blockHeight,
      ctx.cementThickness
    );

    if (infillBaseY !== null) {
      const snappedTopY = snappedBounds.snappedTopY;
      const wallTopY = ctx.wallHeight / 2;

      // If lintel top would overlap infill region, extend opening to wall top
      const lintelHeight = ctx.blockHeight / 2;
      if (snappedTopY + lintelHeight > infillBaseY) {
        effectiveHeight = wallTopY - snappedBounds.snappedBottomY;
        effectiveCenterY = snappedBounds.snappedBottomY + effectiveHeight / 2;
        console.log(`[OpeningGenerator] Opening extended to wall top after snapping: snapped h=${snappedBounds.snappedHeight.toFixed(3)}, extended h=${effectiveHeight.toFixed(3)}`);
      }
    }

    console.log(`[OpeningGenerator] Row snapping details:`);
    console.log(`  Original: centerY=${placement.position.y.toFixed(3)}, height=${size.h.toFixed(3)}`);
    console.log(`  Original bounds: [${snappedBounds.originalBottomY.toFixed(3)} to ${snappedBounds.originalTopY.toFixed(3)}]`);
    console.log(`  Snapped bounds:  [${snappedBounds.snappedBottomY.toFixed(3)} to ${snappedBounds.snappedTopY.toFixed(3)}]`);
    console.log(`  Snapped height: ${snappedBounds.snappedHeight.toFixed(3)}, Effective height: ${effectiveHeight.toFixed(3)}`);

    // Oversize the opening significantly to ensure clean CSG cuts
    const oversizedL = size.l * oversizeFactor;
    const oversizedH = effectiveHeight * oversizeFactor;
    const oversizedW = size.w * (oversizeFactor + 0.05); // Extra 5% for depth penetration

    const geometry = new THREE.BoxGeometry(oversizedL, oversizedH, oversizedW);

    // Ensure uv2 exists for CSG compatibility
    if (!geometry.attributes.uv2) {
      geometry.setAttribute('uv2', geometry.attributes.uv.clone());
    }

    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(
      placement.position.x,
      effectiveCenterY,
      placement.position.z
    );

    return { mesh, snappedBounds };
  }

  /**
   * Checks if an opening intersects with the wall bounds
   */
  checkIntersection(opening: OpeningParams, wallBounds: WallBounds): boolean {
    const openingHalfWidth = opening.size.l / 2;
    const openingHalfHeight = opening.size.h / 2;
    const openingHalfDepth = opening.size.w / 2;

    const openingX = opening.placement.position.x;
    const openingY = opening.placement.position.y;
    const openingZ = opening.placement.position.z;

    return (
      Math.abs(openingX) < (wallBounds.halfWidth + openingHalfWidth) &&
      Math.abs(openingY) < (wallBounds.halfHeight + openingHalfHeight) &&
      Math.abs(openingZ) < (wallBounds.halfLength + openingHalfDepth)
    );
  }



  /**
   * Calculates the effective top Y for an opening (accounting for infill extension)
   *
   * Note: When a row is skipped inside an opening, both the brick AND the cement
   * above it are removed (they're part of the same row mesh). snappedTopY represents
   * the top of the brick, so we add cementThickness to get the visual opening top.
   */
  private getEffectiveTopY(snappedBounds: SnappedBounds, ctx: OpeningProcessContext): number {
    const infillBaseY = calculateInfillBaseY(ctx.wallHeight, ctx.blockHeight, ctx.cementThickness);

    if (infillBaseY !== null && snappedBounds.snappedTopY > infillBaseY) {
      return ctx.wallHeight / 2;  // Extended to wall top (no cement gap here)
    }

    // Add cementThickness because the visual opening includes the cement layer
    // that was part of the last skipped row
    return snappedBounds.snappedTopY + ctx.cementThickness;
  }

  /**
   * Positions a lintel mesh above its corresponding opening
   * Uses effectiveTopY (from snapped bounds) for accurate positioning
   */
  private positionLintel(lintelMesh: THREE.Mesh, openingMesh: THREE.Mesh, effectiveTopY: number): void {
    lintelMesh.position.x = openingMesh.position.x;
    lintelMesh.position.z = openingMesh.position.z;

    const lintelHeight = (lintelMesh.geometry as THREE.BoxGeometry).parameters.height;
    lintelMesh.position.y = effectiveTopY + lintelHeight / 2;
  }

  /**
   * Checks if an opening extends to the wall top (no lintel needed)
   */
  private isOpeningExtendedToTop(openingMesh: THREE.Mesh, wallHeight: number): boolean {
    const openingHeight = (openingMesh.geometry as THREE.BoxGeometry).parameters.height;
    const openingTopY = openingMesh.position.y + openingHeight / 2;
    const wallTopY = wallHeight / 2;
    // Allow small tolerance for floating point comparison
    return openingTopY >= wallTopY - 0.001;
  }

  /**
   * Logs debug information for an opening
   */
  private logDebug(index: number, opening: OpeningParams, openingMesh: THREE.Mesh, lintelMesh: THREE.Mesh | null): void {
    console.log(`[OpeningGenerator] Opening ${index}:
      Pos: (${opening.placement.position.x}, ${opening.placement.position.y}, ${opening.placement.position.z})
      Size: ${opening.size.l}x${opening.size.h}x${opening.size.w}
      Mesh Pos: (${openingMesh.position.x}, ${openingMesh.position.y}, ${openingMesh.position.z})
      Lintel Pos: ${lintelMesh ? `(${lintelMesh.position.x}, ${lintelMesh.position.y}, ${lintelMesh.position.z})` : 'N/A'}
      Lintel Width: ${lintelMesh ? (lintelMesh.geometry as THREE.BoxGeometry).parameters.width : 'N/A'}
    `);
  }

  /**
   * Processes all openings and returns OpeningData array with meshes
   *
   * @param openings Array of opening parameters
   * @param wallBounds Wall bounds for intersection testing
   * @param ctx Context with wall/block dimensions
   * @param wallGroup Group to add meshes to
   * @returns Array of OpeningData with all generated meshes
   */
  processAllOpenings(
    openings: OpeningParams[],
    wallBounds: WallBounds,
    ctx: OpeningProcessContext,
    wallGroup: THREE.Group
  ): { openingDataList: OpeningData[]; lintelMeshes: THREE.Mesh[] } {
    const openingDataList: OpeningData[] = [];
    const lintelMeshes: THREE.Mesh[] = [];

    openings.forEach((opening, index) => {
      // Create original mesh for visualization (non-snapped, exact params) - RED
      const originalMesh = this.createOriginalMesh(opening);

      // Create snapped opening mesh (with row-snapping and potential infill extension) - for CSG
      const { mesh: openingMesh, snappedBounds } = this.createOpeningMesh(opening, ctx, 1.05);

      // Check if opening should extend to wall top (for infill CSG)
      const infillBaseY = calculateInfillBaseY(ctx.wallHeight, ctx.blockHeight, ctx.cementThickness);
      const lintelHeight = ctx.blockHeight / 2;
      const shouldExtendToWallTop = infillBaseY !== null &&
        (snappedBounds.snappedTopY + lintelHeight > infillBaseY);

      // Create snapped visualization mesh (exact snapped dims, no oversizing) - BLUE
      // Extended to wall top when lintel would overlap infill (used for infill CSG)
      const snappedVisMesh = this.createSnappedVisualizationMesh(
        opening,
        snappedBounds,
        shouldExtendToWallTop ? { wallHeight: ctx.wallHeight } : undefined
      );

      // Check intersection
      const intersects = this.checkIntersection(opening, wallBounds);
      if (!intersects) {
        console.warn('Opening is outside wall bounds, skipping CSG operation:', opening.placement.position);
      }

      // Generate lintel (skip if opening extends to wall top - no structure above)
      let lintelMesh: THREE.Mesh | null = null;
      if (!this.isOpeningExtendedToTop(openingMesh, ctx.wallHeight)) {
        lintelMesh = this.lintelGenerator.createLintel(
          opening,
          ctx.wallHeight,
          ctx.wallLength,
          ctx.blockHeight,
          ctx.blockWidth,
          ctx.actualWallHeight,
          ctx.cementThickness
        );

        if (lintelMesh) {
          const effectiveTopY = this.getEffectiveTopY(snappedBounds, ctx);
          this.positionLintel(lintelMesh, openingMesh, effectiveTopY);
          lintelMeshes.push(lintelMesh);
          wallGroup.add(lintelMesh);
        }
      } else {
        console.log(`[OpeningGenerator] Skipping lintel for opening ${index + 1} (extends to wall top)`);
      }

      openingDataList.push({
        opening,
        mesh: openingMesh,
        originalMesh,
        snappedVisMesh,
        lintelMesh,
        intersectsWall: intersects,
        snappedBounds
      });

      this.logDebug(index + 1, opening, openingMesh, lintelMesh);
    });

    return { openingDataList, lintelMeshes };
  }

  /**
   * Creates bottom cap (sill) for an opening following the block pattern below.
   * Shows multiple brick + cement faces matching the row structure:
   * - Brick top faces for each block
   * - Cement joint faces between blocks (horizontal strips)
   * - Cement rim at front/back edges (vertical mortar between rows)
   *
   * @param opening The opening parameters
   * @param snappedBounds The snapped Y bounds of the opening
   * @param wallHeight Total wall height
   * @param wallLength Wall depth (Z-axis)
   * @param cementThickness Thickness of cement layer
   * @param blockWidth Width of each block
   * @param blockHeight Height of each block
   * @param actualWallWidth The actual wall width (for pattern alignment)
   * @returns Bottom cap mesh (null if not needed)
   */
  createOpeningBottomCap(
    opening: OpeningParams,
    snappedBounds: SnappedBounds,
    wallHeight: number,
    wallLength: number,
    cementThickness: number,
    blockWidth: number,
    blockHeight: number,
    actualWallWidth: number
  ): THREE.Mesh | null {
    const openingWidth = opening.size.l;
    const openingCenterX = opening.placement.position.x;
    const halfDepth = wallLength / 2;

    const wallBottom = -wallHeight / 2;

    // Bottom cap (sill) - only if opening doesn't extend to wall bottom
    if (snappedBounds.snappedBottomY <= wallBottom + 0.001) {
      return null;
    }

    const brickMaterial = MaterialManager.getInstance().getBrickMaterial();
    const cementMaterial = MaterialManager.getInstance().getCementMaterial();

    const xLeft = openingCenterX - openingWidth / 2;
    const xRight = openingCenterX + openingWidth / 2;
    const zFront = halfDepth;
    const zBack = -halfDepth;

    // Y coordinate - sill surface is flush with opening bottom
    // This creates a flat surface at the opening bottom showing the block pattern
    const ySillSurface = snappedBounds.snappedBottomY;

    // Separate arrays for brick and cement geometry (to avoid interleaving issues)
    const brickPositions: number[] = [];
    const brickUvs: number[] = [];
    const brickIndices: number[] = [];
    let brickVertexIndex = 0;

    const cementPositions: number[] = [];
    const cementUvs: number[] = [];
    const cementIndices: number[] = [];
    let cementVertexIndex = 0;

    // Calculate row index for the row BELOW the opening (whose pattern we're showing)
    // Must account for geometry offset used in snapping
    const rowHeight = blockHeight + cementThickness;
    const geometryOffset = -cementThickness / 2;
    const openingRowIndex = Math.round((snappedBounds.snappedBottomY - wallBottom - geometryOffset) / rowHeight);
    const sillRowIndex = openingRowIndex - 1; // Row below the opening

    // Match RowGenerator's stagger logic: odd rows have offset
    const rowOffset = (sillRowIndex % 2 === 1) ? (blockWidth / 2) : 0;

    // Unit width (block + cement joint)
    const unitWidth = blockWidth + cementThickness;

    // Pattern starts from wall left edge with row offset
    const patternStart = -actualWallWidth / 2 - rowOffset;

    // Helper to add a horizontal brick quad (facing up +Y)
    const addBrickHorizontalQuad = (x1: number, x2: number, y: number) => {
      const startIdx = brickVertexIndex;
      brickPositions.push(
        x1, y, zFront,
        x2, y, zFront,
        x2, y, zBack,
        x1, y, zBack
      );
      // Normalized UVs (0-1) for proper texture tiling
      brickUvs.push(0, 0, 1, 0, 1, 1, 0, 1);
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

    // Generate block pattern within opening width - all at sill surface level
    let patternX = patternStart;
    while (patternX < xRight) {
      const brickLeft = patternX;
      const brickRight = patternX + blockWidth;
      const cementRight = patternX + unitWidth;

      // Clamp to opening bounds
      const clampedBrickLeft = Math.max(brickLeft, xLeft);
      const clampedBrickRight = Math.min(brickRight, xRight);
      const clampedCementRight = Math.min(cementRight, xRight);

      // Add brick top face if visible within opening
      if (clampedBrickRight > clampedBrickLeft) {
        addBrickHorizontalQuad(clampedBrickLeft, clampedBrickRight, ySillSurface);
      }

      // Add cement joint face (horizontal strip between blocks) if visible
      if (clampedCementRight > clampedBrickRight && clampedBrickRight >= xLeft) {
        addCementHorizontalQuad(clampedBrickRight, clampedCementRight, ySillSurface);
      }

      patternX += unitWidth;
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
    const bottomCap = new THREE.Mesh(geom, [brickMaterial, cementMaterial]);
    bottomCap.name = 'OpeningBottomCap';
    bottomCap.castShadow = true;
    bottomCap.receiveShadow = true;

    console.log(`[OpeningGenerator] Created bottom cap (sill) at Y=${ySillSurface.toFixed(3)}, row ${sillRowIndex} pattern (offset=${rowOffset.toFixed(3)}), ${brickIndices.length / 6} brick faces, ${cementIndices.length / 6} cement faces`);

    return bottomCap;
  }

  /**
   * Disposes of resources
   */
  dispose(): void {
    this.material.dispose();
  }
}

