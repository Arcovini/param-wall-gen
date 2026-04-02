/**
 * Smoke verification for wall-generator DEC-A3 pipeline.
 * Run manually to ensure createInstance, getters, handleTaskStateChange, and dispose work.
 * Usage: npx ts-node wall-generator/verification.ts (or tsx)
 */

import * as THREE from 'three';
import {
  createInstance,
  getCompletedBoundingBox,
  getExecutionStateBoundingBox,
  getCentroid,
  getKeyPoints,
  getSimulationConfig,
  getStochasticParams,
  selectMaterials,
  handleTaskStateChange,
  dispose,
  TYPE_ID,
  EXPANSION_FACTOR
} from './index';
import type { SolidWallInstance } from './types';

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message);
}

function run(): void {
  // 1. Wall with no openings
  const group1 = createInstance(undefined, {
    wall: {
      placement: { parent: null, position: { x: 0, y: 0, z: 0 }, direction: { yaw: 0 } },
      size: { l: 0.2, w: 3, h: 2 },
      blockSize: { l: 0.2, w: 0.1, h: 0.1 },
      cementThickness: 0.01
    },
    openings: [],
    completion: 1
  });
  assert(group1 != null, 'createInstance returns group');
  assert((group1.userData as Record<string, unknown>).objectType === 'SolidWall', 'userData.objectType');
  const ud = group1.userData as Record<string, unknown>;
  assert(ud.wall != null && ud.openings != null && ud.task != null, 'userData.wall/openings/task');
  assert(ud.modelParams != null && ud.bounds != null, 'userData.modelParams/bounds');

  // Material pipeline: wall meshes must have geometry and material(s)
  let meshCount = 0;
  group1.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      meshCount++;
      assert(obj.geometry != null, 'mesh has geometry');
      assert(obj.material != null, 'mesh has material');
    }
  });
  assert(meshCount >= 1, 'wall group has at least one mesh');

  const wallInstance = group1 as unknown as SolidWallInstance;
  const boundsCompleted = getCompletedBoundingBox(wallInstance);
  assert(boundsCompleted.min != null && boundsCompleted.max != null, 'getCompletedBoundingBox');
  getExecutionStateBoundingBox(wallInstance);
  const centroid = getCentroid(wallInstance);
  assert(centroid.x === 0 && centroid.y === 0 && centroid.z === 0, 'getCentroid (local origin)');
  const keypoints = getKeyPoints(wallInstance);
  assert(Object.keys(keypoints).length >= 4, 'getKeyPoints');

  const styleUpdate = handleTaskStateChange(wallInstance, { completionPercentage: 50 });
  assert(styleUpdate.styleValues != null && styleUpdate.styleValues.length >= 0, 'handleTaskStateChange');

  dispose(group1);

  // 2. Type-level APIs
  assert(getSimulationConfig().roles != null, 'getSimulationConfig');
  assert(getStochasticParams().length > 0, 'getStochasticParams');
  assert(selectMaterials(123).main != null, 'selectMaterials');
  assert(TYPE_ID === 'SOLID_WALL', 'TYPE_ID');
  assert(EXPANSION_FACTOR.x != null, 'EXPANSION_FACTOR');

  console.log('wall-generator verification: OK');
}

run();
