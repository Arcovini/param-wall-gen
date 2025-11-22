import * as THREE from 'three';
import type { OpeningParams } from './types';
import { MaterialManager } from './MaterialManager';

/**
 * LintelGenerator - Generates lintels (vergas) over openings
 */
export class LintelGenerator {
  // Material is now managed by MaterialManager

  constructor() {
    // No local material initialization needed
  }

  /**
   * Creates a lintel mesh if the opening does not touch the top of the wall
   * @param opening The opening parameters
   * @param wallHeight The total height of the wall
   * @param wallLength The depth/thickness of the wall
   * @param blockHeight The height of a single block
   * @param blockWidth The width (length) of a single block
   * @returns A THREE.Mesh representing the lintel, or null if not needed
   */
  createLintel(
    opening: OpeningParams,
    wallHeight: number,
    wallLength: number,
    blockHeight: number,
    blockWidth: number,
    currentWallHeight: number
  ): THREE.Mesh | null {
    const openingHeight = opening.size.h;
    const openingWidth = opening.size.l;
    const openingY = opening.placement.position.y;

    // Calculate top of the opening
    // Opening is centered at openingY
    const openingTopY = openingY + openingHeight / 2;

    // Calculate top of the wall
    // Wall is centered at 0, so top is wallHeight / 2
    const wallTopY = wallHeight / 2;

    // Calculate current constructed wall top Y
    // Wall starts at -wallHeight / 2
    const currentWallTopY = -wallHeight / 2 + currentWallHeight;

    // Check if opening touches or exceeds the top of the wall
    // Use a small epsilon for float comparison
    if (openingTopY >= wallTopY - 0.001) {
      return null;
    }

    // Check if the wall construction has reached the top of the opening
    // If not, don't show the lintel yet
    if (currentWallTopY <= openingTopY) {
      return null;
    }

    // Lintel dimensions
    // Height: half of block height (without cement)
    const lintelHeight = blockHeight / 2;

    // Width: openingWidth + blockWidth (half block on each side)
    const lintelWidth = openingWidth + blockWidth;

    // Depth: wall thickness
    const lintelDepth = wallLength;

    const geometry = new THREE.BoxGeometry(lintelWidth, lintelHeight, lintelDepth);

    // Ensure uv2 exists for consistency
    if (!geometry.attributes.uv2) {
      geometry.setAttribute('uv2', geometry.attributes.uv);
    }

    const mesh = new THREE.Mesh(geometry, MaterialManager.getInstance().getLintelMaterial());

    // Position
    // Centered horizontally relative to opening -> same X and Z as opening
    // Vertically immediately over the opening
    // Lintel center Y = Opening Top Y + Lintel Height / 2
    const lintelY = openingTopY + lintelHeight / 2;

    mesh.position.set(
      opening.placement.position.x,
      lintelY,
      opening.placement.position.z
    );

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.name = "Lintel";

    return mesh;
  }

  /**
   * Disposes of resources
   */
  dispose(): void {
    // Material is managed by MaterialManager, so we don't dispose it here
  }
}
