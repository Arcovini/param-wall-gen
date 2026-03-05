import * as THREE from 'three';
import { SRGBColorSpace } from 'three';

/**
 * MaterialManager - Singleton class to manage shared materials
 * Ensures materials are created once and reused across the application.
 */
export class MaterialManager {
  private static instance: MaterialManager;
  private static readonly DEFAULT_BRICK_COLOR = 0xE7A976;
  private static readonly DEFAULT_DARK_BRICK_COLOR = 0xC87C4A; // Darker/burnt brick color
  private static readonly DEFAULT_CEMENT_COLOR = 0x6C6C6B;
  private static readonly DEFAULT_LINTEL_COLOR = 0xE5E5E5;
  private static readonly DEFAULT_INFILL_COLOR = 0xB0B0A8;
  private static readonly DARK_BRICK_RATIO = 0.15; // Fixed at 15% of bricks are dark

  private infillMaterial: THREE.MeshStandardMaterial | null = null;
  private lintelMaterial: THREE.MeshStandardMaterial | null = null;
  private brickMaterial: THREE.MeshStandardMaterial | null = null;
  private cementMaterial: THREE.MeshStandardMaterial | null = null;

  private brickColor: THREE.Color = new THREE.Color(MaterialManager.DEFAULT_BRICK_COLOR);
  private darkBrickColor: THREE.Color = new THREE.Color(MaterialManager.DEFAULT_DARK_BRICK_COLOR);
  private brickColorSigma: number = 0;
  private cementColor: THREE.Color = new THREE.Color(MaterialManager.DEFAULT_CEMENT_COLOR);
  private lintelColor: THREE.Color = new THREE.Color(MaterialManager.DEFAULT_LINTEL_COLOR);
  private lintelColorSigma: number = 0;
  private infillColor: THREE.Color = new THREE.Color(MaterialManager.DEFAULT_INFILL_COLOR);
  private infillColorSigma: number = 0;

  private constructor() {}

  /**
   * Returns the singleton instance of MaterialManager
   */
  public static getInstance(): MaterialManager {
    if (!MaterialManager.instance) {
      MaterialManager.instance = new MaterialManager();
    }
    return MaterialManager.instance;
  }

  /**
   * Returns the shared infill material (cloned per-infill with varied color)
   * Uses material color, not vertex colors, to avoid CSG issues with cut faces.
   */
  public getInfillMaterial(): THREE.MeshStandardMaterial {
    if (!this.infillMaterial) {
      this.infillMaterial = new THREE.MeshStandardMaterial({
        color: this.infillColor,
        roughness: 0.9,
        metalness: 0.1,
        vertexColors: false,
      });
    }
    return this.infillMaterial;
  }

