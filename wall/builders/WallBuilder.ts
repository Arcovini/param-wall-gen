/**
 * WallBuilder - Builder pattern implementation for parametric masonry walls
 *
 * Provides a fluent interface for constructing walls step-by-step:
 * - Parse parameters
 * - Generate base wall with rows
 * - Add infill (encunhamento)
 * - Create openings and lintels
 * - Apply CSG operations
 * - Finalize with pivot adjustment and metadata
 */

import * as THREE from 'three';
import type { BuildMasonryWallParams, OpeningParams } from '../../types';
import { WallManager } from '../WallManager';
import { OpeningGenerator } from '../OpeningGenerator';
import { InfillGenerator } from '../InfillGenerator';
import { LintelGenerator } from '../LintelGenerator';
import { Evaluator } from 'three-bvh-csg';
import {
  processInfillCsg,
  processLintelsCsg,
  processAllRowsCsg,
  intersectWithActualWall
} from '../../utils/WallCsgProcessor';

// Singleton WallManager instance (reuses textures/materials)
const wallManagerInstance = new WallManager();

/**
 * Internal data structure for tracking opening-related meshes
 */
interface OpeningData {
  opening: OpeningParams;
  mesh: THREE.Mesh;
  lintelMesh: THREE.Mesh | null;
  intersectsWall: boolean;
}

/**
 * Internal build context - tracks state during wall construction
 */
interface WallBuildContext {
  // Extracted dimensions
  wallWidth: number;
  wallHeight: number;
  wallLength: number;
  blockWidth: number;
  blockHeight: number;
  cementThickness: number;

  // Placement
  positionX: number;
  positionY: number;
  positionZ: number;
  yawDegrees: number;

  // Calculated values
  totalRows: number;
  visibleRows: number;
  actualWallHeight: number;
  actualWallWidth: number;

  // Build state
  wallGroup: THREE.Group | null;
  evaluator: Evaluator | null;
  openingDataList: OpeningData[];
  infillMesh: THREE.Mesh | null;
  lintelMeshes: THREE.Mesh[];
  rowMeshes: THREE.Mesh[];
}

/**
 * WallBuilder class - Fluent builder for masonry walls
 */
export class WallBuilder {
  private params: BuildMasonryWallParams;
  private ctx: WallBuildContext;

  constructor(params: BuildMasonryWallParams) {
    this.params = params;
    this.ctx = this.createEmptyContext();
  }

  /**
   * Creates an empty build context with default values
   */
  private createEmptyContext(): WallBuildContext {
    return {
      wallWidth: 0,
      wallHeight: 0,
      wallLength: 0,
      blockWidth: 0,
      blockHeight: 0,
      cementThickness: 0,
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      yawDegrees: 0,
      totalRows: 0,
      visibleRows: 0,
      actualWallHeight: 0,
      actualWallWidth: 0,
      wallGroup: null,
      evaluator: null,
      openingDataList: [],
      infillMesh: null,
      lintelMeshes: [],
      rowMeshes: []
    };
  }

  /**
   * Step 1: Parse and extract all parameters from the input
   */
  parseParameters(): this {
    const { wall, task } = this.params;

    // Extract wall dimensions
    this.ctx.wallWidth = wall.size.w;
    this.ctx.wallHeight = wall.size.h;
    this.ctx.wallLength = wall.size.l;

    // Extract block dimensions
    this.ctx.blockWidth = wall.blockSize.l;
    this.ctx.blockHeight = wall.blockSize.h;

    // Extract cement thickness
    this.ctx.cementThickness = wall.cementThickness;

    // Extract placement
    this.ctx.positionX = wall.placement.position.x;
    this.ctx.positionY = wall.placement.position.y;
    this.ctx.positionZ = wall.placement.position.z;
    this.ctx.yawDegrees = wall.placement.direction.yaw * (180 / Math.PI);

    // Calculate row counts and actual height
    this.ctx.totalRows = Math.floor(
      this.ctx.wallHeight / (this.ctx.blockHeight + this.ctx.cementThickness)
    );
    this.ctx.visibleRows = Math.floor(
      this.ctx.totalRows * Math.max(0, Math.min(1, task.completion))
    );
    this.ctx.actualWallHeight = this.ctx.visibleRows > 0
      ? this.ctx.visibleRows * this.ctx.blockHeight + (this.ctx.visibleRows - 1) * this.ctx.cementThickness
      : 0;

    return this;
  }

  /**
   * Step 2: Generate the base wall structure with rows
   */
  generateBaseWall(): this {
    const { task } = this.params;

    this.ctx.wallGroup = wallManagerInstance.generateWallGroup(
      this.ctx.wallWidth,
      this.ctx.wallHeight,
      this.ctx.wallLength,
      this.ctx.blockWidth,
      this.ctx.blockHeight,
      this.ctx.cementThickness,
      this.ctx.positionX,
      this.ctx.positionY,
      this.ctx.positionZ,
      this.ctx.yawDegrees,
      task.completion
    );

    // Store calculated actual width
    this.ctx.actualWallWidth = this.ctx.wallGroup.userData.actualWallWidth || this.ctx.wallWidth;

    return this;
  }

