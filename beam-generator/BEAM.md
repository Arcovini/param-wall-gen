# Beam Generator

Module for generating parametric 3D concrete beams with texture support and color variation.

## Architecture

```
beam-generator/
├── index.ts                       # Public API exports
├── buildBeam.ts                   # Main entry point (single function)
├── types.ts                       # Type definitions (self-contained, no external deps)
├── BEAM.md                        # This documentation
├── textures/                      # Texture files
│   ├── concrete_structure_grid_tieholes.png
│   ├── concrete_structure_formwork_marks.png
│   ├── concrete_structure_double_seam.png
│   └── concrete_structure_weathered.png
└── internal/
    └── BeamMaterialManager.ts     # Material creation (textures + color variation)
```

## Usage

### Basic Beam

```typescript
import { buildBeam } from "./beam-generator";

const beam = buildBeam({
  beam: {
    size: { l: 0.3, w: 0.3, h: 3.0 }, // 30cm x 30cm x 3m
    placement: {
      parent: null,
      position: { x: 0, y: 0, z: 0 },
      direction: { yaw: 0 },
    },
  },
});
scene.add(beam);
```

### With Material Configuration

```typescript
const beam = buildBeam({
  beam: {
    size: { l: 0.3, w: 0.3, h: 3.0 },
    placement: {
      parent: null,
      position: { x: 0, y: 0, z: 0 },
      direction: { yaw: 0 },
    },
    material: {
      color: 0xc0c0b8, // Base color
      colorSigma: 2.0, // Color variation (0 = none, higher = more)
      texture: "concrete_structure_grid_tieholes.png",
      textureRepeatX: 1,
      textureRepeatY: 3,
      roughness: 0.9,
      metalness: 0.1,
    },
  },
});
```

## Material System

`createBeamMaterial()` in `internal/BeamMaterialManager.ts` handles material creation:

- **Texture support**: File-based textures from `beam-generator/textures/`, cached by filename + repeat settings
- **Color variation (sigma)**: Gaussian distribution (Box-Muller) for per-beam color differences
- **PBR defaults**: roughness 0.9, metalness 0.1, flatShading enabled

### Color Sigma (Variation)

The `colorSigma` parameter creates natural variation between beams:

```typescript
// No variation - all beams same color
material: { color: 0xc0c0b8, colorSigma: 0 }

// Subtle variation
material: { color: 0xc0c0b8, colorSigma: 1.0 }

// Noticeable variation
material: { color: 0xc0c0b8, colorSigma: 3.0 }

// Strong variation
material: { color: 0xc0c0b8, colorSigma: 5.0 }
```

**How it works:**

- Uses Box-Muller transform for Gaussian random distribution
- Varies HSL components: Hue (20%), Saturation (50%), Lightness (100%)
- Each beam instance gets a unique color based on base color + random variation

### Texture Path Resolution

Textures are self-contained within the module:

```
Texture Path: /beam-generator/textures/{filename}

For Vite development:
- Symlink: public/beam-generator/textures → ../../beam-generator/textures
- This makes textures accessible at the expected URL path

For production/other projects:
- Serve beam-generator/textures/ at /beam-generator/textures/
```

### Available Textures

| Filename                                | Description                 |
| --------------------------------------- | --------------------------- |
| `concrete_structure_grid_tieholes.png`  | Grid pattern with tie holes |
| `concrete_structure_formwork_marks.png` | Formwork imprint marks      |
| `concrete_structure_double_seam.png`    | Double seam pattern         |
| `concrete_structure_weathered.png`      | Weathered concrete surface  |

## Type Definitions

```typescript
interface BuildBeamParams {
  beam: BeamParams;
}

interface BeamParams {
  placement: Placement;
  size: Size;                       // l=depth, w=width, h=height (meters)
  material?: BeamMaterialConfig;
}

interface BeamMaterialConfig {
  color?: number | string;        // Hex (0xRRGGBB) or CSS color string
  colorSigma?: number;            // Color variation (0 = none, higher = more)
  roughness?: number;             // PBR roughness (0-1, default 0.9)
  metalness?: number;             // PBR metalness (0-1, default 0.1)
  texture?: string;               // Texture filename
  textureRepeatX?: number;        // UV repeat X (default: 1)
  textureRepeatY?: number;        // UV repeat Y (default: 1)
}
```

## Coordinate System

```
        Y (up)
        │
        │    Z (depth/back)
        │   /
        │  /
        │ /
        └──────── X (width/right)

Size mapping:
  l (length) → Z-axis (depth)
  w (width)  → X-axis (width)
  h (height) → Y-axis (height)
```

## Pivot Point

Beam pivot is at bottom-left-front corner:

```
       ┌──────────┐
      /│         /│
     / │        / │
    ┌──────────┐  │
    │  │       │  │
    │  └───────│──┘
    │ /        │ /
    │/         │/
    O──────────┘  ← Pivot (0,0,0)
```

## Technical Notes

### Texture Loading Fix

Textures are loaded asynchronously via `THREE.TextureLoader`. The caching strategy avoids cloning unloaded textures:

```
Problem (old approach):
1. textureLoader.load() returns immediately (async)
2. texture.clone() on unloaded texture → clone has no image data
3. needsUpdate = true → "Texture marked for update but no image data found"
4. Material renders black

Solution (current approach):
1. Cache key includes repeat settings: `${path}|${repeatX}|${repeatY}`
2. Each unique config gets its own cached texture instance
3. No cloning needed → texture loads properly
```

### Module Self-Containment

The beam-generator is a fully self-contained module with no external dependencies (besides `three`):

- All types defined locally in `types.ts`
- Material creation handled internally in `BeamMaterialManager.ts`
- Textures stored in `beam-generator/textures/`
- Path constant hardcoded to `/beam-generator/textures/`
- Consumer app just needs to serve that path
