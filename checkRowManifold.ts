import * as THREE from 'three';
import { RowGenerator } from './RowGenerator';
import { BlockGenerator } from './BlockGenerator';
import { GeometryUtils } from './utils/GeometryUtils';

export function checkRowManifold() {
  console.log('--- Checking Row Manifold Status ---');

  const blockGenerator = new BlockGenerator();
  // Load materials (mock or real, doesn't matter for geometry check, but needed for creation)
  // BlockGenerator might need async loading for textures, but for geometry check we might be fine if it just creates the geometry.
  // Looking at BlockGenerator (I haven't seen it fully but assuming it has createBlockGeometry)

  const wallLength = 2.0;
  const blockWidth = 0.2;
  const blockHeight = 0.1;
  const cementThickness = 0.01;
  const actualWallWidth = 0.2; // Assuming same as block width for now

  const rowGroup = RowGenerator.createRow(
    blockGenerator,
    actualWallWidth,
    wallLength,
    blockWidth,
    blockHeight,
    cementThickness
  );

  console.log('Row Group created:', rowGroup);

  const mergedGeo = GeometryUtils.mergeGroupGeometries(rowGroup);

  if (mergedGeo) {
    console.log('Merged Geometry:', mergedGeo);
    const result = GeometryUtils.isManifold(mergedGeo);
    console.log('Manifold Check Result:', result);

    if (result.isManifold) {
      console.log('✅ SUCCESS: The row mesh is a closed manifold.');
    } else {
      console.error('❌ FAILURE: The row mesh is NOT manifold.');
      console.error('Reason:', result.message);
    }
  } else {
    console.error('Failed to merge geometries.');
  }
  console.log('------------------------------------');
}
