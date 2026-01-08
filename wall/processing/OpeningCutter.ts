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
  mesh: THREE.Mesh;                    // The snapped + oversized opening mesh (used for CSG)
  originalMesh?: THREE.Mesh;           // The original opening mesh (for red visualization, optional for cutter)
  snappedVisMesh?: THREE.Mesh;         // The snapped visualization mesh (for blue visualization, optional for cutter)
  lintelMesh: THREE.Mesh | null;
  intersectsWall: boolean;
  snappedBounds?: {                    // Snapping information (optional for cutter)
    originalBottomY: number;
    originalTopY: number;
    snappedBottomY: number;
    snappedTopY: number;
    originalHeight: number;
    snappedHeight: number;
  } | null;
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
 * Main entry point: Cuts openings and lintels from wall components.
 *
 * CSG Flow:
 * 1. Creates a CSG session to manage boolean operations
 * 2. (ACTIVE) Subtracts opening meshes from the top infill (encunhamento)
 * 3. (ACTIVE) Clips lintels to wall bounds and subtracts other openings
 * 4. For each row:
 *    - (DISABLED) Subtracts opening meshes from row geometry
 *    - (ACTIVE) Subtracts lintel meshes from row geometry
 * 5. (Deprecated) Clips all components to wall bounds
 *
 * Opening cutting from rows is disabled (handled by bounds-clamping in RowGenerator).
 *
 * All subtract operations use a mesh as the "tool" to carve out
 * material from the target mesh (infill or row).
 */
export function cutOpenings(ctx: OpeningCutterContext): void {
  // Create a CSG session - this wraps three-bvh-csg operations
  // and provides a clean API for boolean operations
  const csg = createSession();

  // Extract row meshes from the wall group (named "RowMesh0", "RowMesh1", etc.)
  const rowMeshes = getRowMeshes(ctx.wallGroup);

  // Phase 1: Cut openings from infill (top gap fill)
  // The infill sits at the top of the wall, filling the gap between
  // the last row of blocks and the wall's target height
  if (ctx.infillMesh && ctx.openingDataList.length > 0) {
    cutFromInfill(csg, ctx.infillMesh, ctx.openingDataList);
  }

  // Phase 2: Clip lintels to wall bounds and subtract other openings
  // - Intersection with wall bounds clips lintel to wall edges
  // - Subtraction of original openings (not oversized) removes overlap with other openings
  if (ctx.lintelMeshes.length > 0) {
    processLintels(csg, ctx.lintelMeshes, ctx.openingDataList, ctx);
  }

  // Phase 3: Cut openings and lintels from each row
  // This is the main CSG work - each row may be cut by multiple openings
  // and multiple lintels depending on vertical overlap
  if (rowMeshes.length > 0) {
    cutFromAllRows(csg, rowMeshes, ctx);
  }

  // Phase 4: Clip to wall bounds (currently disabled)
  // Was used to trim geometry to exact wall dimensions via CSG intersection,
  // but now replaced by bounds-clamping approach in RowGenerator
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
  console.log(`[OpeningCutter] Processing ${lintelMeshes.length} lintel(s) with CSG`);

  // Create wall bounds mesh for intersection (clips lintels to wall edges)
  const wallBoundsMesh = createBoundsMesh(
    ctx.wallWidth,
    ctx.wallHeight,
    ctx.wallLength * 1.2,  // Slightly larger depth to ensure clean cuts
    0  // Centered at origin Y
  );

  for (let i = 0; i < lintelMeshes.length; i++) {
    const lintelMesh = lintelMeshes[i];

    // Find which opening this lintel belongs to
    const ownOpeningData = openingDataList.find(d => d.lintelMesh === lintelMesh);

    // 1. Intersect with wall bounds (clips lintel to wall edges)
    csg.intersect(lintelMesh, wallBoundsMesh, {
      logPrefix: `Lintel ${i} wall clip`
    });

    // 2. Subtract OTHER openings (not the one this lintel belongs to)
    // Use originalMesh (not oversized mesh) for subtraction
    for (const data of openingDataList) {
      // Skip if this is the opening that owns this lintel
      if (data === ownOpeningData) continue;
      // Skip if no original mesh available
      if (!data.originalMesh) continue;
      // Skip if opening doesn't intersect wall
      if (!data.intersectsWall) continue;

      // Check if this opening intersects with the lintel horizontally
      const intersecting = filterIntersecting(lintelMesh, [{ ...data, mesh: data.originalMesh }]);
      if (intersecting.length > 0) {
        console.log(`[OpeningCutter] Lintel ${i}: Subtracting opening`);
        csg.subtract(lintelMesh, data.originalMesh, {
          logPrefix: `Lintel ${i} opening subtract`
        });
      }
    }
  }

  // Clean up bounds mesh
  wallBoundsMesh.geometry.dispose();
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

  // DISABLED: Opening cutting from rows - only lintel cutting remains active
  // Find openings that intersect this row (using actual mesh bounds, not original params)
  // This accounts for openings that have been extended to wall top
  // const openingDataForRow = ctx.openingDataList.filter(data => {
  //   if (!data.intersectsWall) return false;
  //   const meshBounds = getMeshYBounds(data.mesh);
  //   return yRangesOverlap(rowBounds, meshBounds);
  // });

  // Cut openings from row using CSG subtraction
  // The opening mesh acts as the "tool" that carves material from the row
  // if (openingDataForRow.length > 0) {
  //   for (const openingData of openingDataForRow) {
  //     csg.subtract(rowMesh, openingData.mesh, {
  //       logPrefix: `Row ${rowIndex} opening`,
  //       preserveGroups: true,
  //       remapMaterialIndex: { from: 2, to: 1 }
  //     });
  //   }
  // }

  // ACTIVE: Lintel cutting from rows
  // Find lintels that intersect this row (uses getMeshYBounds from GeometryMerger)
  const lintelsForRow = ctx.openingDataList.filter(data => {
    if (!data.lintelMesh) return false;
    const lintelBounds = getMeshYBounds(data.lintelMesh);
    return yRangesOverlap(rowBounds, lintelBounds);
  });

  // Cut lintels from row using CSG subtraction
  // The lintel mesh acts as the "tool" that carves space from the row
  // This creates the cavity where the lintel (verga) will sit above the opening
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
