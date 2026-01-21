/**
 * ColumnBuilder - Builder pattern implementation for parametric columns
 *
 * Provides a fluent interface for constructing columns step-by-step.
 * Simplified 4-step builder (vs wall's 7+ steps).
 */

import * as THREE from 'three';
import type { BuildColumnParams } from '../types';
import { ColumnMaterialManager } from './ColumnMaterialManager';

/**
 * Internal build context - tracks state during column construction
 */
interface ColumnBuildContext {
  // Dimensions
  width: number;      // w - left-to-right
  height: number;     // h - bottom-to-top
  depth: number;      // l - front-to-back

  // Placement
  positionX: number;
  positionY: number;
  positionZ: number;
  yawRadians: number;

  // Build state
  columnGroup: THREE.Group | null;
  columnMesh: THREE.Mesh | null;
}

/**
 * ColumnBuilder class - Fluent builder for columns
 */
export class ColumnBuilder {
  private params: BuildColumnParams;
  private ctx: ColumnBuildContext;

  constructor(params: BuildColumnParams) {
    this.params = params;
    this.ctx = this.createEmptyContext();
  }

  private createEmptyContext(): ColumnBuildContext {
    return {
      width: 0, height: 0, depth: 0,
      positionX: 0, positionY: 0, positionZ: 0, yawRadians: 0,
      columnGroup: null, columnMesh: null
    };
  }

  /** Step 1: Parse parameters and apply material properties */
  parseParameters(): this {
    const { column } = this.params;

    // Size: l=depth, w=width, h=height
    this.ctx.depth = column.size.l;
    this.ctx.width = column.size.w;
    this.ctx.height = column.size.h;

    // Placement
    this.ctx.positionX = column.placement.position.x;
    this.ctx.positionY = column.placement.position.y;
    this.ctx.positionZ = column.placement.position.z;
    this.ctx.yawRadians = column.placement.direction.yaw;

    // Apply material properties if provided
    const material = column.material;
    if (material) {
      const mm = ColumnMaterialManager.getInstance();
      if (material.color !== undefined) mm.setColumnColor(material.color);
      if (material.roughness !== undefined) mm.setRoughness(material.roughness);
      if (material.metalness !== undefined) mm.setMetalness(material.metalness);
    }

    return this;
  }

  /** Step 2: Generate geometry - BoxGeometry + material */
  generateGeometry(): this {
    const mm = ColumnMaterialManager.getInstance();

    // Create box geometry with dimensions (width, height, depth)
    // THREE.BoxGeometry uses (width, height, depth) = (x, y, z)
    const geometry = new THREE.BoxGeometry(
      this.ctx.width,   // x-axis (left-to-right)
      this.ctx.height,  // y-axis (bottom-to-top)
      this.ctx.depth    // z-axis (front-to-back)
    );

    // Create mesh with column material
    this.ctx.columnMesh = new THREE.Mesh(geometry, mm.getColumnMaterial());
    this.ctx.columnMesh.name = 'ColumnMesh';

    // Create group to hold the column
    this.ctx.columnGroup = new THREE.Group();
    this.ctx.columnGroup.name = 'Column';
    this.ctx.columnGroup.add(this.ctx.columnMesh);

    // Apply rotation (yaw around Y-axis)
    this.ctx.columnGroup.rotation.y = this.ctx.yawRadians;

    // Apply position
    this.ctx.columnGroup.position.set(
      this.ctx.positionX,
      this.ctx.positionY,
      this.ctx.positionZ
    );

    return this;
  }

  /** Step 3: Shift geometry to bottom-left-front pivot point */
  shiftToBottomLeftPivot(): this {
    if (!this.ctx.columnMesh) return this;

    // Column is centered at origin, shift so bottom-left-front corner is at origin
    const halfWidth = this.ctx.width / 2;
    const halfHeight = this.ctx.height / 2;

    // Shift the mesh position within the group
    this.ctx.columnMesh.position.x += halfWidth;
    this.ctx.columnMesh.position.y += halfHeight;

    return this;
  }

  /** Step 4: Add metadata to column group */
  addMetadata(): this {
    if (!this.ctx.columnGroup) return this;

    this.ctx.columnGroup.userData = {
      objectType: 'Column',
      column: this.params.column,
      pivotOffset: {
        x: this.ctx.width / 2,
        y: this.ctx.height / 2
      }
    };

    return this;
  }

  /** Final step: Return constructed column group */
  build(): THREE.Group {
    return this.ctx.columnGroup || (() => {
      const empty = new THREE.Group();
      empty.name = 'EmptyColumn';
      return empty;
    })();
  }
}
