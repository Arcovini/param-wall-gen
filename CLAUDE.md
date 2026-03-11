# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**IMPORTANT**: Update this file whenever making relevant architectural changes, bug fixes, or adding new features. Keep documentation in sync with the codebase.

## Project Overview

A TypeScript/Three.js web application for generating 3D parametric masonry walls with ceramic blocks and cement joints. Supports customizable wall dimensions, openings (doors/windows) with automatic lintels, construction completion simulation, and interactive 3D visualization.

## Commands

```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript and build production bundle
npm run preview  # Preview production build locally
```

No test framework is configured. Manual testing uses predefined scenarios via UI buttons (defined in `ui/test-scenarios.ts`).

## Architecture

### Builder Pattern Flow

Wall generation uses a fluent builder pattern in `wall-generator/builders/WallBuilder.ts`:

```typescript
buildMasonryWall(params)
  .parseParameters()
  .precomputeOpeningBounds()
  .generateBaseWall()
  .addWallTopCap()
  .addInfill()
  .createOpenings()
  .applyCsgOperations()
  .addMetadata()
  .build();
```

### Core Components

- **`buildMasonryWall.ts`** - Internal geometry builder, accepts `BuildMasonryWallParams` and returns `THREE.Group` (not exported publicly; called by `createInstance`)
- **`index.ts`** - Application initialization, wires SceneRenderer + UIController + UploadConfiguration
- **`core/SceneRenderer.ts`** - Three.js scene/camera/renderer/post-processing management
- **`ui/`** - UI controllers and utilities (see UI Components section below)

### Specialized Generators (wall-generator/)

- `BlockGenerator.ts` - Individual block geometry creation
  - `addBlockToBuilder(xLeft, brickWidth, depth, cementWidth, ...)` - Adds block with variable dimensions
  - Supports partial blocks (variable brick/cement widths for edge blocks)
  - When `cementWidth = 0`, returns brick edge vertices for sharing
- `RowGenerator.ts` - Row layout using bounds-clamping approach
  - `createRowGeometry()` - Builds row with partial blocks at edges (no CSG needed)
  - `addRowEndCaps()` - Creates side caps at wall edges with proper UVs and materials (brick on bottom, cement on top)
  - `addSingleSideCap()` - Creates side caps at opening edges when blocks are clamped by openings
  - `createWallTopCap()` - Creates horizontal cap at top of completed wall showing brick+cement pattern
  - **Opening side caps logic** (see detailed section below)
- `OpeningGenerator.ts` - Door/window openings
  - `createOpeningBottomCap()` - Creates sill (bottom cap) showing brick+cement pattern aligned with row below
- `LintelGenerator.ts` - Structural elements above openings
- `InfillGenerator.ts` - Top infill blocks (encunhamento)
- `MaterialManager.ts` - PBR materials for masonry textures (singleton pattern)
- `WallPlacement.ts` - Spatial transformations

### Opening Processing (wall-generator/processing/)

- `OpeningCutter.ts` - High-level orchestration for cutting openings from wall components
  - `cutOpenings()` - Main entry point for CSG operations on wall components
  - Contains geometry utilities: `filterIntersecting`, `yRangesOverlap`, `getMeshYBounds`, `createBoundsMesh`

### Utilities (wall-generator/internal/utils/)

- `GeometryBuilder.ts` - Construction primitives: `addVertex`, `addQuad`, `build` for BufferGeometry
- `CsgOperations.ts` - Clean CSG API via `createSession()` returning `CsgSession` with `subtract`, `intersect` methods. Hides three-bvh-csg internals.

### UI Components (ui/)

- `UIController.ts` - Bridges DOM controls to wall generation logic
- `WallVisualizer.ts` - Visualization helpers for wall placeholders and opening meshes
- `SceneUtils.ts` - Scene utilities: wireframe mode, floor creation, view mode visualization
- `test-scenarios.ts` - Predefined test scenarios for manual testing

## Refactoring Goals

### Completed