  /**
   * Step 3: Add top infill (encunhamento) if wall is 100% complete
   */
  addInfill(): this {
    if (this.params.task.completion < 1.0 || !this.ctx.wallGroup) {
      return this;
    }

    const infillGenerator = new InfillGenerator();
    const infillMesh = infillGenerator.createTopInfill(
      this.ctx.actualWallWidth,
      this.ctx.wallHeight,
      this.ctx.wallLength,
      this.ctx.blockHeight,
      this.ctx.cementThickness
    );

    if (infillMesh) {
      this.ctx.infillMesh = infillMesh;
      this.ctx.wallGroup.add(infillMesh);
    }

    return this;
  }

  /**
   * Step 4: Create openings and lintels
   */
  createOpenings(): this {
    const { openings } = this.params;

    if (!openings || openings.length === 0 || !this.ctx.wallGroup) {
      return this;
    }

    const openingGenerator = new OpeningGenerator();
    const lintelGenerator = new LintelGenerator();

    // Calculate wall bounds for intersection testing
    const wallHalfWidth = this.ctx.wallWidth / 2;
    const wallHalfHeight = this.ctx.wallHeight / 2;
    const wallHalfLength = this.ctx.wallLength / 2;

    openings.forEach(opening => {
      const openingMesh = openingGenerator.createOpeningMesh(opening);

      // Check if opening intersects with wall bounds
      const openingHalfWidth = opening.size.l / 2;
      const openingHalfHeight = opening.size.h / 2;
      const openingHalfDepth = opening.size.w / 2;

      const openingX = opening.placement.position.x;
      const openingY = opening.placement.position.y;
      const openingZ = opening.placement.position.z;

      const intersects =
        Math.abs(openingX) < (wallHalfWidth + openingHalfWidth) &&
        Math.abs(openingY) < (wallHalfHeight + openingHalfHeight) &&
        Math.abs(openingZ) < (wallHalfLength + openingHalfDepth);

      if (!intersects) {
        console.warn('Opening is outside wall bounds, skipping CSG operation:', opening.placement.position);
      }

      // Add visualization (if enabled)
      this.addOpeningVisualization(openingMesh);

      // Generate lintel for this opening
      const lintelMesh = lintelGenerator.createLintel(
        opening,
        this.ctx.wallHeight,
        this.ctx.wallLength,
        this.ctx.blockHeight,
        this.ctx.blockWidth,
        this.ctx.actualWallHeight,
        this.ctx.cementThickness
      );

      if (lintelMesh) {
        this.positionLintel(lintelMesh, openingMesh, opening);
        this.ctx.lintelMeshes.push(lintelMesh);
        this.ctx.wallGroup!.add(lintelMesh);
      }

      this.ctx.openingDataList.push({
        opening,
        mesh: openingMesh,
        lintelMesh,
        intersectsWall: intersects
      });

      this.logOpeningDebug(opening, openingMesh, lintelMesh);
    });

    return this;
  }