  /**
   * Returns the shared Lintel material (with vertex colors for per-lintel variation)
   */
  public getLintelMaterial(): THREE.MeshStandardMaterial {
    if (!this.lintelMaterial) {
      this.lintelMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,  // White base - actual color comes from vertex colors
        roughness: 0.8,
        metalness: 0.1,
        vertexColors: true,
      });
    }
    return this.lintelMaterial;
  }

  /**
   * Returns the shared Brick material (with vertex colors enabled for per-brick variation)
   */
  public getBrickMaterial(): THREE.MeshStandardMaterial {
    if (!this.brickMaterial) {
      this.brickMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,  // White base - actual color comes from vertex colors
        roughness: 0.8,
        metalness: 0.2,
        flatShading: true,
        vertexColors: true,
      });
    }
    return this.brickMaterial;
  }

  /**
   * Gets the current brick color
   */
  public getBrickColor(): THREE.Color {
    return this.brickColor.clone();
  }

  /**
   * Sets the brick color used for vertex color generation.
   * Note: Material color stays white since vertex colors handle the actual brick color.
   * @param color - Color as hex number (0xRRGGBB), string ('#RRGGBB'), or THREE.Color
   */
  public setBrickColor(color: THREE.ColorRepresentation): void {
    this.brickColor.set(color);
    // Don't update material color - it must stay white (1,1,1) because:
    // finalColor = materialColor × vertexColor
    // With white material: finalColor = vertexColor (correct)
  }

  /**
   * Resets brick color to default
   */
  public resetBrickColor(): void {
    this.setBrickColor(MaterialManager.DEFAULT_BRICK_COLOR);
  }

  /**
   * Gets the current brick color sigma (standard deviation for variation)
   */
  public getBrickColorSigma(): number {
    return this.brickColorSigma;
  }

  /**
   * Sets the brick color sigma for per-brick variation
   * @param sigma - Standard deviation (0 = no variation, higher = more variation)
   *                Input is divided by 10 for more intuitive UI values (e.g., 0.5 → 0.05)
   */
  public setBrickColorSigma(sigma: number): void {
    this.brickColorSigma = Math.max(0, sigma / 10);
  }

  /**
   * Gets the current dark brick color
   */
  public getDarkBrickColor(): THREE.Color {
    return this.darkBrickColor.clone();
  }

  /**
   * Sets the dark/secondary brick color (used for 15% of bricks)
   * @param color - Color as hex number (0xRRGGBB), string ('#RRGGBB'), or THREE.Color
   */
  public setDarkBrickColor(color: THREE.ColorRepresentation): void {
    this.darkBrickColor.set(color);
  }

  /**
   * Gets the current cement color
   */
  public getCementColor(): THREE.Color {
    return this.cementColor.clone();
  }

  /**
   * Sets the cement color used for mortar joints
   * @param color - Color as hex number (0xRRGGBB), string ('#RRGGBB'), or THREE.Color
   */
  public setCementColor(color: THREE.ColorRepresentation): void {
    this.cementColor.set(color);
    // Also update material color if it exists (cement uses material color, not vertex colors)
    if (this.cementMaterial) {
      this.cementMaterial.color.set(color);
    }
  }

  // ===== LINTEL COLOR =====

  public getLintelColor(): THREE.Color {
    return this.lintelColor.clone();
  }

  public setLintelColor(color: THREE.ColorRepresentation): void {
    this.lintelColor.set(color);
  }

  public getLintelColorSigma(): number {
    return this.lintelColorSigma;
  }

  public setLintelColorSigma(sigma: number): void {
    this.lintelColorSigma = Math.max(0, sigma / 10);
  }

  // ===== INFILL COLOR =====

  public getInfillColor(): THREE.Color {
    return this.infillColor.clone();
  }

  public setInfillColor(color: THREE.ColorRepresentation): void {
    this.infillColor.set(color);
  }

  public getInfillColorSigma(): number {
    return this.infillColorSigma;
  }

  public setInfillColorSigma(sigma: number): void {
    this.infillColorSigma = Math.max(0, sigma / 10);
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
   * Generates a brick color using bimodal distribution:
   * - 85% Normal bricks: Primary color with Gaussian variation on H, S, L
   * - 15% Dark bricks: Secondary color with Gaussian variation
   *
   * Uses sRGB color space for HSL operations to match color picker values.
   * @returns A new THREE.Color with variation based on sigma
   */
  public generateVariedBrickColor(): THREE.Color {
    // 15% chance of being a dark brick
    const isDarkBrick = Math.random() < MaterialManager.DARK_BRICK_RATIO;

    // Select base color
    const color = isDarkBrick ? this.darkBrickColor.clone() : this.brickColor.clone();

    // Apply Gaussian variation if sigma > 0
    if (this.brickColorSigma > 0) {
      const hsl = { h: 0, s: 0, l: 0 };
      // Use sRGB color space for HSL - matches color picker values
      color.getHSL(hsl, SRGBColorSpace);

      const gaussianL = this.gaussianRandom();
      const gaussianH = this.gaussianRandom();
      const gaussianS = this.gaussianRandom();

      // Hue: Subtle shift (20% of sigma)
      hsl.h = hsl.h + gaussianH * this.brickColorSigma * 0.2;

      // Saturation: Moderate variation (50% of sigma)
      hsl.s = Math.max(0, Math.min(1, hsl.s + gaussianS * this.brickColorSigma * 0.5));

      // Lightness: Full sigma effect
      hsl.l = Math.max(0, Math.min(1, hsl.l + gaussianL * this.brickColorSigma));

      color.setHSL(hsl.h, hsl.s, hsl.l, SRGBColorSpace);
    }

    return color;
  }

  /**
   * Generates a lintel color with Gaussian variation.
   * Uses sRGB color space for HSL operations.
   * @returns A new THREE.Color with variation based on lintel sigma
   */
  public generateVariedLintelColor(): THREE.Color {
    const color = this.lintelColor.clone();

    if (this.lintelColorSigma > 0) {
      const hsl = { h: 0, s: 0, l: 0 };
      color.getHSL(hsl, SRGBColorSpace);

      const gaussianL = this.gaussianRandom();
      const gaussianS = this.gaussianRandom();

      // Saturation: Subtle variation (20% of sigma)
      hsl.s = Math.max(0, Math.min(1, hsl.s + gaussianS * this.lintelColorSigma * 0.2));

      // Lightness: Full sigma effect
      hsl.l = Math.max(0, Math.min(1, hsl.l + gaussianL * this.lintelColorSigma));

      color.setHSL(hsl.h, hsl.s, hsl.l, SRGBColorSpace);
    }

    return color;
  }

  /**
   * Generates an infill color with Gaussian variation.
   * Uses sRGB color space for HSL operations.
   * @returns A new THREE.Color with variation based on infill sigma
   */
  public generateVariedInfillColor(): THREE.Color {
    const color = this.infillColor.clone();

    if (this.infillColorSigma > 0) {
      const hsl = { h: 0, s: 0, l: 0 };
      color.getHSL(hsl, SRGBColorSpace);

      const gaussianL = this.gaussianRandom();
      const gaussianS = this.gaussianRandom();

      // Saturation: Subtle variation (20% of sigma)
      hsl.s = Math.max(0, Math.min(1, hsl.s + gaussianS * this.infillColorSigma * 0.2));

      // Lightness: Full sigma effect
      hsl.l = Math.max(0, Math.min(1, hsl.l + gaussianL * this.infillColorSigma));

      color.setHSL(hsl.h, hsl.s, hsl.l, SRGBColorSpace);
    }

    return color;
  }

  /**
   * Returns the shared Cement material (uses material color, not vertex colors)
   * This avoids gradient artifacts from vertex color interpolation at brick/cement boundaries.
   */
  public getCementMaterial(): THREE.MeshStandardMaterial {
    if (!this.cementMaterial) {
      this.cementMaterial = new THREE.MeshStandardMaterial({
        color: this.cementColor,
        roughness: 0.9,
        metalness: 0.1,
        flatShading: true,
        vertexColors: false,
      });
    }
    return this.cementMaterial;
  }

  /**
   * Disposes of all managed materials
   */
  public dispose(): void {
    this.infillMaterial?.dispose();
    this.lintelMaterial?.dispose();
    this.brickMaterial?.dispose();
    this.cementMaterial?.dispose();

    this.infillMaterial = null;
    this.lintelMaterial = null;
    this.brickMaterial = null;
    this.cementMaterial = null;
  }
}
