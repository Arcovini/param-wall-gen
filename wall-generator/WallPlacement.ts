import * as THREE from 'three';

/**
 * Converts degrees to radians
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
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
  parent: any = null
): {
  parent: any;
  position: { x: number; y: number; z: number };
  direction: { yaw: number };
} {
  return {
    parent,
    position: { x, y, z },
    direction: { yaw: degreesToRadians(yawDegrees) }
  };
}
