import * as THREE from 'three';

/**
 * MaterialManager - Singleton class to manage shared materials
 * Ensures materials are created once and reused across the application.
 */
export class MaterialManager {
  private static instance: MaterialManager;
  private infillMaterial: THREE.MeshStandardMaterial | null = null;
  private lintelMaterial: THREE.MeshStandardMaterial | null = null;
  private brickMaterial: THREE.MeshStandardMaterial | null = null;
  private cementMaterial: THREE.MeshStandardMaterial | null = null;

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
   * Returns the shared infill material
   */
  public getInfillMaterial(): THREE.MeshStandardMaterial {
    if (!this.infillMaterial) {
      this.infillMaterial = new THREE.MeshStandardMaterial({
        color: 0xB0B0A8,
        roughness: 0.9,
        metalness: 0.1
      });
    }
    return this.infillMaterial;
  }

  /**
   * Returns the shared Lintel material
   */
  public getLintelMaterial(): THREE.MeshStandardMaterial {
    if (!this.lintelMaterial) {
      this.lintelMaterial = new THREE.MeshStandardMaterial({
        color: 0xE5E5E5, // Lighter grey than cement (0xcccccc)
        roughness: 0.8,
        metalness: 0.1
      });
    }
    return this.lintelMaterial;
  }

  /**
   * Returns the shared Brick material
   */
  public getBrickMaterial(): THREE.MeshStandardMaterial {
    if (!this.brickMaterial) {
      this.brickMaterial = new THREE.MeshStandardMaterial({
        color: 0xC45C3E,
        roughness: 0.8,
        metalness: 0.2,
        flatShading: true,
      });
    }
    return this.brickMaterial;
  }

  /**
   * Returns the shared Cement material
   */
  public getCementMaterial(): THREE.MeshStandardMaterial {
    if (!this.cementMaterial) {
      this.cementMaterial = new THREE.MeshStandardMaterial({
        color: 0xC0C0B8,
        roughness: 0.9,
        metalness: 0.1,
        flatShading: true, // Ensure sharp edges for cement
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
