import * as THREE from 'three';

// Import textures as ES modules - Vite resolves URLs at build time
import brickDiffuseUrl from '../assets/textures/masonry/brick/redBrick_difuseAO.png';
import brickNormalUrl from '../assets/textures/masonry/brick/redBrick_Normal.png';
import concreteDiffuseUrl from '../assets/textures/concrete/concrete_layers_diff_1k.png';
import concreteNormalUrl from '../assets/textures/concrete/concrete_layers_nor_gl_1k.png';

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

  private textureLoader: THREE.TextureLoader;
  private baseColorTexture: THREE.Texture | null = null;
  private normalTexture: THREE.Texture | null = null;

  // Concrete textures for infill
  private concreteBaseColorTexture: THREE.Texture | null = null;
  private concreteNormalTexture: THREE.Texture | null = null;

  private constructor() {
    this.textureLoader = new THREE.TextureLoader();
  }

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
   * Helper: Configure texture wrapping and repeat settings
   */
  private configureTexture(texture: THREE.Texture, repeatX: number, repeatY: number): void {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
  }

  /**
   * Helper: Load and configure a texture with wrapping settings
   */
  private loadTexture(url: string, repeatX: number, repeatY: number): THREE.Texture {
    const texture = this.textureLoader.load(url);
    this.configureTexture(texture, repeatX, repeatY);
    return texture;
  }

  /**
   * Returns the shared infill material with concrete textures
   */
  public getInfillMaterial(): THREE.MeshStandardMaterial {
    if (!this.infillMaterial) {
      if (!this.concreteBaseColorTexture) {
        this.concreteBaseColorTexture = this.loadTexture(concreteDiffuseUrl, 10, 1);
        this.concreteNormalTexture = this.loadTexture(concreteNormalUrl, 10, 1);
      }

      this.infillMaterial = new THREE.MeshStandardMaterial({
        map: this.concreteBaseColorTexture,
        normalMap: this.concreteNormalTexture,
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
      if (!this.baseColorTexture) {
        this.baseColorTexture = this.loadTexture(brickDiffuseUrl, 1, 1);
        this.normalTexture = this.loadTexture(brickNormalUrl, 1, 1);
      }

      this.brickMaterial = new THREE.MeshStandardMaterial({
        map: this.baseColorTexture,
        normalMap: this.normalTexture,
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
   * Disposes of all managed materials and textures
   */
  public dispose(): void {
    // Dispose materials
    this.infillMaterial?.dispose();
    this.lintelMaterial?.dispose();
    this.brickMaterial?.dispose();
    this.cementMaterial?.dispose();

    // Dispose textures
    this.baseColorTexture?.dispose();
    this.normalTexture?.dispose();
    this.concreteBaseColorTexture?.dispose();
    this.concreteNormalTexture?.dispose();

    // Reset all references
    this.infillMaterial = null;
    this.lintelMaterial = null;
    this.brickMaterial = null;
    this.cementMaterial = null;
    this.baseColorTexture = null;
    this.normalTexture = null;
    this.concreteBaseColorTexture = null;
    this.concreteNormalTexture = null;
  }
}
