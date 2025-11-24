
import * as THREE from 'three';
import { buildMasonryWall } from './buildMasonryWall';
import { MaterialManager } from './MaterialManager';

// Mock MaterialManager to avoid TextureLoader and DOM dependency
const mockMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
MaterialManager.getInstance = () => {
  return {
    getInfillMaterial: () => mockMaterial,
    getLintelMaterial: () => mockMaterial,
    getBrickMaterial: () => mockMaterial,
    getCementMaterial: () => mockMaterial,
    dispose: () => { }
  } as any;
};

// Mock the task
const task = { completion: 1.0 };

// Define wall parameters
const wallParams = {
  wall: {
    size: { w: 3, h: 3, l: 0.2 },
    placement: { position: { x: 0, y: 1.5, z: 0 }, direction: { yaw: 0 } },
    blockSize: { l: 0.4, h: 0.2 },
    cementThickness: 0.01
  },
  openings: [
    {
      size: { l: 1, h: 1, w: 0.2 },
      placement: { position: { x: -0.8, y: 0, z: 0 } }
    },
    {
      size: { l: 1, h: 1, w: 0.2 },
      placement: { position: { x: 0.8, y: 0, z: 0 } }
    }
  ],
  task: task,
  visualization: 'none'
};

console.log("Starting reproduction test...");

try {
  const wallGroup = buildMasonryWall(wallParams);
  console.log("Wall generated.");

  // Check for lintels
  const lintels = wallGroup.children.filter(c => c.name === 'Lintel');
  console.log(`Found ${lintels.length} lintels.`);

  // Check row geometries
  const rows = wallGroup.children.filter(c => c.name.startsWith('RowMesh'));
  console.log(`Found ${rows.length} rows.`);

} catch (e) {
  console.error("Error during generation:", e);
}
