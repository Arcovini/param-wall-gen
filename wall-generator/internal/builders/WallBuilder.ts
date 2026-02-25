/**
 * WallBuilder - Builder pattern implementation for parametric masonry walls
 *
 * Provides a fluent interface for constructing walls step-by-step.
 * Delegates specialized logic to dedicated processors:
 * - OpeningGenerator: openings, lintels, visualization
 * - InfillGenerator: top infill
 * - OpeningCutter: all CSG operations for cutting openings
 */

import * as THREE from 'three';
import type { BuildMasonryWallParams, OpeningBoundsForRow } from '../../types';
import { WallManager } from '../WallManager';
import { OpeningGenerator, type OpeningData, snapToRowBoundaries } from '../OpeningGenerator';
import { InfillGenerator } from '../InfillGenerator';
import { RowGenerator } from '../RowGenerator';
import { cutOpenings } from '../processing/OpeningCutter';
import { MaterialManager } from '../MaterialManager';

// Singleton WallManager instance (reuses textures/materials)
const wallManagerInstance = new WallManager();

/**
 * Internal build context - tracks state during wall construction
 */
interface WallBuildContext {
  // Dimensions
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

  // Pre-computed opening bounds for pseudo-boolean row generation
  openingBoundsForRows: OpeningBoundsForRow[];

