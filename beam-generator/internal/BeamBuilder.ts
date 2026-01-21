/**
 * BeamBuilder - Builder pattern implementation for parametric beams
 *
 * Provides a fluent interface for constructing beams step-by-step.
 * Simplified 4-step builder (vs wall's 7+ steps).
 */

import * as THREE from 'three';
import type { BuildBeamParams } from '../types';
import { BeamMaterialManager } from './BeamMaterialManager';

/**
 * Internal build context - tracks state during beam construction
 */
interface BeamBuildContext {
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
  beamGroup: THREE.Group | null;
  beamMesh: THREE.Mesh | null;
}

/**
 * BeamBuilder class - Fluent builder for beams
 */
export class BeamBuilder {
  private params: BuildBeamParams;
  private ctx: BeamBuildContext;

  constructor(params: BuildBeamParams) {
    this.params = params;
    this.ctx = this.createEmptyContext();
  }

  private createEmptyContext(): BeamBuildContext {
    return {
      width: 0, height: 0, depth: 0,
      positionX: 0, positionY: 0, positionZ: 0, yawRadians: 0,
      beamGroup: null, beamMesh: null
    };
  }

  /** Step 1: Parse parameters and apply material properties */
  parseParameters(): this {
    const { beam } = this.params;

    // Size: l=depth, w=width, h=height
    this.ctx.depth = beam.size.l;
    this.ctx.width = beam.size.w;
    this.ctx.height = beam.size.h;

    // Placement
    this.ctx.positionX = beam.placement.position.x;
    this.ctx.positionY = beam.placement.position.y;
    this.ctx.positionZ = beam.placement.position.z;
    this.ctx.yawRadians = beam.placement.direction.yaw;

    // Apply material properties if provided
    const material = beam.material;
    if (material) {
      const mm = BeamMaterialManager.getInstance();
      if (material.color !== undefined) mm.setBeamColor(material.color);
      if (material.roughness !== undefined) mm.setRoughness(material.roughness);
      if (material.metalness !== undefined) mm.setMetalness(material.metalness);
    }

    return this;
  }

  /** Step 2: Generate geometry - BoxGeometry + material */
  generateGeometry(): this {
    const mm = BeamMaterialManager.getInstance();

    // Create box geometry with dimensions (width, height, depth)
    // THREE.BoxGeometry uses (width, height, depth) = (x, y, z)
    const geometry = new THREE.BoxGeometry(
      this.ctx.width,   // x-axis (left-to-right)
      this.ctx.height,  // y-axis (bottom-to-top)
      this.ctx.depth    // z-axis (front-to-back)
    );

    // Create mesh with beam material
    this.ctx.beamMesh = new THREE.Mesh(geometry, mm.getBeamMaterial());
    this.ctx.beamMesh.name = 'BeamMesh';

    // Create group to hold the beam
    this.ctx.beamGroup = new THREE.Group();
    this.ctx.beamGroup.name = 'Beam';
    this.ctx.beamGroup.add(this.ctx.beamMesh);

    // Apply rotation (yaw around Y-axis)
    this.ctx.beamGroup.rotation.y = this.ctx.yawRadians;

    // Apply position
    this.ctx.beamGroup.position.set(
      this.ctx.positionX,
      this.ctx.positionY,
      this.ctx.positionZ
    );

    return this;
  }

  /** Step 3: Shift geometry to bottom-left-front pivot point */
  shiftToBottomLeftPivot(): this {
    if (!this.ctx.beamMesh) return this;

    // Beam is centered at origin, shift so bottom-left-front corner is at origin
    const halfWidth = this.ctx.width / 2;
    const halfHeight = this.ctx.height / 2;

    // Shift the mesh position within the group
    this.ctx.beamMesh.position.x += halfWidth;
    this.ctx.beamMesh.position.y += halfHeight;

    return this;
  }

  /** Step 4: Add metadata to beam group */
  addMetadata(): this {
    if (!this.ctx.beamGroup) return this;

    this.ctx.beamGroup.userData = {
      objectType: 'Beam',
      beam: this.params.beam,
      pivotOffset: {
        x: this.ctx.width / 2,
        y: this.ctx.height / 2
      }
    };

    return this;
  }

  /** Final step: Return constructed beam group */
  build(): THREE.Group {
    return this.ctx.beamGroup || (() => {
      const empty = new THREE.Group();
      empty.name = 'EmptyBeam';
      return empty;
    })();
  }
}
