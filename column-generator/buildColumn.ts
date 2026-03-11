/**
 * buildColumn - Main API entry point for column generation.
 * Uses geometry-description + engine-adapter (DEC-A3 pipeline).
 */

import * as THREE from 'three';
import type { BuildColumnParams } from './types';
import { buildColumnDescriptor } from './ColumnGeometryBuilder';
import { create as createFromDescriptor } from '../engine-adapter/three-js-adapter';

/**
 * Build column via GeometryDescriptor + Three adapter.
 * Accepts BuildColumnParams and returns a THREE.Group with same userData shape for SolidColumn API.
 */
export function buildColumn(params: BuildColumnParams): THREE.Group {
  const descriptor = buildColumnDescriptor(params);
  const { placement } = params.column;
  const group = createFromDescriptor(descriptor, {
    position: placement.position,
    rotation: { yaw: placement.direction.yaw }
  });
  group.name = 'Column';
  (group.userData as Record<string, unknown>) = {
    objectType: 'Column',
    column: params.column,
    task: params.task ?? { completion: 1 }
  };
  return group;
}
