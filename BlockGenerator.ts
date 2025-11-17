import * as THREE from 'three';

export class BlockGenerator {
  private scene: THREE.Scene | null = null;
  private blockMesh: THREE.Mesh | null = null;
  private textureLoader: THREE.TextureLoader;
  private material: THREE.MeshStandardMaterial;
  private cementMaterial: THREE.MeshStandardMaterial;

  // Cement joint meshes
  private cementTopMesh: THREE.Mesh | null = null;
  private cementRightMesh: THREE.Mesh | null = null;
  private cementCornerMesh: THREE.Mesh | null = null;

  // Cached textures (loaded once, reused on updates)
  private baseColorTexture: THREE.Texture;
  private normalTexture: THREE.Texture;
  private ormTexture: THREE.Texture;

  constructor() {
    this.textureLoader = new THREE.TextureLoader();

    // Load textures once in constructor
    this.baseColorTexture = this.textureLoader.load('textures/masonry/brick_baseColor.png');
    this.normalTexture = this.textureLoader.load('textures/masonry/brick_normal.png');
    this.ormTexture = this.textureLoader.load('textures/masonry/brick_occlusionRoughnessMetallic.png');

    // Configure textures once (full image fills the plane, no tiling)
    [this.baseColorTexture, this.normalTexture, this.ormTexture].forEach(texture => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1); // Show full image once (1:1 UV mapping)
    });

    // Create brick material once (never changes)
    this.material = new THREE.MeshStandardMaterial({
      map: this.baseColorTexture,          // Base color (albedo)
      normalMap: this.normalTexture,       // Normal map for surface detail
      aoMap: this.ormTexture,              // Ambient occlusion (R channel)
      roughnessMap: this.ormTexture,       // Roughness (G channel)
      metalnessMap: this.ormTexture,       // Metalness (B channel)
      roughness: 0.8,
      metalness: 0.2,
    });

    // Create cement material (gray, no textures)
    this.cementMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,        // Light gray for cement
      roughness: 0.9,
      metalness: 0.1,
    });
  }

  /**
   * Creates a single textured block and adds it to the scene
   */
  createBlock(
    blockWidth: number,
    blockHeight: number,
    blockLength: number,
    cementThickness: number,
    scene: THREE.Scene
  ): void {
    this.scene = scene;

    // Remove previous block if it exists
    if (this.blockMesh && this.scene) {
      this.scene.remove(this.blockMesh);
      this.blockMesh.geometry.dispose();
      // Material is cached, not disposed here
    }

    // Remove previous cement planes if they exist
    if (this.cementTopMesh && this.scene) {
      this.scene.remove(this.cementTopMesh);
      this.cementTopMesh.geometry.dispose();
    }
    if (this.cementRightMesh && this.scene) {
      this.scene.remove(this.cementRightMesh);
      this.cementRightMesh.geometry.dispose();
    }
    if (this.cementCornerMesh && this.scene) {
      this.scene.remove(this.cementCornerMesh);
      this.cementCornerMesh.geometry.dispose();
    }

    // Create brick plane geometry (2D surface, not 3D cube)
    const geometry = new THREE.PlaneGeometry(blockWidth, blockHeight);

    // Ensure UV2 exists for aoMap
    if (!geometry.attributes.uv2) {
      geometry.setAttribute('uv2', geometry.attributes.uv);
    }

    // Create brick mesh
    this.blockMesh = new THREE.Mesh(geometry, this.material);
    this.blockMesh.position.set(0, 0, 0);

    // Add brick to scene
    this.scene.add(this.blockMesh);

    // // Create cement joint planes (controlled by cementThickness parameter)
    // const cementThickness = blockLength; // Use blockLength as cementThickness

    // 1. Top horizontal cement plane
    const topCementGeometry = new THREE.PlaneGeometry(blockWidth, cementThickness);
    this.cementTopMesh = new THREE.Mesh(topCementGeometry, this.cementMaterial);
    this.cementTopMesh.position.set(0, blockHeight / 2 + cementThickness / 2, 0);
    this.scene.add(this.cementTopMesh);

    // 2. Right vertical cement plane
    const rightCementGeometry = new THREE.PlaneGeometry(cementThickness, blockHeight);
    this.cementRightMesh = new THREE.Mesh(rightCementGeometry, this.cementMaterial);
    this.cementRightMesh.position.set(blockWidth / 2 + cementThickness / 2, 0, 0);
    this.scene.add(this.cementRightMesh);

    // 3. Top-right corner cement plane
    const cornerCementGeometry = new THREE.PlaneGeometry(cementThickness, cementThickness);
    this.cementCornerMesh = new THREE.Mesh(cornerCementGeometry, this.cementMaterial);
    this.cementCornerMesh.position.set(
      blockWidth / 2 + cementThickness / 2,
      blockHeight / 2 + cementThickness / 2,
      0
    );
    this.scene.add(this.cementCornerMesh);
  }

  /**
   * Updates the block dimensions
   */
  updateBlock(
    blockWidth: number,
    blockHeight: number,
    blockLength: number,
    cementThickness: number
  ): void {
    if (this.scene) {
      this.createBlock(blockWidth, blockHeight, blockLength, cementThickness, this.scene);
    }
  }

  /**
   * Disposes of all resources (textures, geometries, materials)
   */
  dispose(): void {
    // Remove and dispose brick mesh
    if (this.blockMesh && this.scene) {
      this.scene.remove(this.blockMesh);
      this.blockMesh.geometry.dispose();
    }

    // Remove and dispose cement planes
    if (this.cementTopMesh && this.scene) {
      this.scene.remove(this.cementTopMesh);  
      this.cementTopMesh.geometry.dispose();
    }
    if (this.cementRightMesh && this.scene) {
      this.scene.remove(this.cementRightMesh);
      this.cementRightMesh.geometry.dispose();
    }
    if (this.cementCornerMesh && this.scene) {
      this.scene.remove(this.cementCornerMesh);
      this.cementCornerMesh.geometry.dispose();
    }

    // Dispose cached materials
    this.material.dispose();
    this.cementMaterial.dispose();

    // Dispose cached textures
    this.baseColorTexture.dispose();
    this.normalTexture.dispose();
    this.ormTexture.dispose();
  }
}