- ✅ Extracted `GeometryBuilder` for shared vertex/quad construction
- ✅ Separated CSG operations into clean `CsgOperations` module
- ✅ Created `OpeningCutter` as high-level orchestrator with inlined geometry utilities
- ✅ Simplified utils folder structure (flat, no subfolders)
- ✅ Fixed row end caps with dedicated vertices, proper UVs, and correct materials (brick/cement)
- ✅ Implemented bounds-clamping approach for row generation (replaces CSG intersection for wall width)
- ✅ Added opening caps: side caps in RowGenerator (at opening edges) and bottom cap (sill) in OpeningGenerator
- ✅ Fixed wall end caps to use fixed wall bounds (rowLeft/rowRight) instead of variable block positions
- ✅ Fixed opening side caps staircase pattern by ensuring caps at consistent positions
- ✅ Added block extension logic to fill gaps in front/back faces at opening edges (due to brick stagger pattern)
- ✅ Added multi-opening safety checks to prevent block extension conflicts
- ✅ Added wall top cap showing brick+cement pattern at top of completed wall (RowGenerator.createWallTopCap)
- ✅ Fixed lintel visibility check to use snapped bounds instead of original opening parameters
- ✅ Removed `actualWallWidth`/`actualWallHeight` and `pivotOffset` from returned group's `userData`; test app computes actual dimensions locally for placeholders.
- ✅ Privatized `buildMasonryWall` (no longer exported from `wall-generator/index.ts`); single public entry point is `createInstance(ifcElement?, params?)`.
- ✅ Fixed `objectType` consistency: `createInstance` now always sets `objectType: 'SolidWall'` (previously builds returned `'MasonryWall'` from builder while empty returns used `'SolidWall'`).
- ✅ **Rendering pipeline (DEC-A3)**: `geometry-description/` (types), `engine-adapter/three-js-adapter` (create, updateInstance, dispose from descriptor), `basic-generator` (triangle). Column uses DEC-A3 only: `ColumnGeometryBuilder` → `GeometryDescriptor` → `ThreeAdapter.create`; style/dispose via generic `engine-adapter/three-js-adapter`; single "Column" option in UI; `ThreeSolidColumnAdapter` removed.

### Remaining

- **Long functions**: `SceneRenderer` constructor (110 lines)
- **SRP violations**: `UIController` (5 responsibilities), `UploadConfiguration` (4 responsibilities)
- **Unclear naming**: `actualWallWidth` vs `wallWidth`, `completion` semantic unclear
- **Tight coupling**: Hard-coded DOM IDs in UIController, direct instantiation in WallBuilder

## Key Technical Details

- **CSG Library**: Uses `three-bvh-csg` for boolean operations (not ThreeCSG or other alternatives)
- **Post-processing**: Uses `postprocessing` library with N8AO ambient occlusion (`n8ao` package)
- **Wall origin**: Group origin is at the wall centroid (center); geometry is built in center space
- **JSON Config**: Wall configurations can be imported/exported via `core/UploadConfiguration.ts`
- **Bounds-clamping**: Row geometry fits exactly within `wallWidth` by clamping block positions to wall bounds and creating partial blocks at edges. No CSG intersection needed for wall width.
- **Returned group `userData`**: Public API fields: `objectType` (`'SolidWall'`), `id`, `typeId`, `constructionState`, `completionPercentage`, `taskIds`, `wall`, `openings`, `task`, `modelParams` (isWalkable, isCollidable, roles, keypoints, centroid), `bounds` (completed, execution, openings, openingsExpanded — all AABBs in world coordinates). Single public entry point is `createInstance(ifcElement?, params?)`; `buildMasonryWall` is internal. Local convention: origin at centroid; keypoints and bounds in center space (e.g. corners at ±halfWidth, ±halfHeight).

## Solid Wall API (wall-solid.md)

Public API in `wall-generator/SolidWall.ts` and `wall-generator/adapters/ThreeSolidWallAdapter.ts`.

**Fronteira do repositório:** Motor Syncker (tarefas, estados, grafo de dependências) e IFC completo ficam fora deste repositório. `createInstance` e `handleTaskStateChange` fornecem a interface (userData, ElementStyleUpdate) para integração com o motor.

### Type-level / factory (no instance required)

| Method | Status | Notes |
|--------|--------|-------|
| `createInstance(ifcElement?, params?)` | ✅ Working | Returns THREE.Group + userData (id, typeId, constructionState, completionPercentage, taskIds). Validates IFC (IfcWall/SOLIDWALL), extracts params, or uses params.buildParams. |
| `getPhysicalDependencyRules()` | ✅ Working | Returns static rules (BELOW, ABOVE, BESIDE, ADJACENT). |
| `getSimulationConfig()` | ✅ Working | Returns { roles, isWalkable, isCollidable }. |
| `getStochasticParams()` | ✅ Working | Returns §11 stochastic params table. |
| `selectMaterials(seed, elementId?)` | ✅ Working | Returns { main, finish }; wired to build via CreateInstanceParams.materialSeed. |
| `handleTaskStateChange(instance, taskState)` | ✅ Working | Returns ElementStyleUpdate. |

### Instance getters (accept group with SolidWall userData)

