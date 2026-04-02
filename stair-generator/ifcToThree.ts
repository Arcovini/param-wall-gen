import * as THREE from 'three';
import type { Point3 } from './types';

export function ifcPointToThree(point: Point3): THREE.Vector3 {
  const [x, y, z] = point;
  return new THREE.Vector3(x, z, -y);
}
