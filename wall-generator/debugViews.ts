/**
 * Public debug views for block/row preview (no internal imports from UI).
 * Used by app and SceneUtils for view modes 'block' and 'row'.
 */

import * as THREE from 'three';
import { BlockGenerator } from './internal/BlockGenerator';
import { RowGenerator } from './internal/RowGenerator';
import { GeometryBuilder, rawToBufferGeometry } from './internal/utils/GeometryBuilder';

export interface DebugViewParams {
  blockWidth: number;
  blockHeight: number;
  wallLength: number;
  cementThickness: number;
  actualWallWidth?: number;
}

/**
 * Creates a THREE.Group for block or row preview. Public API for UI; keeps internal modules inside wall-generator.
 */
export function createDebugViewVisualization(
  mode: 'block' | 'row',
  params: DebugViewParams
): THREE.Group {
  const group = new THREE.Group();
  group.name = `ViewMode_${mode}`;

  const blockGenerator = new BlockGenerator();

  if (mode === 'block') {
    const builder = new GeometryBuilder();
    const { blockWidth, blockHeight, wallLength, cementThickness } = params;

    const totalHeight = blockHeight + cementThickness;
    const halfTotalHeight = totalHeight / 2;
    const yBottom = -halfTotalHeight;
    const yTopBrick = -halfTotalHeight + blockHeight;
    const yTopCement = halfTotalHeight;

    const xLeft = -blockWidth / 2;
    const xRight = xLeft + blockWidth + cementThickness;
    const halfDepth = wallLength / 2;
    const zFront = halfDepth;
    const zBack = -halfDepth;

    blockGenerator.addBlockToBuilder(
      builder, xLeft, blockWidth, wallLength, cementThickness,
      0, 1, yBottom, yTopBrick, yTopCement
    );

    const lb0 = builder.addVertex(xLeft, yBottom, zBack, 0, 0);
    const lb1 = builder.addVertex(xLeft, yBottom, zFront, 1, 0);
    const lb2 = builder.addVertex(xLeft, yTopBrick, zFront, 1, 1);
    const lb3 = builder.addVertex(xLeft, yTopBrick, zBack, 0, 1);
    builder.addQuad(lb0, lb1, lb2, lb3, false);

    const lc0 = builder.addVertex(xLeft, yTopBrick, zBack, 0, 0);
    const lc1 = builder.addVertex(xLeft, yTopBrick, zFront, 1, 0);
    const lc2 = builder.addVertex(xLeft, yTopCement, zFront, 1, 1);
    const lc3 = builder.addVertex(xLeft, yTopCement, zBack, 0, 1);
    builder.addQuad(lc0, lc1, lc2, lc3, true);

    const rb0 = builder.addVertex(xRight, yBottom, zFront, 0, 0);
    const rb1 = builder.addVertex(xRight, yBottom, zBack, 1, 0);
    const rb2 = builder.addVertex(xRight, yTopBrick, zBack, 1, 1);
    const rb3 = builder.addVertex(xRight, yTopBrick, zFront, 0, 1);
    builder.addQuad(rb0, rb1, rb2, rb3, false);

    const rc0 = builder.addVertex(xRight, yTopBrick, zFront, 0, 0);
    const rc1 = builder.addVertex(xRight, yTopBrick, zBack, 1, 0);
    const rc2 = builder.addVertex(xRight, yTopCement, zBack, 1, 1);
    const rc3 = builder.addVertex(xRight, yTopCement, zFront, 0, 1);
    builder.addQuad(rc0, rc1, rc2, rc3, true);

    const blockGeo = rawToBufferGeometry(builder.buildRaw());
    const materials = [
      blockGenerator.getBrickMaterial(),
      blockGenerator.getCementMaterial()
    ];
    const blockMesh = new THREE.Mesh(blockGeo, materials);
    blockMesh.castShadow = true;
    blockMesh.receiveShadow = true;
    blockMesh.name = 'SingleBlock';
    group.add(blockMesh);
  } else {
    const actualWidth = params.actualWallWidth ?? params.blockWidth * 8 + params.cementThickness * 7;
    const rowGroup = RowGenerator.createRow(
      blockGenerator,
      actualWidth,
      params.wallLength,
      params.blockWidth,
      params.blockHeight,
      params.cementThickness
    );
    rowGroup.name = 'SingleRow';
    group.add(rowGroup);
  }

  return group;
}
