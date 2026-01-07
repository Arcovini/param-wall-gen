# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A TypeScript/Three.js web application for generating 3D parametric masonry walls with ceramic blocks and cement joints. Supports customizable wall dimensions, openings (doors/windows) with automatic lintels, construction completion simulation, and interactive 3D visualization.

## Commands

```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript and build production bundle
npm run preview  # Preview production build locally
```

No test framework is configured. Manual testing uses predefined scenarios via UI buttons (defined in `utils/test-scenarios.ts`).

## Architecture

### Builder Pattern Flow

Wall generation uses a fluent builder pattern in `wall/builders/WallBuilder.ts`:

```typescript
buildMasonryWall(params)
  .parseParameters()
  .generateBaseWall()
  .addInfill()
  .createOpenings()
  .applyCsgOperations()
  .shiftToBottomLeftPivot()
  .addMetadata()
  .build();
```

### Core Components

- **`buildMasonryWall.ts`** - Main API entry point, accepts `BuildMasonryWallParams` and returns `THREE.Group`
- **`index.ts`** - Application initialization, wires SceneRenderer + UIController + UploadConfiguration
- **`core/SceneRenderer.ts`** - Three.js scene/camera/renderer/post-processing management
- **`ui/UIController.ts`** - Bridges DOM controls to wall generation logic

### Specialized Generators (wall/)

- `BlockGenerator.ts` - Individual block geometry creation
  - `addBlockToBuilder(xLeft, brickWidth, depth, cementWidth, ...)` - Adds block with variable dimensions
  - Supports partial blocks (variable brick/cement widths for edge blocks)
  - When `cementWidth = 0`, returns brick edge vertices for sharing
- `RowGenerator.ts` - Row layout using bounds-clamping approach
  - `createRowGeometry()` - Builds row with partial blocks at edges (no CSG needed)
  - `addRowEndCaps()` - Creates side caps with proper UVs and materials (brick on bottom, cement on top)
- `OpeningGenerator.ts` - Door/window openings
- `LintelGenerator.ts` - Structural elements above openings
- `InfillGenerator.ts` - Top infill blocks (encunhamento)
- `MaterialManager.ts` - PBR materials for masonry textures (singleton pattern)
- `WallPlacement.ts` - Spatial transformations

### Opening Processing (wall/processing/)

- `OpeningCutter.ts` - High-level orchestration for cutting openings from wall components. Does not use THREE.js or three-bvh-csg directly — delegates to utils.
  - `cutOpenings()` - Main entry point for CSG operations on wall components
  - `clipToWallBounds()` - Clips geometry to actual wall dimensions (currently being restructured)

### Geometry Utilities (utils/geometry/)

- `GeometryBuilder.ts` - Construction primitives: `addVertex`, `addQuad`, `build` for BufferGeometry
- `GeometryMerger.ts` - Merging geometries + spatial queries: `mergeGroupGeometries`, `filterIntersecting`, `getMeshYBounds`, `createBoundsMesh`

### CSG Utilities (utils/csg/)

- `CsgOperations.ts` - Clean CSG API via `createSession()` returning `CsgSession` with `subtract`, `subtractMany`, `intersect` methods. Hides three-bvh-csg internals.
- `CsgValidator.ts` - Manifold validation: `isManifold`, `isManifoldWithBVH`

## Refactoring Goals

### Completed

- ✅ Extracted `GeometryBuilder` for shared vertex/quad construction
- ✅ Separated CSG operations into clean layers (CsgOperations, CsgValidator)
- ✅ Created `OpeningCutter` as high-level orchestrator (no direct THREE.js/CSG imports)
- ✅ Organized utils into `geometry/` and `csg/` subfolders
- ✅ Fixed row end caps with dedicated vertices, proper UVs, and correct materials (brick/cement)
- ✅ Implemented bounds-clamping approach for row generation (replaces CSG intersection for wall width)

### Remaining

- **Long functions**: `SceneRenderer` constructor (110 lines)
- **SRP violations**: `UIController` (5 responsibilities), `UploadConfiguration` (4 responsibilities)
- **Unclear naming**: `actualWallWidth` vs `wallWidth`, `completion` semantic unclear
- **Tight coupling**: Hard-coded DOM IDs in UIController, direct instantiation in WallBuilder
- **Cleanup**: Remove deprecated `clipToWallBounds()` from OpeningCutter (no longer needed)

## Key Technical Details

- **CSG Library**: Uses `three-bvh-csg` for boolean operations (not ThreeCSG or other alternatives)
- **Post-processing**: Uses `postprocessing` library with N8AO ambient occlusion (`n8ao` package)
- **Wall pivot**: Walls are shifted to bottom-left corner as origin point
- **JSON Config**: Wall configurations can be imported/exported via `core/UploadConfiguration.ts`

## Type Definitions

- `types.ts` - Core type definitions including `BuildMasonryWallParams`, opening types
- `types/n8ao.d.ts` - Type declarations for the n8ao package