  /**
   * Adds visualization mesh for an opening (if visualization mode is enabled)
   */
  private addOpeningVisualization(openingMesh: THREE.Mesh): void {
    if (!this.params.visualization || this.params.visualization === 'none' || !this.ctx.wallGroup) {
      return;
    }

    const visMesh = openingMesh.clone();
    if (this.params.visualization === 'wireframe') {
      visMesh.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    } else {
      visMesh.material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5 });
    }
    this.ctx.wallGroup.add(visMesh);
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
  private logOpeningDebug(opening: OpeningParams, openingMesh: THREE.Mesh, lintelMesh: THREE.Mesh | null): void {
    console.log(`[Debug] Opening ${this.ctx.openingDataList.length}:
      Pos: (${opening.placement.position.x}, ${opening.placement.position.y}, ${opening.placement.position.z})
      Size: ${opening.size.l}x${opening.size.h}x${opening.size.w}
      Mesh Pos: (${openingMesh.position.x}, ${openingMesh.position.y}, ${openingMesh.position.z})
      Lintel Pos: ${lintelMesh ? `(${lintelMesh.position.x}, ${lintelMesh.position.y}, ${lintelMesh.position.z})` : 'N/A'}
      Lintel Width: ${lintelMesh ? (lintelMesh.geometry as THREE.BoxGeometry).parameters.width : 'N/A'}
    `);
  }

  /**
   * Step 5: Apply all CSG operations (subtract openings, intersect with wall bounds)
   */
  applyCsgOperations(): this {
    if (!this.ctx.wallGroup) {
      return this;
    }

    // Initialize evaluator
    this.ctx.evaluator = new Evaluator();
    this.ctx.evaluator.attributes = ['position', 'normal', 'uv', 'uv2'];
    this.ctx.evaluator.useGroups = true;

    // Collect row meshes
    this.ctx.rowMeshes = this.ctx.wallGroup.children.filter(
      child => child instanceof THREE.Mesh && child.name?.startsWith('RowMesh')
    ) as THREE.Mesh[];

    // Calculate actual wall width if not already set
    if (!this.ctx.actualWallWidth) {
      const blocksHorizontal = Math.floor(this.ctx.wallWidth / (this.ctx.blockWidth + this.ctx.cementThickness));
      this.ctx.actualWallWidth = blocksHorizontal > 0
        ? blocksHorizontal * this.ctx.blockWidth + (blocksHorizontal - 1) * this.ctx.cementThickness
        : 0;
    }

    if (this.ctx.openingDataList.length > 0) {
      // Apply CSG to infill
      if (this.ctx.infillMesh) {
        processInfillCsg(this.ctx.infillMesh, this.ctx.openingDataList, null as any, 0, this.ctx.evaluator);
      }

      // Apply CSG to lintels
      if (this.ctx.lintelMeshes.length > 0) {
        processLintelsCsg(this.ctx.lintelMeshes, this.ctx.openingDataList, this.ctx.evaluator);
      }
    }

    // Process all rows with CSG (openings, lintels, and horizontal cuts)
    processAllRowsCsg(
      this.ctx.rowMeshes,
      this.params.openings || [],
      this.ctx.openingDataList,
      this.ctx.wallHeight,
      this.ctx.blockHeight,
      this.ctx.cementThickness,
      this.ctx.actualWallWidth,
      this.ctx.actualWallHeight,
      this.ctx.wallLength,
      this.ctx.evaluator
    );

    // Intersect infill and lintels with actual wall bounds
    this.intersectWithActualWallBounds();

    return this;
  }

  /**
   * Intersects infill and lintels with actual wall geometry bounds
   */
  private intersectWithActualWallBounds(): void {
    if (this.ctx.actualWallWidth <= 0 || this.ctx.actualWallHeight <= 0 || !this.ctx.evaluator) {
      return;
    }

    const actualWallGeometry = new THREE.BoxGeometry(
      this.ctx.actualWallWidth,
      this.ctx.actualWallHeight,
      this.ctx.wallLength * 1.2
    );
    const actualWallY = -this.ctx.wallHeight / 2 + this.ctx.actualWallHeight / 2;

    // Ensure uv2 exists
    if (!actualWallGeometry.attributes.uv2 && actualWallGeometry.attributes.uv) {
      actualWallGeometry.setAttribute('uv2', actualWallGeometry.attributes.uv.clone());
    }

    console.log(`[WallBuilder] Intersecting with Actual Wall: ${this.ctx.actualWallWidth}x${this.ctx.actualWallHeight}`);

    // Intersect infill
    if (this.ctx.infillMesh && this.ctx.infillMesh.geometry.attributes.position.count > 0) {
      intersectWithActualWall([this.ctx.infillMesh], actualWallGeometry, actualWallY, this.ctx.evaluator, 'Infill');
    }

    // Intersect lintels
    if (this.ctx.lintelMeshes.length > 0) {
      intersectWithActualWall(this.ctx.lintelMeshes, actualWallGeometry, actualWallY, this.ctx.evaluator, 'Lintel');
    }

    // Clean up
    actualWallGeometry.dispose();
  }

  /**
   * Step 6: Shift geometry to bottom-left pivot point (IFC Wall Element convention)
   */
  shiftToBottomLeftPivot(): this {
    if (!this.ctx.wallGroup) {
      return this;
    }

    const halfWidth = this.ctx.wallWidth / 2;
    const halfHeight = this.ctx.wallHeight / 2;

    this.ctx.wallGroup.children.forEach(child => {
      if (child instanceof THREE.Mesh || child instanceof THREE.Group) {
        child.position.x += halfWidth;
        child.position.y += halfHeight;
      }
    });

    return this;
  }

  /**
   * Step 7: Add metadata to the wall group
   */
  addMetadata(): this {
    if (!this.ctx.wallGroup) {
      return this;
    }

    const halfWidth = this.ctx.wallWidth / 2;
    const halfHeight = this.ctx.wallHeight / 2;

    this.ctx.wallGroup.userData = {
      ...this.ctx.wallGroup.userData,
      objectType: 'MasonryWall',
      wall: this.params.wall,
      openings: this.params.openings,
      task: {
        completion: this.params.task.completion
      },
      pivotOffset: { x: halfWidth, y: halfHeight }
    };

    return this;
  }

  /**
   * Final step: Return the constructed wall group
   */
  build(): THREE.Group {
    if (!this.ctx.wallGroup) {
      // Return empty group if something went wrong
      const emptyGroup = new THREE.Group();
      emptyGroup.name = 'EmptyWall';
      return emptyGroup;
    }

    return this.ctx.wallGroup;
  }
}
