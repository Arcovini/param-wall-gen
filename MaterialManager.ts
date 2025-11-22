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

  private textureLoader: THREE.TextureLoader;
  private baseColorTexture: THREE.Texture | null = null;
  private normalTexture: THREE.Texture | null = null;
  private ormTexture: THREE.Texture | null = null;

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
   * Returns the shared Royal Blue material used for Lintels and Infill
   */
  public getInfillMaterial(): THREE.MeshStandardMaterial {
    if (!this.infillMaterial) {
      this.infillMaterial = new THREE.MeshStandardMaterial({
        color: 0x555555, // Dark grey (concrete-like)
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
      // Load textures if not loaded
      if (!this.baseColorTexture) {
        this.baseColorTexture = this.textureLoader.load('/textures/masonry/brick_baseColor.png');
        this.normalTexture = this.textureLoader.load('/textures/masonry/brick_normal.png');
        this.ormTexture = this.textureLoader.load('/textures/masonry/brick_occlusionRoughnessMetallic.png');

        // Configure textures
        [this.baseColorTexture, this.normalTexture, this.ormTexture].forEach(texture => {
          if (texture) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);
          }
        });
      }

      this.brickMaterial = new THREE.MeshStandardMaterial({
        map: this.baseColorTexture,
        normalMap: this.normalTexture,
        aoMap: this.ormTexture,
        roughnessMap: this.ormTexture,
        metalnessMap: this.ormTexture,
        roughness: 0.8,
        metalness: 0.2,
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
        color: 0xcccccc,
        roughness: 0.9,
        metalness: 0.1,
      });
    }
    return this.cementMaterial;
  }

  /**
   * Disposes of all managed materials
   */
  public dispose(): void {
    if (this.infillMaterial) {
      this.infillMaterial.dispose();
      this.infillMaterial = null;
    }
    if (this.lintelMaterial) {
      this.lintelMaterial.dispose();
      this.lintelMaterial = null;
    }
    if (this.brickMaterial) {
      this.brickMaterial.dispose();
      this.brickMaterial = null;
    }
    if (this.cementMaterial) {
      this.cementMaterial.dispose();
      this.cementMaterial = null;
    }
    if (this.baseColorTexture) {
      this.baseColorTexture.dispose();
      this.baseColorTexture = null;
    }
    if (this.normalTexture) {
      this.normalTexture.dispose();
      this.normalTexture = null;
    }
    if (this.ormTexture) {
      this.ormTexture.dispose();
      this.ormTexture = null;
    }
  }
}
