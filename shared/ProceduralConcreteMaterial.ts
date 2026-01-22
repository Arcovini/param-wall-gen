/**
 * ProceduralConcreteMaterial - Noise texture generator for concrete material
 *
 * Generates pre-computed noise textures for MeshStandardMaterial:
 * - Bump texture: Grayscale Simplex noise with fBM
 * - Color texture: Noise-based color ramp from dark to light
 *
 * Replaces real-time shader with one-time texture generation for:
 * - Proper Three.js PBR lighting integration
 * - Better ambient occlusion support
 * - Improved performance (no per-frame noise calculation)
 *
 * Noise algorithm: 2D Simplex noise with fBM (fractional Brownian Motion)
 */

import * as THREE from 'three';

/**
 * Parameters for procedural concrete texture generation
 */
export interface ProceduralConcreteMaterialParams {
  colorLight?: THREE.ColorRepresentation;  // Light end of color ramp (default: #B0B0A8)
  colorDark?: THREE.ColorRepresentation;   // Dark end of color ramp (default: #505050)
  noiseScale?: number;                      // Noise scale (default: 5.0)
  detail?: number;                          // fBM octaves (default: 2.0)
  roughness?: number;                       // fBM roughness/persistence (default: 0.5)
  lacunarity?: number;                      // Frequency multiplier (default: 2.0)
  materialRoughness?: number;               // PBR roughness (default: 0.5)
  bumpStrength?: number;                    // Bump scale (default: 0.5)
}

/**
 * Default texture size for generated noise textures
 */
export const DEFAULT_TEXTURE_SIZE = 256;

// ============================================================================
// Simplex 2D Noise Implementation (TypeScript port)
// Based on Stefan Gustavson's implementation
// ============================================================================

// Permutation table for pseudo-random gradient selection
const perm: number[] = [];
const gradP: { x: number; y: number }[] = [];

// Gradient vectors for 2D simplex noise
const grad2 = [
  { x: 1, y: 1 }, { x: -1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: -1 },
  { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 },
];

// Initialize permutation table with a seed
function initNoise(seed: number = 0): void {
  const p: number[] = [];
  for (let i = 0; i < 256; i++) {
    p[i] = i;
  }

  // Seed-based shuffle using simple LCG
  let s = seed;
  for (let i = 255; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }

  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
    gradP[i] = grad2[perm[i] % 8];
  }
}

// Initialize with default seed
initNoise(0);

// Skewing and unskewing factors for 2D
const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;

/**
 * 2D Simplex noise function
 * @returns Value in range [-1, 1]
 */
function simplex2D(x: number, y: number): number {
  // Skew input space to determine which simplex cell we're in
  const s = (x + y) * F2;
  const i = Math.floor(x + s);
  const j = Math.floor(y + s);

  // Unskew cell origin back to (x, y) space
  const t = (i + j) * G2;
  const X0 = i - t;
  const Y0 = j - t;

  // x, y distances from cell origin
  const x0 = x - X0;
  const y0 = y - Y0;

  // Determine which simplex we're in (upper or lower triangle)
  let i1: number, j1: number;
  if (x0 > y0) {
    i1 = 1; j1 = 0;  // Lower triangle
  } else {
    i1 = 0; j1 = 1;  // Upper triangle
  }

  // Offsets for middle corner in (x, y) unskewed coords
  const x1 = x0 - i1 + G2;
  const y1 = y0 - j1 + G2;

  // Offsets for last corner in (x, y) unskewed coords
  const x2 = x0 - 1 + 2 * G2;
  const y2 = y0 - 1 + 2 * G2;

  // Wrap indices to 0-255
  const ii = i & 255;
  const jj = j & 255;

  // Calculate contribution from three corners
  let n0 = 0, n1 = 0, n2 = 0;

  // Corner 0
  let t0 = 0.5 - x0 * x0 - y0 * y0;
  if (t0 >= 0) {
    const gi0 = gradP[ii + perm[jj]];
    t0 *= t0;
    n0 = t0 * t0 * (gi0.x * x0 + gi0.y * y0);
  }

  // Corner 1
  let t1 = 0.5 - x1 * x1 - y1 * y1;
  if (t1 >= 0) {
    const gi1 = gradP[ii + i1 + perm[jj + j1]];
    t1 *= t1;
    n1 = t1 * t1 * (gi1.x * x1 + gi1.y * y1);
  }

  // Corner 2
  let t2 = 0.5 - x2 * x2 - y2 * y2;
  if (t2 >= 0) {
    const gi2 = gradP[ii + 1 + perm[jj + 1]];
    t2 *= t2;
    n2 = t2 * t2 * (gi2.x * x2 + gi2.y * y2);
  }

  // Scale result to [-1, 1]
  return 70 * (n0 + n1 + n2);
}

/**
 * Fractional Brownian Motion using 2D Simplex noise
 * Combines multiple octaves for natural-looking noise
 *
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param octaves - Number of noise layers (detail)
 * @param persistence - Amplitude falloff per octave (roughness)
 * @param lacunarity - Frequency increase per octave
 * @returns Value in range [0, 1]
 */
