# Wall Generator — DEC-A3 Architecture (Target)

This document maps the reusable architectural cut from `beam-generator` and `column-generator` and how `wall-generator` aligns to it.

## Reference pattern (beam / column)

- **Public boundary**: `index.ts` exports a single facade (e.g. `createInstance`) and types. No internal modules are exposed.
- **Facade layer**: `SolidBeam.ts` / `SolidColumn.ts` — normalizes input (IFC or manual), applies completion/stochasticity, calls the build entry, enriches `userData`, exposes getters and type-level methods (dependency rules, simulation config, stochastic params, task-state → style).
- **Build entry**: `buildBeam.ts` / `buildColumn.ts` — thin orchestration only:
  1. Call `XGeometryBuilder.buildXDescriptor(params)` → `GeometryDescriptor`
  2. Call shared `create(descriptor, pose)` from `engine-adapter/three-js-adapter`
  3. Set `group.name` and `group.userData` (minimal: objectType, params, task)
  4. Optionally adjust mesh local position (e.g. beam offset)
- **Domain/geometry layer**: `BeamGeometryBuilder.ts` / `ColumnGeometryBuilder.ts` — no Three.js; only `rendering-descriptors` types. Input: build params; output: `GeometryDescriptor` (positions, indices, uvs, material per mesh).
- **Shared contract**: `rendering-descriptors/types.ts` — `GeometryDescriptor`, `MeshDescriptor`, `MaterialDescriptor` (engine-agnostic).
- **Infrastructure**: `engine-adapter/three-js-adapter/ThreeAdapter.ts` — `create(descriptor, pose)`, `updateInstance(group, styleUpdate)`, `dispose(instance)`.

Data flow: **Facade → buildX → XGeometryBuilder → GeometryDescriptor → shared Three adapter → THREE.Group**.

## Wall-generator target alignment

- **Fachada estável**: `index.ts` + `SolidWall.ts` keep the same public API (createInstance, all getters, getPhysicalDependencyRules, getSimulationConfig, getStochasticParams, selectMaterials, getMaterialPresetColors, handleTaskStateChange, dispose, TYPE_ID, EXPANSION_FACTOR). SolidWall acts only as application facade and delegation.
- **Build entry**: `buildWall.ts` — single bridge: `buildWallDescriptor(params)` → `create(descriptor, pose)` → set name/userData and per-mesh local positions.
- **Domain/geometry**: `WallGeometryBuilder.ts` — produces `GeometryDescriptor` (and per-mesh local positions for the wall’s multi-mesh layout). Incrementally: it is the single point of translation THREE → descriptor (traverses the group produced by WallBuilder and extracts attributes). Internals now use `RawMeshData` as the default intermediate: `GeometryBuilder.buildRaw()` returns typed arrays + groups; `rawToBufferGeometry()` (same module) converts to `THREE.BufferGeometry`. RowGenerator and debugViews (block mode) consume `buildRaw()` and `rawToBufferGeometry`; `build()` remains a thin wrapper for backward compatibility. Residual coupling: WallBuilder still outputs `THREE.Group`, so `WallGeometryBuilder` still imports THREE for extraction; next phase is WallBuilder/InfillGenerator/etc. producing descriptors directly from raw data.
- **Infrastructure**: Use shared `engine-adapter/three-js-adapter` for create, updateInstance, and dispose. Wall-specific adapter only as thin compat wrapper if needed.

## Layer summary

| Layer            | Beam/Column              | Wall (target)                    |
|-----------------|--------------------------|----------------------------------|
| Public API      | index + SolidX           | index + SolidWall                |
| Build entry     | buildBeam / buildColumn   | buildWall                        |
| Geometry output | GeometryDescriptor       | GeometryDescriptor + mesh poses  |
| Engine          | shared Three adapter     | shared Three adapter             |

## Wall-generator boundaries (preserving public API)