| Method | Status | Notes |
|--------|--------|-------|
| `getCompletedBoundingBox(instance)` | ✅ Working | Reads userData.bounds.completed. |
| `getExecutionStateBoundingBox(instance)` | ✅ Working | Reads userData.bounds.execution. |
| `getOpeningBoundingBoxes(instance)` | ✅ Working | Reads userData.bounds.openings. |
| `getExpandedOpeningBoundingBoxes(instance)` | ✅ Working | Reads userData.bounds.openingsExpanded. |
| `getCentroid(instance)` | ✅ Working | Reads userData.modelParams.centroid (local). |
| `getCentroidWorld(instance)` | ✅ Working | Centroide em coordenadas de mundo (placement aplicado). |
| `getKeyPoints(instance)` | ✅ Working | Computes full keypoints map (incl. OPENING_CENTER_n). |
| `getKeyPointsWorld(instance)` | ✅ Working | Key points em coordenadas de mundo. |

### Adapter (ThreeSolidWallAdapter)

| Method | Status | Notes |
|--------|--------|-------|
| `updateInstance(group, styleUpdate)` | ✅ Working | Applies opacity; visibleHeight → clipPlane; highlightColor → material.emissive; outlineColor/outlineWidth in userData for consumer outline pass. |
| `dispose(instance)` | ✅ Working | Disposes geometry, materials, textures. |

App creates wall via `createInstance(undefined, { buildParams })` in `index.ts`. No SolidWallInstance class; instance = THREE.Group with SolidWallUserData.

## Type Definitions

- `types.ts` - Core type definitions including `BuildMasonryWallParams`, opening types
- `types/n8ao.d.ts` - Type declarations for the n8ao package

## Documentation Style

When explaining code changes or architectural decisions, use ASCII diagrams and data flow representations:

### ASCII Diagrams for Structures

```
Row Structure (from bottom to top):
┌─────────────────────────┐ ← Block top
│         BLOCK           │  blockHeight
├─────────────────────────┤ ← Block bottom
│        CEMENT           │  cementThickness
└─────────────────────────┘
```

### Before/After Comparisons

```
Before (bug):                After (fix):
    ┌───────┐                    ┌───────┐  ← Expanded
    │       │                    │       │
    │       │         →          │       │
    │       │                    │       │
    └───────┘                    └───────┘  ← Expanded
       ↓ ↑                     Only expands outward
   Both moved in
```

### Data Flow Diagrams

```
Opening Parameters
       ↓
createOriginalMesh()        → RED visualization (exact params)
       ↓
snapToRowBoundaries()       → Calculate snapped bounds
       ↓
createSnappedVisMesh()      → BLUE visualization (snapped + extended if lintel overlaps infill)
       ↓
createOpeningMesh()         → CSG mesh (oversized 1.05x for cutting rows)
```

### Opening Mesh Types

Three mesh types are created for each opening in `OpeningGenerator.processAllOpenings()`:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           OPENING MESH TYPES                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. originalMesh (RED)           2. snappedVisMesh (BLUE)                   │
│  ────────────────────            ─────────────────────────                   │
│  • Exact user params             • Snapped to row boundaries                 │
│  • size.l × size.h × size.w      • Extended to wall top (+0.01 buffer)      │
│  • Position from params            when lintelTop > infillBaseY             │
│  • NO snapping                   • Used for infill CSG subtraction          │
│  • NO extension                  • NO oversizing                            │
│  • NO oversizing                                                            │
│                                                                              │
│  3. data.mesh (CSG)                                                         │
│  ──────────────────                                                         │
│  • Snapped to rows                                                          │
│  • Extended to wall top (same condition as snappedVisMesh)                  │
│  • OVERSIZED (1.05x) for clean CSG cuts                                     │
│  • Used for row CSG subtraction                                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

Extension Condition:
  snappedTopY + lintelHeight > infillBaseY
  (where lintelHeight = blockHeight / 2)

When extended:
  - Opening extends to wallHeight/2 + 0.01 (small buffer for clean CSG)
  - Lintel is NOT created (skipped via isOpeningExtendedToTop check)
  - snappedVisMesh cuts the infill via CSG subtraction
```

### Visual Comparison (Extension)

```
User specifies opening near top of wall:

                        Wall Top (wallHeight/2)
                        ┌────────────────────────────────────────┐
                        │              INFILL                    │
