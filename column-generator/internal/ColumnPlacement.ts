/**
 * ColumnPlacement - Transform local (centroid) space to world space
 *
 * Uses position + yaw around Y. Supports placement.rotation (quaternion) when set.
 */

import type { Placement, Position, QuaternionLike } from '../types';

/** Yaw (radians) from quaternion (Y-up rotation). */
export function quaternionToYaw(q: QuaternionLike): number {
  const { x, y, z, w } = q;
  const siny = 2 * (w * y - z * x);
  const cosy = 1 - 2 * (x * x + y * y);
  return Math.atan2(siny, cosy);
}

/** Yaw in radians from placement: from rotation if present, else direction.yaw. */
export function getPlacementYaw(placement: Placement): number {
  return placement.rotation != null ? quaternionToYaw(placement.rotation) : placement.direction.yaw;
}

/**
 * Transforms a point from local (centroid) space to world space using placement (position + yaw around Y).
 */
export function transformPointByPlacement(local: Position, placement: Placement): Position {
  const { position } = placement;
  const yaw = getPlacementYaw(placement);
  const cos = Math.cos(yaw);
  const sin = Math.sin(yaw);
  const x = local.x * cos - local.z * sin + position.x;
  const y = local.y + position.y;
  const z = local.x * sin + local.z * cos + position.z;
  return { x, y, z };
}

/**
 * Computes world AABB from local min/max by transforming all 8 corners and taking component-wise min/max.
 */
export function localAABBToWorld(
  localMin: Position,
  localMax: Position,
  placement: Placement
): { min: Position; max: Position } {
  const corners: Position[] = [
    { x: localMin.x, y: localMin.y, z: localMin.z },
    { x: localMax.x, y: localMin.y, z: localMin.z },
    { x: localMax.x, y: localMax.y, z: localMin.z },
    { x: localMin.x, y: localMax.y, z: localMin.z },
    { x: localMin.x, y: localMin.y, z: localMax.z },
    { x: localMax.x, y: localMin.y, z: localMax.z },
    { x: localMax.x, y: localMax.y, z: localMax.z },
    { x: localMin.x, y: localMax.y, z: localMax.z }
  ];
  const world = corners.map((p) => transformPointByPlacement(p, placement));
  const min = {
    x: Math.min(...world.map((p) => p.x)),
    y: Math.min(...world.map((p) => p.y)),
    z: Math.min(...world.map((p) => p.z))
  };
  const max = {
    x: Math.max(...world.map((p) => p.x)),
    y: Math.max(...world.map((p) => p.y)),
    z: Math.max(...world.map((p) => p.z))
  };
  return { min, max };
}
