/**
 * WallBuilder - Builder pattern implementation for parametric masonry walls
 *
 * Provides a fluent interface for constructing walls step-by-step.
 * Delegates specialized logic to dedicated generators:
 * - OpeningGenerator: openings, lintels, visualization
 * - InfillGenerator: top infill
 * - WallCsgProcessor: CSG operations
 */

import * as THREE from 'three';
import type { BuildMasonryWallParams } from '../../types';
import { WallManager } from '../WallManager';
import { OpeningGenerator, type OpeningData } from '../OpeningGenerator';
import { InfillGenerator } from '../InfillGenerator';
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
  private openingGenerator: OpeningGenerator;

  constructor(params: BuildMasonryWallParams) {
    this.params = params;
    this.ctx = this.createEmptyContext();
    this.openingGenerator = new OpeningGenerator();
  }

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

    // Extract dimensions
    this.ctx.wallWidth = wall.size.w;
    this.ctx.wallHeight = wall.size.h;
    this.ctx.wallLength = wall.size.l;
    this.ctx.blockWidth = wall.blockSize.l;
    this.ctx.blockHeight = wall.blockSize.h;
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
      this.params.task.completion
    );

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
   * Step 4: Create openings and lintels (delegated to OpeningGenerator)
   */
  createOpenings(): this {
    const { openings } = this.params;

    if (!openings || openings.length === 0 || !this.ctx.wallGroup) {
      return this;
    }

    const wallBounds = {
      halfWidth: this.ctx.wallWidth / 2,
      halfHeight: this.ctx.wallHeight / 2,
      halfLength: this.ctx.wallLength / 2
    };

    const processContext = {
      wallHeight: this.ctx.wallHeight,
      wallLength: this.ctx.wallLength,
      blockHeight: this.ctx.blockHeight,
      blockWidth: this.ctx.blockWidth,
      actualWallHeight: this.ctx.actualWallHeight,
      cementThickness: this.ctx.cementThickness
    };

    const { openingDataList, lintelMeshes } = this.openingGenerator.processAllOpenings(
      openings,
      wallBounds,
      processContext,
      this.ctx.wallGroup,
      this.params.visualization
    );

    this.ctx.openingDataList = openingDataList;
    this.ctx.lintelMeshes = lintelMeshes;

    return this;
  }

  /**
   * Step 5: Apply all CSG operations
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

    // Calculate actual width if needed
    if (!this.ctx.actualWallWidth) {
      const blocksHorizontal = Math.floor(this.ctx.wallWidth / (this.ctx.blockWidth + this.ctx.cementThickness));
      this.ctx.actualWallWidth = blocksHorizontal > 0
        ? blocksHorizontal * this.ctx.blockWidth + (blocksHorizontal - 1) * this.ctx.cementThickness
        : 0;
    }

    // Apply CSG to infill and lintels if there are openings
    if (this.ctx.openingDataList.length > 0) {
      if (this.ctx.infillMesh) {
        processInfillCsg(this.ctx.infillMesh, this.ctx.openingDataList, null as any, 0, this.ctx.evaluator);
      }
      if (this.ctx.lintelMeshes.length > 0) {
        processLintelsCsg(this.ctx.lintelMeshes, this.ctx.openingDataList, this.ctx.evaluator);
      }
    }

    // Process all rows
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

    // Final intersection with actual wall bounds
    this.intersectWithActualWallBounds();

    return this;
  }

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

    if (!actualWallGeometry.attributes.uv2 && actualWallGeometry.attributes.uv) {
      actualWallGeometry.setAttribute('uv2', actualWallGeometry.attributes.uv.clone());
    }

    if (this.ctx.infillMesh && this.ctx.infillMesh.geometry.attributes.position.count > 0) {
      intersectWithActualWall([this.ctx.infillMesh], actualWallGeometry, actualWallY, this.ctx.evaluator!, 'Infill');
    }

    if (this.ctx.lintelMeshes.length > 0) {
      intersectWithActualWall(this.ctx.lintelMeshes, actualWallGeometry, actualWallY, this.ctx.evaluator!, 'Lintel');
    }

    actualWallGeometry.dispose();
  }

  /**
   * Step 6: Shift geometry to bottom-left pivot point
   */
  shiftToBottomLeftPivot(): this {
    if (!this.ctx.wallGroup) return this;

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
    if (!this.ctx.wallGroup) return this;

    const halfWidth = this.ctx.wallWidth / 2;
    const halfHeight = this.ctx.wallHeight / 2;

    this.ctx.wallGroup.userData = {
      ...this.ctx.wallGroup.userData,
      objectType: 'MasonryWall',
      wall: this.params.wall,
      openings: this.params.openings,
      task: { completion: this.params.task.completion },
      pivotOffset: { x: halfWidth, y: halfHeight }
    };

    return this;
  }

  /**
   * Final step: Return the constructed wall group
   */
  build(): THREE.Group {
    if (!this.ctx.wallGroup) {
      const emptyGroup = new THREE.Group();
      emptyGroup.name = 'EmptyWall';
      return emptyGroup;
    }
    return this.ctx.wallGroup;
  }
}