function fbm2D(
  x: number,
  y: number,
  octaves: number,
  persistence: number,
  lacunarity: number
): number {
  let total = 0;
  let frequency = 1;
  let amplitude = 1;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    total += simplex2D(x * frequency, y * frequency) * amplitude;
    maxValue += amplitude;
    amplitude *= persistence;
    frequency *= lacunarity;
  }

  // Normalize from [-1, 1] to [0, 1]
  return (total / maxValue) * 0.5 + 0.5;
}

// ============================================================================
// Texture Generation Functions
// ============================================================================

/**
 * Generates a grayscale noise texture for bump mapping
 *
 * @param size - Texture size in pixels (width = height)
 * @param params - Noise generation parameters
 * @returns THREE.DataTexture with grayscale noise
 */
export function generateNoiseTexture(
  size: number,
  params: {
    noiseScale: number;
    detail: number;
    roughness: number;
    lacunarity: number;
  }
): THREE.DataTexture {
  const { noiseScale, detail, roughness, lacunarity } = params;

  // Generate plain simplex noise (no fBM) for clearer bump evaluation
  // Use RGBA format so it displays as grayscale when used as color map
  const data = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Normalize coordinates to [0, 1] then scale
      const nx = (x / size) * noiseScale;
      const ny = (y / size) * noiseScale;

      // Plain simplex noise returns [-1, 1], normalize to [0, 1]
      const noiseValue = (simplex2D(nx, ny) + 1) * 0.5;

      // Convert to grayscale byte [0, 255]
      const gray = Math.floor(noiseValue * 255);
      const i = (y * size + x) * 4;
      data[i] = gray;      // R
      data[i + 1] = gray;  // G
      data[i + 2] = gray;  // B
      data[i + 3] = 255;   // A
    }
  }

  // Create DataTexture with RGBA format
  const texture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RGBAFormat,
    THREE.UnsignedByteType
  );

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;

  return texture;
}

/**
 * Generates a color texture by applying a color ramp to noise values
 *
 * @param noiseTexture - Source grayscale noise texture
 * @param colorLight - Light end of color ramp
 * @param colorDark - Dark end of color ramp
 * @returns THREE.DataTexture with RGB color
 */
export function generateColorTexture(
  noiseTexture: THREE.DataTexture,
  colorLight: THREE.Color,
  colorDark: THREE.Color
): THREE.DataTexture {
  const width = noiseTexture.image.width;
  const height = noiseTexture.image.height;
  // TypeScript requires explicit cast through unknown for ArrayBuffer-like types
  const noiseData = noiseTexture.image.data as unknown as Uint8Array;

  // Create RGBA data array
  const data = new Uint8Array(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    // Get noise value normalized to [0, 1] (read R channel from RGBA)
    const t = noiseData[i * 4] / 255;

    // Linear interpolation between dark and light colors
    const r = colorDark.r + (colorLight.r - colorDark.r) * t;
    const g = colorDark.g + (colorLight.g - colorDark.g) * t;
    const b = colorDark.b + (colorLight.b - colorDark.b) * t;

    // Write RGBA values (alpha = 255)
    const j = i * 4;
    data[j] = Math.floor(r * 255);
    data[j + 1] = Math.floor(g * 255);
    data[j + 2] = Math.floor(b * 255);
    data[j + 3] = 255;
  }

  const texture = new THREE.DataTexture(
    data,
    width,
    height,
    THREE.RGBAFormat,
    THREE.UnsignedByteType
  );

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;

  return texture;
}

/**
 * Container for generated textures
 */
export interface GeneratedTextures {
  bumpTexture: THREE.DataTexture;
  colorTexture: THREE.DataTexture;
}

/**
 * Generates both bump and color textures for concrete material
 *
 * @param params - Material parameters
 * @param textureSize - Texture size (default: 256)
 * @returns Object containing bump and color textures
 */
export function generateConcreteTextures(
  params: ProceduralConcreteMaterialParams,
  textureSize: number = DEFAULT_TEXTURE_SIZE
): GeneratedTextures {
  const {
    colorLight = 0xB0B0A8,
    colorDark = 0x505050,
    noiseScale = 5.0,
    detail = 2.0,
    roughness = 0.5,
    lacunarity = 2.0,
  } = params;

  // Generate grayscale noise texture
  const bumpTexture = generateNoiseTexture(textureSize, {
    noiseScale,
    detail,
    roughness,
    lacunarity,
  });

  // Generate color texture from noise
  const lightColor = new THREE.Color(colorLight);
  const darkColor = new THREE.Color(colorDark);
  const colorTexture = generateColorTexture(bumpTexture, lightColor, darkColor);

  return { bumpTexture, colorTexture };
}

/**
 * Creates a MeshStandardMaterial with procedural concrete textures
 *
 * @param params - Material parameters
 * @param textureSize - Texture size (default: 256)
 * @returns Object containing material and textures for later disposal
 */
export function createProceduralConcreteMaterial(
  params: ProceduralConcreteMaterialParams = {},
  textureSize: number = DEFAULT_TEXTURE_SIZE
): { material: THREE.MeshStandardMaterial; textures: GeneratedTextures } {
  const {
    materialRoughness = 0.5,
    bumpStrength = 0.5,
  } = params;

  const textures = generateConcreteTextures(params, textureSize);

  const material = new THREE.MeshStandardMaterial({
    map: textures.colorTexture,
    bumpMap: textures.bumpTexture,
    bumpScale: bumpStrength,
    roughness: materialRoughness,
    metalness: 0.0,
  });

  return { material, textures };
}
