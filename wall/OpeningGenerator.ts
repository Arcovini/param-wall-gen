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
   * @param params Parameters for the opening (for width/depth)
   * @param snappedBounds The snapped Y bounds
   * @returns A THREE.Mesh representing the snapped opening dimensions
   */
  createSnappedVisualizationMesh(
    params: OpeningParams,
    snappedBounds: SnappedBounds
  ): THREE.Mesh {
    const { size, placement } = params;

    // Use exact snapped height, original width and depth
    const snappedHeight = snappedBounds.snappedHeight;
    const snappedCenterY = snappedBounds.snappedBottomY + snappedHeight / 2;

    const geometry = new THREE.BoxGeometry(size.l, snappedHeight, size.w);

    // Ensure uv2 exists for consistency
    if (!geometry.attributes.uv2) {
      geometry.setAttribute('uv2', geometry.attributes.uv.clone());
    }

    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(
      placement.position.x,
      snappedCenterY,
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

      // If snapped opening cuts into infill region, extend to wall top
      if (snappedTopY > infillBaseY) {
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
   * Positions a lintel mesh above its corresponding opening
   * Uses the mesh position (which may differ from original params if opening was extended)
   */
  private positionLintel(lintelMesh: THREE.Mesh, openingMesh: THREE.Mesh): void {
    lintelMesh.position.x = openingMesh.position.x;
    lintelMesh.position.z = openingMesh.position.z;

    const openingHeight = (openingMesh.geometry as THREE.BoxGeometry).parameters.height;
    const openingTopY = openingMesh.position.y + openingHeight / 2;
    const lintelHeight = (lintelMesh.geometry as THREE.BoxGeometry).parameters.height;
    lintelMesh.position.y = openingTopY + lintelHeight / 2;
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

      // Create snapped visualization mesh (exact snapped dims, no oversizing) - BLUE
      const snappedVisMesh = this.createSnappedVisualizationMesh(opening, snappedBounds);

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
          this.positionLintel(lintelMesh, openingMesh);
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
   * Creates bottom cap (sill) for an opening.
   * The top cap is not needed since lintels already cover that area.
   *
   * Bottom cap faces upward (+Y), representing the sill of the opening.
   * Only created if the opening doesn't extend to wall bottom.
   *
   * @param opening The opening parameters
   * @param snappedBounds The snapped Y bounds of the opening
   * @param wallHeight Total wall height
   * @param wallLength Wall depth (Z-axis)
   * @returns Bottom cap mesh (null if not needed)
   */
  createOpeningBottomCap(
    opening: OpeningParams,
    snappedBounds: SnappedBounds,
    wallHeight: number,
    wallLength: number
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

    const xLeft = openingCenterX - openingWidth / 2;
    const xRight = openingCenterX + openingWidth / 2;

    const geom = new THREE.BufferGeometry();
    const y = snappedBounds.snappedBottomY;

    // Vertices for a quad facing up (+Y)
    // Order: front-left, front-right, back-right, back-left
    const vertices = new Float32Array([
      xLeft,  y,  halfDepth,  // 0: front-left
      xRight, y,  halfDepth,  // 1: front-right
      xRight, y, -halfDepth,  // 2: back-right
      xLeft,  y, -halfDepth,  // 3: back-left
    ]);

    // Indices for two triangles - CCW winding when viewed from +Y (above)
    // For normal to point +Y, vertices must be CCW when viewed from above
    const indices = new Uint16Array([
      0, 1, 2,  // First triangle (front-left, front-right, back-right)
      0, 2, 3,  // Second triangle (front-left, back-right, back-left)
    ]);

    // UVs
    const uvs = new Float32Array([
      0, 0,  // 0: front-left
      1, 0,  // 1: front-right
      1, 1,  // 2: back-right
      0, 1,  // 3: back-left
    ]);

    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geom.setIndex(new THREE.BufferAttribute(indices, 1));
    geom.computeVertexNormals();

    const bottomCap = new THREE.Mesh(geom, brickMaterial);
    bottomCap.name = 'OpeningBottomCap';
    bottomCap.castShadow = true;
    bottomCap.receiveShadow = true;

    console.log(`[OpeningGenerator] Created bottom cap (sill) at Y=${y.toFixed(3)}`);

    return bottomCap;
  }

  /**
   * Disposes of resources
   */
  dispose(): void {
    this.material.dispose();
  }
}

