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
   * @returns A THREE.Mesh representing the opening
   */
  createOpeningMesh(params: OpeningParams, oversizeFactor: number = 1.05): THREE.Mesh {
    const { size, placement } = params;

    // Oversize the opening significantly to ensure clean CSG cuts
    const oversizedL = size.l * oversizeFactor;
    const oversizedH = size.h * oversizeFactor;
    const oversizedW = size.w * (oversizeFactor + 0.05); // Extra 5% for depth penetration

    const geometry = new THREE.BoxGeometry(oversizedL, oversizedH, oversizedW);

    // Ensure uv2 exists for CSG compatibility
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
   */
  private positionLintel(lintelMesh: THREE.Mesh, openingMesh: THREE.Mesh, opening: OpeningParams): void {
    lintelMesh.position.x = openingMesh.position.x;
    lintelMesh.position.z = openingMesh.position.z;

    const openingHeight = (openingMesh.geometry as THREE.BoxGeometry).parameters.height;
    const openingTopY = opening.placement.position.y + openingHeight / 2;
    const lintelHeight = (lintelMesh.geometry as THREE.BoxGeometry).parameters.height;
    lintelMesh.position.y = openingTopY + lintelHeight / 2;
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

    openings.forEach((opening, index) => {
      // Create opening mesh
      const openingMesh = this.createOpeningMesh(opening);

      // Check intersection
      const intersects = this.checkIntersection(opening, wallBounds);
      if (!intersects) {
        console.warn('Opening is outside wall bounds, skipping CSG operation:', opening.placement.position);
      }

      // Generate lintel
      const lintelMesh = this.lintelGenerator.createLintel(
        opening,
        ctx.wallHeight,
        ctx.wallLength,
        ctx.blockHeight,
        ctx.blockWidth,
        ctx.actualWallHeight,
        ctx.cementThickness
      );

      if (lintelMesh) {
        this.positionLintel(lintelMesh, openingMesh, opening);
        lintelMeshes.push(lintelMesh);
        wallGroup.add(lintelMesh);
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

