# Column Generator

Module for generating parametric 3D concrete columns with procedural textures.

## Architecture

```
column-generator/
├── index.ts                  # Public API exports
├── buildColumn.ts            # Main entry point
├── types.ts                  # Type definitions
├── COLUMN.md                 # This documentation
└── internal/
    ├── ColumnBuilder.ts      # Fluent builder pattern
    ├── ColumnMaterialManager.ts  # Material singleton
    └── ProceduralConcreteMaterial.ts  # Noise texture generator
```

## Usage

### Basic Column

```typescript
import { buildColumn } from "./column-generator";

const column = buildColumn({
  column: {
    size: { l: 0.3, w: 0.3, h: 3.0 }, // 30cm x 30cm x 3m
    placement: {
      parent: null,
      position: { x: 0, y: 0, z: 0 },
      direction: { yaw: 0 },
    },
  },
});
scene.add(column);
```

### Material Modes

```typescript
import { ColumnMaterialManager } from "./column-generator";

const mm = ColumnMaterialManager.getInstance();

// Procedural concrete texture (default)
mm.setMaterialMode("procedural");

// Standard solid color material
mm.setMaterialMode("standard");
mm.setColumnColor(0xc0c0b8);
```

### Procedural Texture Parameters

The procedural texture colors are derived from the column color:

- `colorLight` = column color (from UI color picker)
- `colorDark` = 20% darker than column color (calculated automatically)

```typescript
// Set column color - automatically updates procedural texture
mm.setColumnColor(0xc0c0b8); // colorLight = 0xC0C0B8, colorDark = 0x999994

// Or set noise parameters directly
mm.setProceduralParams({
  noiseScale: 5.0, // Noise frequency
  detail: 2.0, // fBM octaves
  roughness: 0.5, // fBM persistence
  lacunarity: 2.0, // Frequency multiplier per octave
  materialRoughness: 0.5, // PBR roughness
  bumpStrength: 5.0, // Bump map intensity
});
```

## Procedural Concrete Texture

### Implementation Overview

The procedural texture system generates pre-computed noise textures at material creation time:

- **Bump texture**: Grayscale Simplex noise with fBM for surface detail
- **Color texture**: Noise-based color ramp from dark to light

This approach provides:

- Proper Three.js PBR lighting integration
- Better ambient occlusion support
- Improved performance (no per-frame noise calculation)

### Blender Node Equivalent

The texture generation replicates this Blender shader node setup:

```
┌─────────────────┐     ┌─────────┐     ┌───────────────┐     ┌─────────────┐     ┌─────────────────┐
│ Texture         │     │ Mapping │     │ Noise Texture │     │ Color Ramp  │     │ Principled BSDF │
│ Coordinate      │────►│         │────►│               │────►│             │────►│                 │
│ (Generated)     │     │ Scale:1 │     │ 2D, fBM       │     │ Linear B→W  │     │ Roughness: 0.5  │
└─────────────────┘     └─────────┘     │ Scale: 5.0    │     └─────────────┘     │ Metallic: 0     │
                                        │ Detail: 2.0   │                         └─────────────────┘
                                        │ Rough: 0.5    │
                                        │ Lacunarity: 2 │
                                        └───────────────┘
```

### Simplex Noise Algorithm

Uses 2D Simplex noise (TypeScript implementation) for:

- **Faster computation**: O(n²) vs O(2^n) complexity compared to Perlin
- **No directional artifacts**: Perlin noise exhibits visible grid alignment
- **Smoother gradients**: Better visual quality for procedural textures

### fBM (Fractional Brownian Motion)

Combines multiple noise octaves for natural-looking variation:

```
fBM(p) = Σ noise(p * frequency^i) * amplitude^i
         i=0..octaves
```

Parameters:

- `detail` (octaves): Number of noise layers (default: 2)
- `roughness` (persistence): Amplitude falloff per octave (default: 0.5)
- `lacunarity`: Frequency increase per octave (default: 2.0)

### Texture Generation Pipeline

```
┌─────────────────────┐
│ Material Creation   │
│                     │
│ 1. Generate noise   │
│    texture (256x256)│
│    using fbm2D()    │
│                     │
│ 2. Generate color   │
│    texture from     │
│    noise + ramp     │
│                     │
│ 3. Create Standard  │
│    Material with    │
│    map + bumpMap    │
└─────────────────────┘
```

### Texture Regeneration

When parameters change, textures are regenerated efficiently:

- **Color change only**: Regenerate color texture (reuse bump texture)
- **Noise params change**: Regenerate both textures
- **Material params change**: Update material properties directly (no regeneration)

```typescript
// Only regenerates color texture
mm.setColumnColor(0xff0000);

// Regenerates both textures
mm.setProceduralParams({ noiseScale: 10.0 });

// No texture regeneration
mm.setProceduralParams({ materialRoughness: 0.8 });
```

## Builder Pattern

```typescript
new ColumnBuilder(params)
  .parseParameters() // Extract dimensions and placement
  .generateGeometry() // Create BoxGeometry + material
  .shiftToBottomLeftPivot() // Pivot at bottom-left-front corner
  .addMetadata() // Attach userData
  .build(); // Return THREE.Group
```

## Type Definitions

```typescript
interface BuildColumnParams {
  column: ColumnParams;
}

interface ColumnParams {
  placement: Placement; // Position and rotation
  size: Size; // l=depth, w=width, h=height (meters)
  material?: ColumnMaterialConfig;
}

interface ColumnMaterialConfig {
  color?: number | string; // Standard material color
  roughness?: number; // PBR roughness (0-1)
  metalness?: number; // PBR metalness (0-1)
}

interface ProceduralConcreteMaterialParams {
  colorLight?: THREE.ColorRepresentation; // Light end of ramp
  colorDark?: THREE.ColorRepresentation; // Dark end of ramp
  noiseScale?: number; // Noise frequency
  detail?: number; // fBM octaves
  roughness?: number; // fBM persistence
  lacunarity?: number; // Frequency multiplier
  materialRoughness?: number; // PBR roughness
  bumpStrength?: number; // Bump map intensity
}

interface GeneratedTextures {
  bumpTexture: THREE.DataTexture;
  colorTexture: THREE.DataTexture;
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

Column pivot is at bottom-left-front corner:

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

## Memory Management

The material manager properly disposes textures and materials:

```typescript
const mm = ColumnMaterialManager.getInstance();

// Automatic texture disposal on parameter change
mm.setProceduralParams({ noiseScale: 10.0 }); // Old textures disposed

// Manual disposal when done
mm.dispose(); // Disposes all materials and textures
```

## Performance Notes

- **Texture size**: 256x256 pixels (configurable via DEFAULT_TEXTURE_SIZE)
- **Generation timing**: Once on material creation, not per-frame
- **Memory**: Two textures per material (~320KB for 256x256 with mipmaps)
- **Regeneration**: Only when parameters change (not on every frame)
