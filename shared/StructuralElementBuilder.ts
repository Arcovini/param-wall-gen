/**
 * StructuralElementBuilder - Generic builder for structural elements
 *
 * Provides a fluent interface for constructing columns, beams, and other
 * structural elements step-by-step. Replaces ColumnBuilder and BeamBuilder.
 */

import * as THREE from 'three';
import type { StructuralElementType, StructuralElementParams } from './types';
import { StructuralMaterialManager } from './StructuralMaterialManager';

/**
 * Internal build context - tracks state during element construction
 */
interface BuildContext {
  // Dimensions
  width: number;      // w - left-to-right (x-axis)
  height: number;     // h - bottom-to-top (y-axis)
  depth: number;      // l - front-to-back (z-axis)

  // Placement
  positionX: number;
  positionY: number;
  positionZ: number;
  yawRadians: number;

  // Build state
  group: THREE.Group | null;
  mesh: THREE.Mesh | null;
}

/**
 * StructuralElementBuilder class - Fluent builder for structural elements
 */
export class StructuralElementBuilder {
  private elementType: StructuralElementType;
  private params: StructuralElementParams;
  private ctx: BuildContext;

  constructor(elementType: StructuralElementType, params: StructuralElementParams) {
    this.elementType = elementType;
    this.params = params;
    this.ctx = this.createEmptyContext();
  }

  private createEmptyContext(): BuildContext {
    return {
      width: 0, height: 0, depth: 0,
      positionX: 0, positionY: 0, positionZ: 0, yawRadians: 0,
      group: null, mesh: null
    };
  }

  /** Step 1: Parse parameters and apply material properties */
  parseParameters(): this {
    // Size: l=depth, w=width, h=height
    this.ctx.depth = this.params.size.l;
    this.ctx.width = this.params.size.w;
    this.ctx.height = this.params.size.h;

    // Placement
    this.ctx.positionX = this.params.placement.position.x;
    this.ctx.positionY = this.params.placement.position.y;
    this.ctx.positionZ = this.params.placement.position.z;
    this.ctx.yawRadians = this.params.placement.direction.yaw;

    // Apply material properties if provided
    if (this.params.material) {
      StructuralMaterialManager.getInstance().applyConfig(
        this.elementType,
        this.params.material
      );
    }

    return this;
  }

  /** Step 2: Generate geometry - BoxGeometry + material */
  generateGeometry(): this {
    const mm = StructuralMaterialManager.getInstance();

    // Create box geometry with dimensions (width, height, depth)
    // THREE.BoxGeometry uses (width, height, depth) = (x, y, z)
    const geometry = new THREE.BoxGeometry(
      this.ctx.width,   // x-axis (left-to-right)
      this.ctx.height,  // y-axis (bottom-to-top)
      this.ctx.depth    // z-axis (front-to-back)
    );

    // Use textured material if texture specified, otherwise cached material
    const material = this.params.material?.texture
      ? mm.createTexturedMaterial(this.elementType, this.params.material)
      : mm.getMaterial(this.elementType);

    // Create mesh with element material
    this.ctx.mesh = new THREE.Mesh(geometry, material);
    this.ctx.mesh.name = `${this.elementType}Mesh`;

    // Create group to hold the element
    this.ctx.group = new THREE.Group();
    this.ctx.group.name = this.elementType;
    this.ctx.group.add(this.ctx.mesh);

    // Apply rotation (yaw around Y-axis)
    this.ctx.group.rotation.y = this.ctx.yawRadians;

    // Apply position
    this.ctx.group.position.set(
      this.ctx.positionX,
      this.ctx.positionY,
      this.ctx.positionZ
    );

    return this;
  }

  /** Step 3: Shift geometry to bottom-left-front pivot point */
  shiftToBottomLeftPivot(): this {
    if (!this.ctx.mesh) return this;

    // Element is centered at origin, shift so bottom-left-front corner is at origin
    const halfWidth = this.ctx.width / 2;
    const halfHeight = this.ctx.height / 2;

    // Shift the mesh position within the group
    this.ctx.mesh.position.x += halfWidth;
    this.ctx.mesh.position.y += halfHeight;

    return this;
  }

  /** Step 4: Add metadata to element group */
  addMetadata(): this {
    if (!this.ctx.group) return this;

    // Build metadata object with element-type-specific key
    const elementKey = this.elementType.toLowerCase();
    this.ctx.group.userData = {
      objectType: this.elementType,
      [elementKey]: this.params,
      pivotOffset: {
        x: this.ctx.width / 2,
        y: this.ctx.height / 2
      }
    };

    return this;
  }

  /** Final step: Return constructed element group */
  build(): THREE.Group {
    return this.ctx.group || (() => {
      const empty = new THREE.Group();
      empty.name = `Empty${this.elementType}`;
      return empty;
    })();
  }
}
