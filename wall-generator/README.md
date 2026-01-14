# wall-generator

A standalone TypeScript module for generating 3D parametric masonry walls with THREE.js.

## Features

- Realistic masonry walls with ceramic blocks and cement joints
- Openings support (doors, windows) with automatic snapping to row boundaries
- Lintels above openings (when applicable)
- Top infill (encunhamento) for complete walls
- Construction progress simulation (0-100% completion)
- PBR materials with texture support

## Installation

1. Copy the `wall-generator/` folder to your project
2. Install peer dependency:
   ```bash
   npm install three
   ```

## Usage

```typescript
import { buildMasonryWall } from './wall-generator';
import type { BuildMasonryWallParams } from './wall-generator';

// Define wall parameters
const params: BuildMasonryWallParams = {
  wall: {
    placement: {
      parent: null,
      position: { x: 0, y: 0, z: 0 },
      direction: { yaw: 0 }
    },
    size: { l: 0.14, w: 3.0, h: 2.8 },  // depth, width, height (meters)
    blockSize: { l: 0.39, w: 0, h: 0.19 },  // block width, unused, height
    cementThickness: 0.01,
    materials: {
      masonry: { albedo: '', metalness: 0, roughness: 0.8 },
      lintel: { albedo: '', metalness: 0, roughness: 0.7 },
      infill: { albedo: '', metalness: 0, roughness: 0.9 }
    }
  },
  openings: [
    {
      placement: {
        parent: null,
        position: { x: 0, y: 0, z: 0 },
        direction: { yaw: 0 }
      },
      size: { l: 0.8, w: 0.14, h: 2.1 }  // width, depth, height
    }
  ],
  task: {
    completion: 1.0  // 0.0 to 1.0
  }
};

// Generate the wall
const wallGroup = buildMasonryWall(params);

// Add to your THREE.js scene
scene.add(wallGroup);
```

## API

### `buildMasonryWall(params: BuildMasonryWallParams): THREE.Group`

Generates a masonry wall and returns a THREE.Group containing all meshes.

### Types

| Type | Description |
|------|-------------|
| `Position` | 3D coordinates: `{ x, y, z }` |
| `Direction` | Rotation: `{ yaw }` in radians |
| `Placement` | Position + direction with optional parent |
| `Size` | Dimensions: `{ l, w, h }` (length/depth, width, height) |
| `MaterialPBR` | PBR material: `{ albedo, metalness, roughness }` |
| `WallParams` | Wall configuration (placement, size, block size, materials) |
| `OpeningParams` | Opening configuration (placement, size) |
| `TaskParams` | Construction progress: `{ completion: 0..1 }` |
| `BuildMasonryWallParams` | Main API parameters |

## Output

The returned `THREE.Group` contains:
- Row meshes (named `RowMesh_0`, `RowMesh_1`, etc.)
- Lintel meshes (named `Lintel`)
- Top infill mesh (named `TopInfill`) - when 100% complete
- Opening caps (bottom sills and side caps)
- Wall top cap (when completion < 100%)

All measurements are in SI units (meters).

## Dependencies

- `three` (peer dependency)
- `three-bvh-csg` (bundled in internal/)

## License

MIT
