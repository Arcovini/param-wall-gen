/**
 * buildWall - Main API entry point for wall generation.
 * Uses rendering-descriptors + engine-adapter (DEC-A3 pipeline).
 */

import * as THREE from 'three';
import type { BuildMasonryWallParams } from './types';
import { buildWallDescriptor } from './WallGeometryBuilder';
import { create as createFromDescriptor } from '../engine-adapter/three-js-adapter';

/**
 * Build wall via GeometryDescriptor + shared Three adapter.
 * Applies per-mesh local positions and sets userData for SolidWall API.
 */
export function buildWall(params: BuildMasonryWallParams): THREE.Group {
  const result = buildWallDescriptor(params);
  const { placement } = params.wall;
  const group = createFromDescriptor(result.descriptor, {
    position: placement.position,
    rotation: { yaw: placement.direction.yaw }
  });
  group.name = 'SolidWall';

  for (let i = 0; i < group.children.length && i < result.meshLocalPositions.length; i++) {
    const child = group.children[i];
    const pos = result.meshLocalPositions[i];
    child.position.set(pos.x, pos.y, pos.z);
  }

  (group.userData as Record<string, unknown>) = {
    objectType: 'MasonryWall',
    wall: result.wall,
    openings: result.openings,
    task: result.task,
    modelParams: result.modelParams,
    bounds: result.bounds
  };

  return group;
}
