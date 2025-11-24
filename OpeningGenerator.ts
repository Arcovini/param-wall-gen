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
   * @param oversizeFactor Optional factor to oversize the opening for cleaner CSG cuts (default: 1.01)
   * @returns A THREE.Mesh representing the opening
   */
  createOpeningMesh(params: OpeningParams, oversizeFactor: number = 1.05): THREE.Mesh {
    const { size, placement } = params;

    // Oversize the opening significantly to ensure clean CSG cuts
    // This prevents floating-point precision issues that can leave micro-gaps
    // Use more aggressive oversizing for depth (w) to ensure full wall penetration
    const oversizedL = size.l * oversizeFactor;
    const oversizedH = size.h * oversizeFactor;
    const oversizedW = size.w * (oversizeFactor + 0.05); // Extra 5% for depth penetration

    const geometry = new THREE.BoxGeometry(oversizedL, oversizedH, oversizedW);
    const mesh = new THREE.Mesh(geometry, this.material);

    // Re-creating geometry with correct mapping and oversizing
    const geometryCorrect = new THREE.BoxGeometry(oversizedL, oversizedH, oversizedW);

    // Ensure uv2 exists for CSG compatibility
    if (!geometryCorrect.attributes.uv2) {
      geometryCorrect.setAttribute('uv2', geometryCorrect.attributes.uv.clone());
    }

    // Keep indexed geometry for CSG compatibility with row geometry
    // Row geometry is indexed, so opening should be too for proper CSG boundary face creation
    const finalGeometry = geometryCorrect;

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
