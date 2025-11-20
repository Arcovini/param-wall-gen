import * as THREE from 'three';

export class BlockGenerator {
  private textureLoader: THREE.TextureLoader;
  private material: THREE.MeshStandardMaterial;
  private cementMaterial: THREE.MeshStandardMaterial;

  // Cached textures
  private baseColorTexture: THREE.Texture;
  private normalTexture: THREE.Texture;
  private ormTexture: THREE.Texture;

  constructor() {
    this.textureLoader = new THREE.TextureLoader();

    // Load textures once in constructor
    this.baseColorTexture = this.textureLoader.load('/textures/masonry/brick_baseColor.png');
    this.normalTexture = this.textureLoader.load('/textures/masonry/brick_normal.png');
    this.ormTexture = this.textureLoader.load('/textures/masonry/brick_occlusionRoughnessMetallic.png');

    // Configure textures
    [this.baseColorTexture, this.normalTexture, this.ormTexture].forEach(texture => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
    });

    // Create brick material
    this.material = new THREE.MeshStandardMaterial({
      map: this.baseColorTexture,
      normalMap: this.normalTexture,
      aoMap: this.ormTexture,
      roughnessMap: this.ormTexture,
      metalnessMap: this.ormTexture,
      roughness: 0.8,
      metalness: 0.2,
    });

    // Create cement material
    this.cementMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.9,
      metalness: 0.1,
    });
  }

  /**
   * Creates a block mesh with the shared material
   */
  createBlockMesh(width: number, height: number): THREE.Mesh {
    const geometry = new THREE.PlaneGeometry(width, height);

    // Ensure UV2 exists for aoMap
    if (!geometry.attributes.uv2) {
      geometry.setAttribute('uv2', geometry.attributes.uv);
    }

    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  /**
   * Creates a cement mesh with the shared material
   */
  createCementMesh(width: number, height: number): THREE.Mesh {
    const geometry = new THREE.PlaneGeometry(width, height);

    // Ensure UV2 exists for consistency with other meshes during merging
    if (!geometry.attributes.uv2) {
      geometry.setAttribute('uv2', geometry.attributes.uv);
    }

    const mesh = new THREE.Mesh(geometry, this.cementMaterial);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  /**
   * Returns the shared brick material
   */
  getBrickMaterial(): THREE.Material {
    return this.material;
  }

  /**
   * Returns the shared cement material
   */
  getCementMaterial(): THREE.Material {
    return this.cementMaterial;
  }

  /**
   * Disposes of all resources
   */
  dispose(): void {
    this.material.dispose();
    this.cementMaterial.dispose();
    this.baseColorTexture.dispose();
    this.normalTexture.dispose();
    this.ormTexture.dispose();
  }
}
