import * as THREE from 'three';

/**
 * InfillGenerator - Generates top infill (encunhamento) for walls
 */
export class InfillGenerator {
  private material: THREE.MeshStandardMaterial;

  constructor() {
    this.material = new THREE.MeshStandardMaterial({
      color: 0x4169E1, // Royal blue
      roughness: 0.7,
      metalness: 0.2
    });
  }

  /**
   * Creates top infill mesh if there's a gap at the top of the wall
   * @param actualWallWidth Actual width of the wall (calculated from blocks that fit)
   * @param wallHeight Target wall height
   * @param wallLength Depth/thickness of the wall
   * @param blockHeight Height of a single block
   * @param cementThickness Thickness of cement joints
   * @returns A THREE.Mesh representing the infill, or null if no gap exists
   */
  createTopInfill(
    actualWallWidth: number,
    wallHeight: number,
    wallLength: number,
    blockHeight: number,
    cementThickness: number
  ): THREE.Mesh | null {
    const blocksVertical = Math.floor(wallHeight / (blockHeight + cementThickness));
    const fullWallHeight = blocksVertical * blockHeight + (blocksVertical - 1) * cementThickness;
    const gap = wallHeight - fullWallHeight;

    if (gap <= 0.01) { // No significant gap (< 1cm)
      return null;
    }

    const infillGeometry = new THREE.BoxGeometry(actualWallWidth, gap, wallLength);
    const infillMesh = new THREE.Mesh(infillGeometry, this.material);

    // Position at top of wall (centered)
    infillMesh.position.set(0, fullWallHeight / 2 + gap / 2, 0);
    infillMesh.castShadow = true;
    infillMesh.receiveShadow = true;
    infillMesh.name = "TopInfill";

    console.log(`Added top infill: height=${gap.toFixed(3)}m at y=${infillMesh.position.y.toFixed(3)}`);

    return infillMesh;
  }

  /**
   * Disposes of resources
   */
  dispose(): void {
    this.material.dispose();
  }
}