  // Build state
  wallGroup: THREE.Group | null;
  openingDataList: OpeningData[];
  infillMesh: THREE.Mesh | null;
  lintelMeshes: THREE.Mesh[];
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
      wallWidth: 0, wallHeight: 0, wallLength: 0,
      blockWidth: 0, blockHeight: 0, cementThickness: 0,
      positionX: 0, positionY: 0, positionZ: 0, yawDegrees: 0,
      totalRows: 0, visibleRows: 0, actualWallHeight: 0, actualWallWidth: 0,
      openingBoundsForRows: [],
      wallGroup: null, openingDataList: [], infillMesh: null, lintelMeshes: []
    };
  }

  /** Step 1: Parse parameters and apply material colors */
  parseParameters(): this {
    const { wall, task } = this.params;

    this.ctx.wallWidth = wall.size.w;
    this.ctx.wallHeight = wall.size.h;
    this.ctx.wallLength = wall.size.l;
    this.ctx.blockWidth = wall.blockSize.l;
    this.ctx.blockHeight = wall.blockSize.h;
    this.ctx.cementThickness = wall.cementThickness;

    this.ctx.positionX = wall.placement.position.x;
    this.ctx.positionY = wall.placement.position.y;
    this.ctx.positionZ = wall.placement.position.z;
    this.ctx.yawDegrees = wall.placement.direction.yaw * (180 / Math.PI);

    this.ctx.totalRows = Math.floor(this.ctx.wallHeight / (this.ctx.blockHeight + this.ctx.cementThickness));
    this.ctx.visibleRows = Math.floor(this.ctx.totalRows * Math.max(0, Math.min(1, task.completion)));
    this.ctx.actualWallHeight = this.ctx.visibleRows > 0
      ? this.ctx.visibleRows * this.ctx.blockHeight + (this.ctx.visibleRows - 1) * this.ctx.cementThickness
      : 0;

    // Apply material colors if provided
    const materials = wall.materials;
    if (materials) {
      const mm = MaterialManager.getInstance();
      // Masonry (bricks + cement)
      if (materials.masonry?.color !== undefined) mm.setBrickColor(materials.masonry.color);
      if (materials.masonry?.colorSigma !== undefined) mm.setBrickColorSigma(materials.masonry.colorSigma);
      if (materials.masonry?.darkBrickColor !== undefined) mm.setDarkBrickColor(materials.masonry.darkBrickColor);
      if (materials.masonry?.cementColor !== undefined) mm.setCementColor(materials.masonry.cementColor);
      // Lintel
      if (materials.lintel?.color !== undefined) mm.setLintelColor(materials.lintel.color);
      if (materials.lintel?.colorSigma !== undefined) mm.setLintelColorSigma(materials.lintel.colorSigma);
      // Infill
      if (materials.infill?.color !== undefined) mm.setInfillColor(materials.infill.color);
      if (materials.infill?.colorSigma !== undefined) mm.setInfillColorSigma(materials.infill.colorSigma);
    }

    return this;
  }

  /** Step 1.5: Pre-compute opening bounds for pseudo-boolean row generation */
  precomputeOpeningBounds(): this {
    const { openings } = this.params;
    if (!openings || openings.length === 0) return this;

    this.ctx.openingBoundsForRows = openings.map(opening => {
      const snappedBounds = snapToRowBoundaries(
        opening.placement.position.y,
        opening.size.h,
        this.ctx.wallHeight,
        this.ctx.blockHeight,
        this.ctx.cementThickness
      );

      return {
        left: opening.placement.position.x - opening.size.l / 2,
        right: opening.placement.position.x + opening.size.l / 2,
        snappedBottomY: snappedBounds.snappedBottomY,
        snappedTopY: snappedBounds.snappedTopY
      };
    });

    console.log(`[WallBuilder] Pre-computed ${this.ctx.openingBoundsForRows.length} opening bounds for row generation`);
    return this;
  }

  /** Step 2: Generate base wall with rows */
  generateBaseWall(): this {
    this.ctx.wallGroup = wallManagerInstance.generateWallGroup(
      this.ctx.wallWidth, this.ctx.wallHeight, this.ctx.wallLength,
      this.ctx.blockWidth, this.ctx.blockHeight, this.ctx.cementThickness,
      this.ctx.positionX, this.ctx.positionY, this.ctx.positionZ,
      this.ctx.yawDegrees, this.params.task.completion,
      this.ctx.openingBoundsForRows
    );
    // Context is the source of truth; actualWallWidth matches target width from row generation
    this.ctx.actualWallWidth = this.ctx.wallWidth;
    return this;
  }

  /** Step 2.5: Add top cap to the wall (horizontal face at top of completed wall) */
  addWallTopCap(): this {
    // Skip top cap if:
    // - No wall group or no rows
    // - Wall is 100% complete (infill will cover the top)
    if (!this.ctx.wallGroup || this.ctx.visibleRows === 0) return this;
    if (this.params.task.completion >= 1.0) return this;

    // Calculate the Y position of the top of the completed wall
    // Wall bottom is at -wallHeight/2, top of completed rows is at bottom + actualWallHeight
    // Add cementThickness/2 to align with actual row top (accounting for geometry offset)
    const wallBottomY = -this.ctx.wallHeight / 2;
    const topY = wallBottomY + this.ctx.actualWallHeight + this.ctx.cementThickness / 2;

    // Top row index (0-based) - used for stagger pattern calculation
    const topRowIndex = this.ctx.visibleRows - 1;

    // Create the wall top cap
    const topCap = RowGenerator.createWallTopCap(
      this.ctx.actualWallWidth,
      this.ctx.wallLength,
      this.ctx.blockWidth,
      this.ctx.blockHeight,
      this.ctx.cementThickness,
      topRowIndex,
      topY,
      this.ctx.openingBoundsForRows
    );

    if (topCap) {
      this.ctx.wallGroup.add(topCap);
    }

    return this;
  }

  /** Step 3: Add top infill if 100% complete */
  addInfill(): this {
    if (this.params.task.completion < 1.0 || !this.ctx.wallGroup) return this;

    const infillMesh = new InfillGenerator().createTopInfill(
      this.ctx.actualWallWidth, this.ctx.wallHeight, this.ctx.wallLength,
      this.ctx.blockHeight, this.ctx.cementThickness
    );

    if (infillMesh) {
      this.ctx.infillMesh = infillMesh;
      this.ctx.wallGroup.add(infillMesh);
    }
    return this;
  }

  /** Step 4: Create openings and lintels */
  createOpenings(): this {
    const { openings } = this.params;
    if (!openings || openings.length === 0 || !this.ctx.wallGroup) return this;

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
      openings, wallBounds, processContext, this.ctx.wallGroup
    );

    // Create bottom caps (sills) for each opening
    // Note: Top caps are not needed since lintels already cover that area
    openingDataList.forEach((data, index) => {
      if (!data.snappedBounds) return;

      // Build bounds for OTHER openings (exclude self) for clamping
      const otherBounds: OpeningBoundsForRow[] = openingDataList
        .filter((_, i) => i !== index)
        .filter(d => d.snappedBounds)
        .map(d => ({
          left: d.opening.placement.position.x - d.opening.size.l / 2,
          right: d.opening.placement.position.x + d.opening.size.l / 2,
          snappedBottomY: d.snappedBounds!.snappedBottomY,
          snappedTopY: d.snappedBounds!.snappedTopY
        }));

      const bottomCap = this.openingGenerator.createOpeningBottomCap(
        data.opening,
        data.snappedBounds,
        this.ctx.wallHeight,
        this.ctx.wallLength,
        this.ctx.cementThickness,
        this.ctx.blockWidth,
        this.ctx.blockHeight,
        this.ctx.actualWallWidth,
        this.ctx.actualWallHeight,
        otherBounds
      );

      if (bottomCap) {
        this.ctx.wallGroup!.add(bottomCap);
      }
    });

    this.ctx.openingDataList = openingDataList;
    this.ctx.lintelMeshes = lintelMeshes;
    return this;
  }

  /** Step 5: Apply all CSG operations (delegated to OpeningCutter) */
  applyCsgOperations(): this {
    if (!this.ctx.wallGroup) return this;

    cutOpenings({
      wallGroup: this.ctx.wallGroup,
      wallWidth: this.ctx.wallWidth,
      wallHeight: this.ctx.wallHeight,
      wallLength: this.ctx.wallLength,
      blockHeight: this.ctx.blockHeight,
      cementThickness: this.ctx.cementThickness,
      openingDataList: this.ctx.openingDataList,
      infillMesh: this.ctx.infillMesh,
      lintelMeshes: this.ctx.lintelMeshes
    });

    return this;
  }

  /** Step 6: Shift geometry to bottom-left pivot point */
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

  /** Step 7: Add metadata to wall group (public API only; no internal fields like actualWallWidth/Height) */
  addMetadata(): this {
    if (!this.ctx.wallGroup) return this;

    this.ctx.wallGroup.userData = {
      objectType: 'MasonryWall',
      wall: this.params.wall,
      openings: this.params.openings,
      task: { completion: this.params.task.completion },
      pivotOffset: { x: this.ctx.wallWidth / 2, y: this.ctx.wallHeight / 2 }
    };
    return this;
  }

  /** Final step: Return constructed wall group */
  build(): THREE.Group {
    return this.ctx.wallGroup || (() => {
      const empty = new THREE.Group();
      empty.name = 'EmptyWall';
      return empty;
    })();
  }
}


