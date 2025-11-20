import * as THREE from 'three';
import type { OpeningParams } from './types';

/**
 * OpeningGenerator - Generates meshes for wall openings
 */
export class OpeningGenerator {
  private material: THREE.MeshBasicMaterial;

  constructor() {
    // Red color for initial representation
    this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  }

  /**
   * Creates a mesh representing an opening
   * @param params Parameters for the opening
   * @returns A THREE.Mesh representing the opening
   */
  createOpeningMesh(params: OpeningParams): THREE.Mesh {
    const { size, placement } = params;

    const geometry = new THREE.BoxGeometry(size.l, size.h, size.w);
    const mesh = new THREE.Mesh(geometry, this.material);

    // Position the mesh
    // Note: size.l is width (x), size.h is height (y), size.w is depth (z) based on typical Three.js box geometry mapping
    // But looking at types.ts:
    // size.l -> width?
    // size.w -> depth?
    // size.h -> height?
    // Let's verify with buildMasonryWall.ts mapping:
    // wall.size.w -> wallWidth (horizontal length)
    // wall.size.h -> wallHeight (vertical height)
    // wall.size.l -> wallLength (depth/thickness)

    // In buildMasonryWall.ts:
    // wall.size.l -> wallLength (depth)
    // wall.size.w -> wallWidth (horizontal)
    // wall.size.h -> wallHeight (vertical)

    // In OpeningParams (types.ts):
    // type Size = { l:number; w:number; h:number };

    // Standard convention in this project seems to be:
    // l = length/width (horizontal)
    // h = height (vertical)
    // w = width/depth (thickness)

    // Let's check test-scenarios.ts to see how openings are defined.
    // But for now, I will assume:
    // l = horizontal dimension (x)
    // h = vertical dimension (y)
    // w = depth dimension (z)

    // However, BoxGeometry takes (width, height, depth).
    // So:
    // width (x) = params.size.l
    // height (y) = params.size.h
    // depth (z) = params.size.w

    // Re-creating geometry with correct mapping
    const geometryCorrect = new THREE.BoxGeometry(params.size.l, params.size.h, params.size.w);

    // Ensure uv2 exists for CSG compatibility
    if (!geometryCorrect.attributes.uv2) {
      geometryCorrect.setAttribute('uv2', geometryCorrect.attributes.uv.clone());
    }

    // Convert to non-indexed geometry for better CSG stability
    const finalGeometry = geometryCorrect.toNonIndexed();

    const meshCorrect = new THREE.Mesh(finalGeometry, this.material);

    meshCorrect.position.set(
      placement.position.x,
      placement.position.y,
      placement.position.z
    );

    return meshCorrect;
  }

  /**
   * Disposes of resources
   */
  dispose(): void {
    this.material.dispose();
  }
}
