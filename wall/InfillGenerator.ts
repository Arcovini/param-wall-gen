import * as THREE from 'three';
import { MaterialManager } from './MaterialManager';

/**
 * InfillGenerator - Generates top infill (encunhamento) for walls
 */
export class InfillGenerator {
  // Material is now managed by MaterialManager

  constructor() {
    // No local material initialization needed
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

    if (gap <= 0) { // No gap
      return null;
    }

    const infillGeometry = new THREE.BoxGeometry(actualWallWidth, gap, wallLength);
    const infillMesh = new THREE.Mesh(infillGeometry, MaterialManager.getInstance().getInfillMaterial());

    // Position at top of wall (centered)
    // The wall geometry is centered at 0, spanning [-wallHeight/2, wallHeight/2].
    // The infill should be at the top, so its top edge should be at wallHeight/2.
    // Center Y = Top - Height/2 = wallHeight/2 - gap/2.
    infillMesh.position.set(0, wallHeight / 2 - gap / 2, 0);
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
    // Material is managed by MaterialManager, so we don't dispose it here
  }
}
