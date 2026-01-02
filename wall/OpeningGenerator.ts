import * as THREE from 'three';
import type { OpeningParams } from '../types';
import { LintelGenerator } from './LintelGenerator';

/**
 * Data structure for tracking opening-related meshes
 */
export interface OpeningData {
  opening: OpeningParams;
  mesh: THREE.Mesh;
  lintelMesh: THREE.Mesh | null;
  intersectsWall: boolean;
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
   * Creates a mesh representing an opening
   * @param params Parameters for the opening
   * @param oversizeFactor Optional factor to oversize the opening for cleaner CSG cuts (default: 1.05)
   * @param extendToTop Optional: if provided, extends opening to wall top when above infill
   * @returns A THREE.Mesh representing the opening
   */
  createOpeningMesh(
    params: OpeningParams,
    oversizeFactor: number = 1.05,
    extendToTop?: { wallHeight: number; infillBaseY: number | null }
  ): THREE.Mesh {
    const { size, placement } = params;

    let effectiveHeight = size.h;
    let effectiveCenterY = placement.position.y;

    // Check if opening should extend to wall top
    // If opening TOP is above infill base, it cuts into infill region → extend to wall top
    if (extendToTop && extendToTop.infillBaseY !== null) {
      const openingTopY = placement.position.y + size.h / 2;
      const openingBottomY = placement.position.y - size.h / 2;
      const wallTopY = extendToTop.wallHeight / 2;

      // If opening cuts into infill region (its top is above infill base), extend to wall top
      if (openingTopY > extendToTop.infillBaseY) {
        effectiveHeight = wallTopY - openingBottomY;
        effectiveCenterY = openingBottomY + effectiveHeight / 2;
        console.log(`[OpeningGenerator] Opening extended to wall top: original h=${size.h.toFixed(3)}, new h=${effectiveHeight.toFixed(3)}, infillBaseY=${extendToTop.infillBaseY.toFixed(3)}, openingTopY=${openingTopY.toFixed(3)}`);
      }
    }

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

    return mesh;
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
   * @param visualization Visualization mode for openings
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

    // Calculate infill base Y for extending openings to wall top
    const infillBaseY = calculateInfillBaseY(
      ctx.wallHeight,
      ctx.blockHeight,
      ctx.cementThickness
    );

    openings.forEach((opening, index) => {
      // Create opening mesh (with potential extension to wall top)
      const openingMesh = this.createOpeningMesh(opening, 1.05, {
        wallHeight: ctx.wallHeight,
        infillBaseY
      });

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
        lintelMesh,
        intersectsWall: intersects
      });

      this.logDebug(index + 1, opening, openingMesh, lintelMesh);
    });

    return { openingDataList, lintelMeshes };
  }

  /**
   * Disposes of resources
   */
  dispose(): void {
    this.material.dispose();
  }
}

