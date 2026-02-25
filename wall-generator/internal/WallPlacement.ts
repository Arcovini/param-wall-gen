import * as THREE from 'three';
import type { Placement, Position, QuaternionLike } from '../types';

/**
 * Converts degrees to radians
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

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
 * Transforms a point from local space to world space using placement (position + yaw around Y).
 * Used to compute world AABBs for bounds.
 */
export function transformPointByPlacement(local: Position, placement: Placement): Position {
  const { position } = placement;
  const yaw = getPlacementYaw(placement);
  const cos = Math.cos(yaw);
  const sin = Math.sin(yaw);
  // Y-up: rotate (x, z) by yaw around Y
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

/**
 * Applies placement transformations (position and rotation) to a THREE.Group
 *
 * @param group - The THREE.Group to transform
 * @param position - The position {x, y, z} to apply
 * @param yawDegrees - The rotation around the Y axis in degrees
 */
export function applyPlacement(
  group: THREE.Group,
  position: { x: number; y: number; z: number },
  yawDegrees: number
): void {
  // Apply position
  group.position.set(position.x, position.y, position.z);

  // Apply rotation (yaw is rotation around Y axis)
  // Reset rotation first to avoid accumulation
  group.rotation.set(0, 0, 0);
  group.rotation.y = degreesToRadians(yawDegrees);
}

/**
 * Creates a Placement object from position and yaw values
 */
export function createPlacement(
  x: number,
  y: number,
  z: number,
  yawDegrees: number,
  parent: Placement | null = null
): Placement {
  return {
    parent,
    position: { x, y, z },
    direction: { yaw: degreesToRadians(yawDegrees) }
  };
}