- **Fachada (SolidWall + index)**: All current exports remain unchanged. SolidWall is the only place that calls the build entry (`buildWall`). It is responsible for: IFC → params mapping, completion/stochastic/material selection, calling `buildWall(buildParams)`, filling `userData` (id, typeId, bounds, modelParams, constructionState, etc.), and exposing getters (`getCompletedBoundingBox`, `getCentroid`, …), type-level methods (`getSimulationConfig`, `getStochasticParams`, `selectMaterials`, …), and `handleTaskStateChange`. No removal or signature change of any public method.
- **Domain / geometry**: `WallGeometryBuilder` produces the engine-agnostic description of the wall (GeometryDescriptor and per-mesh local positions). Internal helpers: layout/opening/bounds logic that can later be pure (getActualWallDimensions, WallPlacement, OpeningGenerator snapping, etc.) live under `internal/` and are not part of the public API.
- **Build orchestration**: `buildWall.ts` is the only file that imports both the wall builder and the shared engine adapter. It receives `BuildMasonryWallParams`, calls `buildWallDescriptor`, then `create(descriptor, pose)`, then sets group name, userData, and per-mesh positions.
- **Infrastructure**: `engine-adapter/three-js-adapter` is used for create, updateInstance, dispose. Wall-specific adapter (`adapters/ThreeSolidWallAdapter`) is used only as a thin wrapper if wall needs behaviour not in the shared adapter; otherwise index re-exports from the shared adapter.
- **Contract**: Public types in `types.ts` (BuildMasonryWallParams, SolidWallUserData, WallBounds, ElementStyleUpdate, etc.) are part of the public API. Internal types (e.g. opening bounds for row generation) stay in types or internal modules and are not guaranteed stable.

## Hotspot separation (SolidWall, WallBuilder, OpeningGenerator, MaterialManager, WallManager)

- **SolidWall**: Thin facade only. Delegates IFC → params to `internal/ifcWallMapper.ifcElementToBuildParams`, stochastic deltas to `internal/applyStochastic.applyStochasticToBuildParams`, material preset to `internal/applyMaterialSelection.applyMaterialSelection`, and geometry build to `buildWall`. Owns only: createInstance flow, userData filling, and all public getters/type-level methods (getCompletedBoundingBox, getKeyPoints, getSimulationConfig, getStochasticParams, selectMaterials, getMaterialPresetColors, handleTaskStateChange).
- **WallBuilder**: Remains the fluent builder that produces the wall group (rows, caps, infill, openings, CSG, metadata). Consumed by `WallGeometryBuilder.buildWallDescriptor` for the incremental DEC-A3 path. Future refactor can replace this with pure layout + descriptor generation without THREE.
- **OpeningGenerator**: Owns snapping, opening bounds, lintel eligibility, bottom caps; remains used by WallBuilder. Domain rules (snapToRowBoundaries, etc.) can later be moved to pure helpers; mesh creation stays in infrastructure.
- **MaterialManager**: Singleton used by WallBuilder and by applyMaterialSelection. Plan: reduce global state by passing material config into the build (e.g. WallBuilder receives resolved colors) so that tests and builds can be isolated; keep current singleton until that refactor.
- **WallManager**: Supplies generateWallGroup (textures/materials reuse). Remains used by WallBuilder. If shared adapter fully covers wall creation, WallManager can later be scoped to texture loading only or injected per build.

## Verification strategy

- **Parity**: After any change, confirm that `createInstance(undefined, { wall: { placement, size, blockSize, cementThickness }, openings: [], completion: 1 })` returns a group whose `userData` has the same shape (objectType, wall, openings, task, modelParams, bounds, and after SolidWall fill: id, typeId, constructionState, completionPercentage, taskIds). Compare bounds and keypoints with a baseline (e.g. same params → same centroid and completed AABB).
- **Public API**: Ensure every exported function and type from `index.ts` and `SolidWall.ts` still exists with the same signature; no removal or breaking change.
- **Smoke**: Manual verification only (no dedicated script in this repo; beam/column have none). To regress-check: (1) create a wall with no openings, (2) create a wall with one opening, (3) call getCompletedBoundingBox, getCentroid, getKeyPoints, handleTaskStateChange, and (4) dispose the group. If adding automated smoke later, place it at project root or in a shared test runner, not inside `wall-generator/`.
