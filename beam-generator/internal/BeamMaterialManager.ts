/**
 * BeamMaterialManager - Singleton class to manage shared beam materials
 *
 * Simplified material manager for beams (single cement-colored material).
 * Follows the same singleton pattern as wall-generator's MaterialManager.
 */

import * as THREE from 'three';

export class BeamMaterialManager {
  private static instance: BeamMaterialManager;
  private static readonly DEFAULT_BEAM_COLOR = 0xC0C0B8; // Same as cement default

  private beamMaterial: THREE.MeshStandardMaterial | null = null;
  private beamColor: THREE.Color = new THREE.Color(BeamMaterialManager.DEFAULT_BEAM_COLOR);
  private roughness: number = 0.9;
  private metalness: number = 0.1;

  private constructor() {}

  /**
   * Returns the singleton instance of BeamMaterialManager
   */
  public static getInstance(): BeamMaterialManager {
    if (!BeamMaterialManager.instance) {
      BeamMaterialManager.instance = new BeamMaterialManager();
    }
    return BeamMaterialManager.instance;
  }

  /**
   * Returns the shared beam material
   */
  public getBeamMaterial(): THREE.MeshStandardMaterial {
    if (!this.beamMaterial) {
      this.beamMaterial = new THREE.MeshStandardMaterial({
        color: this.beamColor,
        roughness: this.roughness,
        metalness: this.metalness,
        flatShading: true,
        vertexColors: false,
      });
    }
    return this.beamMaterial;
  }

  /**
   * Gets the current beam color
   */
  public getBeamColor(): THREE.Color {
    return this.beamColor.clone();
  }

  /**
   * Sets the beam color
   * @param color - Color as hex number (0xRRGGBB), string ('#RRGGBB'), or THREE.Color
   */
  public setBeamColor(color: THREE.ColorRepresentation): void {
    this.beamColor.set(color);
    if (this.beamMaterial) {
      this.beamMaterial.color.set(color);
    }
  }

  /**
   * Sets the beam roughness
   * @param roughness - PBR roughness value (0-1)
   */
  public setRoughness(roughness: number): void {
    this.roughness = Math.max(0, Math.min(1, roughness));
    if (this.beamMaterial) {
      this.beamMaterial.roughness = this.roughness;
    }
  }

  /**
   * Sets the beam metalness
   * @param metalness - PBR metalness value (0-1)
   */
  public setMetalness(metalness: number): void {
    this.metalness = Math.max(0, Math.min(1, metalness));
    if (this.beamMaterial) {
      this.beamMaterial.metalness = this.metalness;
    }
  }

  /**
   * Resets beam color to default
   */
  public resetBeamColor(): void {
    this.setBeamColor(BeamMaterialManager.DEFAULT_BEAM_COLOR);
  }

  /**
   * Disposes of managed materials
   */
  public dispose(): void {
    this.beamMaterial?.dispose();
    this.beamMaterial = null;
  }
}
