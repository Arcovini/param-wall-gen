/**
 * OpeningCutter - High-level orchestration for cutting openings from wall components.
 *
 * Responsibilities:
 * - Determine which openings intersect which components
 * - Orchestrate CSG operations via CsgOperations
 *
 * Does NOT directly use THREE.js or three-bvh-csg - delegates to utils.
 */

import type * as THREE from 'three';
import { createSession, type CsgSession } from '../../utils/csg/CsgOperations';
import {
  filterIntersecting,
  yRangesOverlap,
  getMeshYBounds,
  createBoundsMesh
} from '../../utils/geometry/GeometryMerger';
import type { OpeningData } from '../OpeningGenerator';

export interface OpeningCutterContext {
  wallGroup: THREE.Group;
  wallWidth: number;
  wallHeight: number;
  wallLength: number;
  blockHeight: number;
  cementThickness: number;
  openingDataList: OpeningData[];
  infillMesh: THREE.Mesh | null;
  lintelMeshes: THREE.Mesh[];
}

// === Public API ===

/**
 * Main entry point: Cuts openings and lintels from wall components.
 *
 * CSG Flow:
 * 1. Subtracts opening meshes from the top infill (encunhamento)
 * 2. Clips lintels to wall bounds and subtracts other openings
 * 3. Subtracts lintel meshes from row geometry
 *
 * Note: Opening cutting from rows is handled by bounds-clamping in RowGenerator (no CSG needed).
 */
export function cutOpenings(ctx: OpeningCutterContext): void {
  const csg = createSession();
  const rowMeshes = getRowMeshes(ctx.wallGroup);

  if (ctx.infillMesh && ctx.openingDataList.length > 0) {
    cutFromInfill(csg, ctx.infillMesh, ctx.openingDataList);
  }

  if (ctx.lintelMeshes.length > 0) {
    processLintels(csg, ctx.lintelMeshes, ctx.openingDataList, ctx);
  }

  if (rowMeshes.length > 0) {
    cutFromAllRows(csg, rowMeshes, ctx);
  }
}

// === Internal Functions ===

function getRowMeshes(wallGroup: THREE.Group): THREE.Mesh[] {
  return wallGroup.children.filter(
    (child): child is THREE.Mesh =>
      (child as THREE.Mesh).isMesh && child.name?.startsWith('RowMesh')
  );
}

function cutFromInfill(
  csg: CsgSession,
  infillMesh: THREE.Mesh,
  openingDataList: OpeningData[]
): void {
  // snappedVisMesh is extended to wall top when lintel would overlap infill
  const openingsWithSnappedVis = openingDataList
    .filter(d => d.intersectsWall && d.snappedVisMesh)
    .map(d => ({ ...d, mesh: d.snappedVisMesh! }));

  const intersecting = filterIntersecting(infillMesh, openingsWithSnappedVis);
  if (intersecting.length === 0) return;

  console.log(`[OpeningCutter] Infill: Cutting ${intersecting.length} opening(s)`);

  for (const data of intersecting) {
    csg.subtract(infillMesh, data.mesh, {
      logPrefix: 'Infill opening',
      remapMaterialIndex: { from: 2, to: 1 }
    });
  }
}

/**
 * Processes lintels with CSG operations:
 * 1. Intersects each lintel with wall bounds (clips to wall edges)
 * 2. Subtracts other openings (original, not oversized) to remove overlap
 */
function processLintels(
  csg: CsgSession,
  lintelMeshes: THREE.Mesh[],
  openingDataList: OpeningData[],
  ctx: OpeningCutterContext
): void {
  console.log(`[OpeningCutter] Processing ${lintelMeshes.length} lintel(s)`);

  const wallBoundsMesh = createBoundsMesh(
    ctx.wallWidth,
    ctx.wallHeight,
    ctx.wallLength * 1.2,
    0
  );

  lintelMeshes.forEach((lintelMesh, i) => {
    const ownOpeningData = openingDataList.find(d => d.lintelMesh === lintelMesh);

    csg.intersect(lintelMesh, wallBoundsMesh, {
      logPrefix: `Lintel ${i} wall clip`
    });

    // Subtract OTHER openings (not the one this lintel belongs to)
    for (const data of openingDataList) {
      if (data === ownOpeningData || !data.originalMesh || !data.intersectsWall) {
        continue;
      }

      const intersecting = filterIntersecting(lintelMesh, [{ ...data, mesh: data.originalMesh }]);
      if (intersecting.length > 0) {
        console.log(`[OpeningCutter] Lintel ${i}: Subtracting opening`);
        csg.subtract(lintelMesh, data.originalMesh, {
          logPrefix: `Lintel ${i} opening subtract`
        });
      }
    }
  });

  wallBoundsMesh.geometry.dispose();
}

function cutFromAllRows(
  csg: CsgSession,
  rowMeshes: THREE.Mesh[],
  ctx: OpeningCutterContext
): void {
  console.log(`[OpeningCutter] Processing ${rowMeshes.length} row(s)`);
  rowMeshes.forEach((rowMesh, rowIndex) => cutFromRow(csg, rowMesh, rowIndex, ctx));
}

function cutFromRow(
  csg: CsgSession,
  rowMesh: THREE.Mesh,
  rowIndex: number,
  ctx: OpeningCutterContext
): void {
  const rowBounds = getRowYBounds(
    rowIndex,
    ctx.wallHeight,
    ctx.blockHeight,
    ctx.cementThickness
  );

  // Find lintels that vertically intersect this row
  const lintelsForRow = ctx.openingDataList.filter(data => {
    if (!data.lintelMesh) return false;
    const lintelBounds = getMeshYBounds(data.lintelMesh);
    return yRangesOverlap(rowBounds, lintelBounds);
  });

  // Cut lintel cavities from the row
  for (const data of lintelsForRow) {
    csg.subtract(rowMesh, data.lintelMesh!, {
      logPrefix: `Row ${rowIndex} lintel`
    });
  }
}

/**
 * Calculates Y-axis bounds for a specific row (pure arithmetic).
 */
function getRowYBounds(
  rowIndex: number,
  wallHeight: number,
  blockHeight: number,
  cementThickness: number
): { min: number; max: number } {
  const rowHeight = blockHeight + cementThickness;
  const rowCenterY = -wallHeight / 2 + rowIndex * rowHeight + blockHeight / 2;
  return {
    min: rowCenterY - rowHeight / 2,
    max: rowCenterY + rowHeight / 2
  };
}
