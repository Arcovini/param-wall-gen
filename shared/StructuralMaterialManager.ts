/**
 * StructuralMaterialManager - Unified material manager for structural elements
 *
 * Singleton with registry pattern - maintains one material per element type.
 * Replaces ColumnMaterialManager and BeamMaterialManager with a unified API.
 */

import * as THREE from 'three';
import { SRGBColorSpace } from 'three';
import type { StructuralElementType, StructuralMaterialConfig } from './types';

/** Default material values */
const DEFAULT_COLOR = 0xC0C0B8;    // Cement-like gray
const DEFAULT_ROUGHNESS = 0.9;
const DEFAULT_METALNESS = 0.1;

/** Fixed texture folder path (relative to module) */
const TEXTURE_FOLDER = '/column-generator/textures/';

/** Internal state for a single element type's material */
interface MaterialState {
  material: THREE.MeshStandardMaterial | null;
  color: THREE.Color;
  roughness: number;
  metalness: number;
}

/**
 * StructuralMaterialManager class - Unified material management
 */
export class StructuralMaterialManager {
  private static instance: StructuralMaterialManager;

  /** Registry: maps element type to its material state */
  private registry: Map<StructuralElementType, MaterialState> = new Map();

  /** Texture cache to avoid reloading */
  private textureCache: Map<string, THREE.Texture> = new Map();

  /** Texture loader instance */
  private textureLoader: THREE.TextureLoader = new THREE.TextureLoader();

  private constructor() {}

  /**
   * Returns the singleton instance
   */
  public static getInstance(): StructuralMaterialManager {
    if (!StructuralMaterialManager.instance) {
      StructuralMaterialManager.instance = new StructuralMaterialManager();
    }
    return StructuralMaterialManager.instance;
  }

  /**
   * Gets or creates the state for an element type
   */
  private getState(type: StructuralElementType): MaterialState {
    let state = this.registry.get(type);
    if (!state) {
      state = {
        material: null,
        color: new THREE.Color(DEFAULT_COLOR),
        roughness: DEFAULT_ROUGHNESS,
        metalness: DEFAULT_METALNESS,
      };
      this.registry.set(type, state);
    }
    return state;
  }

  /**
   * Returns the shared material for an element type
   * @param type - The structural element type
   */
  public getMaterial(type: StructuralElementType): THREE.MeshStandardMaterial {
    const state = this.getState(type);
    if (!state.material) {
      state.material = new THREE.MeshStandardMaterial({
        color: state.color,
        roughness: state.roughness,
        metalness: state.metalness,
        flatShading: true,
        vertexColors: false,
      });
    }
    return state.material;
  }

  /**
   * Gets the current color for an element type
   * @param type - The structural element type
   */
  public getColor(type: StructuralElementType): THREE.Color {
    return this.getState(type).color.clone();
  }

  /**
   * Sets the color for an element type
   * @param type - The structural element type
   * @param color - Color as hex number (0xRRGGBB), string ('#RRGGBB'), or THREE.Color
   */
  public setColor(type: StructuralElementType, color: THREE.ColorRepresentation): void {
    const state = this.getState(type);
    state.color.set(color);
    if (state.material) {
      state.material.color.set(color);
    }
  }

  /**
   * Sets the roughness for an element type
   * @param type - The structural element type
   * @param roughness - PBR roughness value (0-1)
   */
  public setRoughness(type: StructuralElementType, roughness: number): void {
    const state = this.getState(type);
    state.roughness = Math.max(0, Math.min(1, roughness));
    if (state.material) {
      state.material.roughness = state.roughness;
    }
  }

  /**
   * Sets the metalness for an element type
   * @param type - The structural element type
   * @param metalness - PBR metalness value (0-1)
   */
  public setMetalness(type: StructuralElementType, metalness: number): void {
    const state = this.getState(type);
    state.metalness = Math.max(0, Math.min(1, metalness));
    if (state.material) {
      state.material.metalness = state.metalness;
    }
  }

  /**
   * Resets an element type's color to default
   * @param type - The structural element type
   */
  public resetColor(type: StructuralElementType): void {
    this.setColor(type, DEFAULT_COLOR);
  }

  /**
   * Applies material config for an element type
   * @param type - The structural element type
   * @param config - Material configuration object
   */
  public applyConfig(type: StructuralElementType, config: StructuralMaterialConfig): void {
    if (config.color !== undefined) this.setColor(type, config.color);
    if (config.roughness !== undefined) this.setRoughness(type, config.roughness);
    if (config.metalness !== undefined) this.setMetalness(type, config.metalness);
  }