─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ├─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┤─ infillBaseY
                        │            ┌───────┐ ← BLUE extends   │
    lintelTop ──────────│─ ─ ─ ─ ─ ─ │       │   to wall top    │
    (snappedTop+lintelH)│            │       │   (no lintel)    │
                        │      ┌─────│───────│─────┐            │
    snappedTopY ────────│──────│     │ BLUE  │     │────────────│
                        │      │ RED │       │     │            │
                        │      │     │       │     │            │
                        │      └─────│───────│─────┘            │
    snappedBottomY ─────│────────────└───────┘──────────────────│
                        └────────────────────────────────────────┘

Legend:
  RED  = originalMesh (exact user params, never extended)
  BLUE = snappedVisMesh (extended when lintelTop > infillBaseY)
```

### Visual Legends

```
Visualization Colors:
- RED (0xff0000)  = Original opening from parameters
- BLUE (0x0066ff) = Row-snapped opening (extended to wall top when lintel would overlap infill)
```

### Opening Cap Structure

```
Opening in Wall (cross-section view from side):
                    ┌─────────────────┐
                    │     LINTEL      │  ← LintelGenerator
                    ├─────────────────┤
                    │                 │
    Side Cap ────►  │    OPENING      │  ◄──── Side Cap (RowGenerator.addSingleSideCap)
    (brick+cement)  │                 │        Created when blocks are clamped by openings
                    ├─────────────────┤
                    │   BOTTOM CAP    │  ← OpeningGenerator.createOpeningBottomCap
                    │   (sill)        │    Shows brick+cement pattern aligned with row below
────────────────────┴─────────────────┴────────────────────
                         WALL

Side caps: Vertical faces (brick bottom, cement top) at opening left/right edges
Bottom cap: Horizontal faces (brick+cement joints) flush with opening bottom
Top cap: Not needed - lintels already cover the top of openings
```

### Opening Side Caps Algorithm (RowGenerator)

The opening side caps logic in `createRowGeometry()` handles several cases to ensure proper caps at opening edges:

```
Opening Bounds Clamping Cases:
┌─────────────────────────────────────────────────────────────────────────────┐
│ Case 1: Block overlaps opening                                              │
│ ─────────────────────────────────                                           │
│ • Block completely inside → skip (effectiveBrickRight = effectiveBrickLeft) │
│ • Block spans entire opening → keep left portion, clamp right to opening    │
│ • Block overlaps on right → clamp effectiveBrickRight to opening.left       │
│ • Block overlaps on left → clamp effectiveBrickLeft to opening.right        │
│                                                                              │
│ Case 2: Block just AFTER opening (within unitWidth)                         │
│ ─────────────────────────────────────────────────────                        │
│ • Extend effectiveBrickLeft back to opening.right                           │
│ • Fills gap in front/back faces between opening edge and block start        │
│ • Only if extension won't overlap another opening                           │
│                                                                              │
│ Case 3: Block just BEFORE opening (within unitWidth)                        │
│ ─────────────────────────────────────────────────────                        │
│ • Extend effectiveBrickRight (not cement!) to opening.left                  │
│ • Fills gap with brick texture (avoids ugly wide mortar joints)             │
│ • Only if extension won't overlap another opening                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Why block extension is needed:**

Due to brick stagger pattern, blocks in alternating rows may not naturally overlap an opening edge:

```
Row 0: Block naturally overlaps → clamped to opening edge ✓
Row 1: Block starts AFTER opening edge → GAP in front/back faces!

Opening edge: 0.45    Block starts: 0.46
             |        |
             |<--GAP->|  ← Missing front/back faces here!

Fix: Extend block left edge from 0.46 to 0.45
```

**Multi-opening safety:**

Before extending a block, check if extension would overlap another opening:

```typescript
const wouldOverlapOther = openingBounds.some(
  (other) =>
    other !== opening &&
    extendedLeft < other.right &&
    effectiveBrickRight > other.left,
);
if (!wouldOverlapOther) {
  // Safe to extend
}
```

**Missing caps fallback:**

After processing all blocks, check each opening edge for missing caps:

```typescript
for (const opening of openingBounds) {
  if (!cappedOpeningEdges.has(leftKey)) {
    addSingleSideCap(opening.left, ...);  // Add missing left cap
  }
  if (!cappedOpeningEdges.has(rightKey)) {
    addSingleSideCap(opening.right, ...); // Add missing right cap
  }
}
```

**Wall end caps:**

Wall end caps are added at fixed wall bounds (`rowLeft`/`rowRight`), NOT at variable block positions:

```typescript
// Only add if block touches wall bound AND wasn't clamped by an opening there
if (needLeftWallCap) {
  addSingleSideCap(rowLeft, ...);
}
if (needRightWallCap) {
  addSingleSideCap(rowRight, ...);
}
```
