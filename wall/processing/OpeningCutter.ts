/**
 * OpeningCutter - High-level orchestration for cutting openings from wall components.
 *
 * Responsibilities:
 * - Determine which openings intersect which components
 * - Orchestrate CSG operations via CsgOperations
 * - Clip components to wall bounds
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

// === Public Types ===

export interface OpeningData {
  opening: {
    placement: { position: { x: number; y: number; z: number } };
    size: { l: number; h: number; w: number };
  };
  mesh: THREE.Mesh;
  lintelMesh: THREE.Mesh | null;
  intersectsWall: boolean;
}

export interface OpeningCutterContext {
  wallGroup: THREE.Group;
  wallWidth: number;
  wallHeight: number;
  wallLength: number;
  blockWidth: number;
  blockHeight: number;
  cementThickness: number;
  actualWallWidth?: number;  // Optional - used by clipToWallBounds
  actualWallHeight?: number; // Optional - used by clipToWallBounds
  openings: Array<{
    placement: { position: { x: number; y: number; z: number } };
    size: { l: number; h: number; w: number };
  }>;
  openingDataList: OpeningData[];
  infillMesh: THREE.Mesh | null;
  lintelMeshes: THREE.Mesh[];
}

// === Public API ===

/**
 * Main entry point: Cuts all openings from wall components.
 */
export function cutOpenings(ctx: OpeningCutterContext): void {
  const csg = createSession();

  // Get row meshes from wall group
  const rowMeshes = getRowMeshes(ctx.wallGroup);

  // Cut openings from infill
  if (ctx.infillMesh && ctx.openingDataList.length > 0) {
    cutFromInfill(csg, ctx.infillMesh, ctx.openingDataList);
  }

  // Cut openings from lintels
  if (ctx.lintelMeshes.length > 0 && ctx.openingDataList.length > 0) {
    cutFromLintels(csg, ctx.lintelMeshes, ctx.openingDataList);
  }

  // Cut openings from rows
  if (rowMeshes.length > 0) {
    cutFromAllRows(csg, rowMeshes, ctx);
  }

  // Clip components to actual wall bounds
  clipToWallBounds(csg, ctx, rowMeshes);
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
  const intersecting = filterIntersecting(infillMesh, openingDataList.filter(d => d.intersectsWall));

  if (intersecting.length === 0) return;

  console.log(`[OpeningCutter] Infill: Cutting ${intersecting.length} opening(s)`);

  for (const data of intersecting) {
    csg.subtract(infillMesh, data.mesh, {
      logPrefix: 'Infill opening',
      remapMaterialIndex: { from: 2, to: 1 }
    });
  }
}

function cutFromLintels(
  csg: CsgSession,
  lintelMeshes: THREE.Mesh[],
  openingDataList: OpeningData[]
): void {
  console.log(`[OpeningCutter] Processing ${lintelMeshes.length} lintel(s)`);

  for (let i = 0; i < lintelMeshes.length; i++) {
    const lintelMesh = lintelMeshes[i];
    const intersecting = filterIntersecting(lintelMesh, openingDataList.filter(d => d.intersectsWall));

    if (intersecting.length === 0) continue;

    console.log(`[OpeningCutter] Lintel ${i}: Cutting ${intersecting.length} opening(s)`);

    for (const data of intersecting) {
      csg.subtract(lintelMesh, data.mesh, {
        logPrefix: `Lintel ${i}`,
        remapMaterialIndex: { from: 1, to: 0 }
      });
    }
  }
}

function cutFromAllRows(
  csg: CsgSession,
  rowMeshes: THREE.Mesh[],
  ctx: OpeningCutterContext
): void {
  console.log(`[OpeningCutter] Processing ${rowMeshes.length} row(s)`);

  for (let rowIndex = 0; rowIndex < rowMeshes.length; rowIndex++) {
    const rowMesh = rowMeshes[rowIndex];
    cutFromRow(csg, rowMesh, rowIndex, ctx);
  }
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

  // Find openings that intersect this row (using actual mesh bounds, not original params)
  // This accounts for openings that have been extended to wall top
  const openingDataForRow = ctx.openingDataList.filter(data => {
    if (!data.intersectsWall) return false;
    const meshBounds = getMeshYBounds(data.mesh);
    return yRangesOverlap(rowBounds, meshBounds);
  });

  // Cut openings
  if (openingDataForRow.length > 0) {
    for (const openingData of openingDataForRow) {
      csg.subtract(rowMesh, openingData.mesh, {
        logPrefix: `Row ${rowIndex} opening`,
        preserveGroups: true,
        remapMaterialIndex: { from: 2, to: 1 }
      });
    }
  }

  // Find lintels that intersect this row (uses getMeshYBounds from GeometryMerger)
  const lintelsForRow = ctx.openingDataList.filter(data => {
    if (!data.lintelMesh) return false;
    const lintelBounds = getMeshYBounds(data.lintelMesh);
    return yRangesOverlap(rowBounds, lintelBounds);
  });

  // Cut lintels from row
  if (lintelsForRow.length > 0) {
    for (const data of lintelsForRow) {
      if (!data.lintelMesh) continue;
      csg.subtract(rowMesh, data.lintelMesh, {
        logPrefix: `Row ${rowIndex} lintel`
      });
    }
  }
}

function clipToWallBounds(
  csg: CsgSession,
  ctx: OpeningCutterContext,
  rowMeshes: THREE.Mesh[]
): void {
  // if (ctx.actualWallWidth <= 0 || ctx.actualWallHeight <= 0) return;

  // // Create bounds mesh (uses createBoundsMesh from GeometryMerger)
  // const positionY = -ctx.wallHeight / 2 + ctx.actualWallHeight / 2;
  // const boundsMesh = createBoundsMesh(
  //   ctx.actualWallWidth,
  //   ctx.actualWallHeight,
  //   ctx.wallLength * 1.2,
  //   positionY
  // );

  // // Clip rows to bounds (horizontal cut)
  // for (let i = 0; i < rowMeshes.length; i++) {
  //   csg.intersect(rowMeshes[i], boundsMesh, {
  //     logPrefix: `Row ${i} bounds clip`,
  //     preserveGroups: true,
  //     remapMaterialIndex: { from: 2, to: 1 }
  //   });
  // }

  // // Clip infill to bounds
  // if (ctx.infillMesh) {
  //   csg.intersect(ctx.infillMesh, boundsMesh, {
  //     logPrefix: 'Infill bounds clip'
  //   });
  // }

  // // Clip lintels to bounds
  // for (let i = 0; i < ctx.lintelMeshes.length; i++) {
  //   csg.intersect(ctx.lintelMeshes[i], boundsMesh, {
  //     logPrefix: `Lintel ${i} bounds clip`
  //   });
  // }

  // // Clean up bounds mesh
  // boundsMesh.geometry.dispose();
}

// === Pure Math Helpers ===

/**
 * Calculates Y-axis bounds for a specific row.
 * Pure arithmetic - no THREE.js dependencies.
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