  /**
   * Disposes materials for one or all element types
   * @param type - Optional element type (if omitted, disposes all)
   */
  public dispose(type?: StructuralElementType): void {
    if (type) {
      const state = this.registry.get(type);
      if (state?.material) {
        state.material.dispose();
        state.material = null;
      }
    } else {
      // Dispose all
      for (const state of this.registry.values()) {
        state.material?.dispose();
        state.material = null;
      }
    }
  }

  /**
   * Generates a Gaussian random number using Box-Muller transform
   * @returns Random number with mean=0 and standard deviation=1
   */
  private gaussianRandom(): number {
    const u1 = Math.random();
    const u2 = Math.random();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }

  /**
   * Generates a varied color based on a base color and sigma.
   * Uses Gaussian distribution to vary H, S, L components.
   * @param baseColor - The base color to vary
   * @param sigma - Standard deviation for variation (0 = no variation)
   * @returns A new THREE.Color with variation applied
   */
  private generateVariedColor(baseColor: THREE.Color, sigma: number): THREE.Color {
    const color = baseColor.clone();

    if (sigma > 0) {
      // Normalize sigma (divide by 10 for more intuitive UI values)
      const normalizedSigma = sigma / 10;

      const hsl = { h: 0, s: 0, l: 0 };
      color.getHSL(hsl, SRGBColorSpace);

      const gaussianL = this.gaussianRandom();
      const gaussianH = this.gaussianRandom();
      const gaussianS = this.gaussianRandom();

      // Hue: Subtle shift (20% of sigma)
      hsl.h = hsl.h + gaussianH * normalizedSigma * 0.2;

      // Saturation: Moderate variation (50% of sigma)
      hsl.s = Math.max(0, Math.min(1, hsl.s + gaussianS * normalizedSigma * 0.5));

      // Lightness: Full sigma effect
      hsl.l = Math.max(0, Math.min(1, hsl.l + gaussianL * normalizedSigma));

      color.setHSL(hsl.h, hsl.s, hsl.l, SRGBColorSpace);
    }

    return color;
  }

  /**
   * Loads a texture with caching (keyed by filename + repeat settings)
   * @param filename - Texture filename (loaded from TEXTURE_FOLDER)
   * @param repeatX - UV repeat X (default: 1)
   * @param repeatY - UV repeat Y (default: 1)
   */
  private loadTexture(filename: string, repeatX: number = 1, repeatY: number = 1): THREE.Texture {
    const path = TEXTURE_FOLDER + filename;
    // Cache key includes repeat settings to support different configurations
    const cacheKey = `${path}|${repeatX}|${repeatY}`;

    if (!this.textureCache.has(cacheKey)) {
      const texture = this.textureLoader.load(
        path,
        () => console.log('[StructuralMaterialManager] Texture loaded:', path),
        undefined,
        (err) => console.error('[StructuralMaterialManager] Texture load error:', path, err)
      );
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.repeat.set(repeatX, repeatY);
      this.textureCache.set(cacheKey, texture);
    }

    return this.textureCache.get(cacheKey)!;
  }

  /**
   * Creates a textured material (fresh instance, not type-cached)
   * Use this when texture is specified in config.
   * @param type - The structural element type (for default values)
   * @param config - Material configuration with texture settings
   */
  public createTexturedMaterial(
    type: StructuralElementType,
    config: StructuralMaterialConfig
  ): THREE.MeshStandardMaterial {
    const state = this.getState(type);

    // Get base color (from config or state default)
    const baseColor = new THREE.Color(config.color ?? state.color);

    // Apply sigma variation if specified
    const finalColor = config.colorSigma
      ? this.generateVariedColor(baseColor, config.colorSigma)
      : baseColor;

    const material = new THREE.MeshStandardMaterial({
      color: finalColor,
      roughness: config.roughness ?? state.roughness,
      metalness: config.metalness ?? state.metalness,
      flatShading: true,
    });

    if (config.texture) {
      const repeatX = config.textureRepeatX ?? 1;
      const repeatY = config.textureRepeatY ?? 1;
      // Load texture with repeat settings baked into cache key (no cloning needed)
      const texture = this.loadTexture(config.texture, repeatX, repeatY);
      material.map = texture;

      console.log('[StructuralMaterialManager] Created textured material:', {
        texture: config.texture,
        path: TEXTURE_FOLDER + config.texture,
        repeatX,
        repeatY,
        color: config.color
      });
    }

    return material;
  }
}
