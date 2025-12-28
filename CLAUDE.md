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
- `RowGenerator.ts` - Row layout with proper UV mapping
- `OpeningGenerator.ts` - Door/window openings
- `LintelGenerator.ts` - Structural elements above openings
- `InfillGenerator.ts` - Top infill blocks (encunhamento)
- `MaterialManager.ts` - PBR materials for masonry textures
- `WallPlacement.ts` - Spatial transformations

### CSG Operations (utils/)

- `CsgUtils.ts` - Low-level CSG helper functions using `three-bvh-csg`
- `WallCsgProcessor.ts` - High-level workflows for cutting openings, boolean operations on walls/lintels/infill

## Refactoring Goals

This codebase needs architectural cleanup. When working on this project:

- **Identify code smells**: Look for long functions, unclear naming, tight coupling, repeated patterns
- **Apply design patterns** where appropriate: Consider Strategy, Factory, Observer for scene/UI interactions
- **Improve separation of concerns**: Some generators mix geometry creation with material handling
- **Reduce cognitive load**: Functions should do one thing clearly

### Known Issues

- Folder structure might be untructured and confusing
- Generator classes may have too many responsibilities
- CSG operations spread across multiple files

## Key Technical Details

- **CSG Library**: Uses `three-bvh-csg` for boolean operations (not ThreeCSG or other alternatives)
- **Post-processing**: Uses `postprocessing` library with N8AO ambient occlusion (`n8ao` package)
- **Wall pivot**: Walls are shifted to bottom-left corner as origin point
- **JSON Config**: Wall configurations can be imported/exported via `core/UploadConfiguration.ts`

## Type Definitions

- `types.ts` - Core type definitions including `BuildMasonryWallParams`, opening types
- `types/n8ao.d.ts` - Type declarations for the n8ao package
