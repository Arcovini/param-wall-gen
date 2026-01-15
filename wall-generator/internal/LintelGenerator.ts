import * as THREE from 'three';
import type { OpeningParams } from '../types';
import { MaterialManager } from './MaterialManager';

/**
 * LintelGenerator - Generates lintels (vergas) over openings
 */
export class LintelGenerator {
  /**
   * Creates a lintel mesh if the opening does not touch the top of the wall
   * @param opening The opening parameters
   * @param wallHeight The total height of the wall
   * @param wallLength The depth/thickness of the wall
   * @param blockHeight The height of a single block
   * @param blockWidth The width (length) of a single block
   * @param currentWallHeight The current height of the constructed wall
   * @param cementThickness The thickness of cement joints
   * @returns A THREE.Mesh representing the lintel, or null if not needed
   */
  createLintel(
    opening: OpeningParams,
    wallHeight: number,
    wallLength: number,
    blockHeight: number,
    blockWidth: number,
    currentWallHeight: number,
    cementThickness: number
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

    // Check if lintel would intersect with the top infill area
    const blocksVertical = Math.floor(wallHeight / (blockHeight + cementThickness));
    const fullWallHeight = blocksVertical * blockHeight + (blocksVertical - 1) * cementThickness;
    const gap = wallHeight - fullWallHeight;
    if (gap > 0) {
      const infillBottomY = wallTopY - gap;
      const lintelHeight = blockHeight / 2;
      const lintelTopY = openingTopY + lintelHeight;
      if (lintelTopY > infillBottomY - 0.001) {
        return null;
      }
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
    // Note: CSG operations in OpeningCutter will clip this to wall bounds
    // and subtract other openings as needed
    const lintelWidth = openingWidth + blockWidth;

    // Depth: wall thickness
    const lintelDepth = wallLength;

    const geometry = new THREE.BoxGeometry(lintelWidth, lintelHeight, lintelDepth);

    // Ensure uv2 exists for consistency
    if (!geometry.attributes.uv2) {
      geometry.setAttribute('uv2', geometry.attributes.uv.clone());
    }

    // Add vertex colors for per-lintel variation
    const lintelColor = MaterialManager.getInstance().generateVariedLintelColor();
    const vertexCount = geometry.attributes.position.count;
    const colors = new Float32Array(vertexCount * 3);
    for (let i = 0; i < vertexCount; i++) {
      colors[i * 3] = lintelColor.r;
      colors[i * 3 + 1] = lintelColor.g;
      colors[i * 3 + 2] = lintelColor.b;
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mesh = new THREE.Mesh(geometry, MaterialManager.getInstance().getLintelMaterial());

    // Position
    // Centered horizontally relative to opening -> same X and Z as opening
    // Vertically flush with the top of the opening (no cement gap)
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
}
