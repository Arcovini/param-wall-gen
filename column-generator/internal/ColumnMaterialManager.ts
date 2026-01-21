/**
 * ColumnMaterialManager - Singleton class to manage shared column materials
 *
 * Simplified material manager for columns (single cement-colored material).
 * Follows the same singleton pattern as wall-generator's MaterialManager.
 */

import * as THREE from 'three';

export class ColumnMaterialManager {
  private static instance: ColumnMaterialManager;
  private static readonly DEFAULT_COLUMN_COLOR = 0xC0C0B8; // Same as cement default

  private columnMaterial: THREE.MeshStandardMaterial | null = null;
  private columnColor: THREE.Color = new THREE.Color(ColumnMaterialManager.DEFAULT_COLUMN_COLOR);
  private roughness: number = 0.9;
  private metalness: number = 0.1;

  private constructor() {}

  /**
   * Returns the singleton instance of ColumnMaterialManager
   */
  public static getInstance(): ColumnMaterialManager {
    if (!ColumnMaterialManager.instance) {
      ColumnMaterialManager.instance = new ColumnMaterialManager();
    }
    return ColumnMaterialManager.instance;
  }

  /**
   * Returns the shared column material
   */
  public getColumnMaterial(): THREE.MeshStandardMaterial {
    if (!this.columnMaterial) {
      this.columnMaterial = new THREE.MeshStandardMaterial({
        color: this.columnColor,
        roughness: this.roughness,
        metalness: this.metalness,
        flatShading: true,
        vertexColors: false,
      });
    }
    return this.columnMaterial;
  }

  /**
   * Gets the current column color
   */
  public getColumnColor(): THREE.Color {
    return this.columnColor.clone();
  }

  /**
   * Sets the column color
   * @param color - Color as hex number (0xRRGGBB), string ('#RRGGBB'), or THREE.Color
   */
  public setColumnColor(color: THREE.ColorRepresentation): void {
    this.columnColor.set(color);
    if (this.columnMaterial) {
      this.columnMaterial.color.set(color);
    }
  }

  /**
   * Sets the column roughness
   * @param roughness - PBR roughness value (0-1)
   */
  public setRoughness(roughness: number): void {
    this.roughness = Math.max(0, Math.min(1, roughness));
    if (this.columnMaterial) {
      this.columnMaterial.roughness = this.roughness;
    }
  }

  /**
   * Sets the column metalness
   * @param metalness - PBR metalness value (0-1)
   */
  public setMetalness(metalness: number): void {
    this.metalness = Math.max(0, Math.min(1, metalness));
    if (this.columnMaterial) {
      this.columnMaterial.metalness = this.metalness;
    }
  }

  /**
   * Resets column color to default
   */
  public resetColumnColor(): void {
    this.setColumnColor(ColumnMaterialManager.DEFAULT_COLUMN_COLOR);
  }

  /**
   * Disposes of managed materials
   */
  public dispose(): void {
    this.columnMaterial?.dispose();
    this.columnMaterial = null;
  }
}
