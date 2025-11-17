import * as THREE from 'three';

/**
 * WallGenerator - Generates a grid of blocks to fill wall dimensions
 * Handles block positioning, cement joints, and material reuse
 */
export class WallGenerator {
  private scene: THREE.Scene | null = null;
  private textureLoader: THREE.TextureLoader;
  private brickMaterial: THREE.MeshStandardMaterial;
  private cementMaterial: THREE.MeshStandardMaterial;

  // Arrays to store all meshes in the grid
  private blockMeshes: THREE.Mesh[] = [];
  private cementMeshes: THREE.Mesh[] = [];

  // Cached textures (loaded once, reused for all blocks)
  private baseColorTexture: THREE.Texture;
  private normalTexture: THREE.Texture;
  private ormTexture: THREE.Texture;

  constructor() {
    this.textureLoader = new THREE.TextureLoader();

    // Load textures once (same as BlockGenerator)
    this.baseColorTexture = this.textureLoader.load('textures/masonry/brick_baseColor.png');
    this.normalTexture = this.textureLoader.load('textures/masonry/brick_normal.png');
    this.ormTexture = this.textureLoader.load('textures/masonry/brick_occlusionRoughnessMetallic.png');

    // Configure textures
    [this.baseColorTexture, this.normalTexture, this.ormTexture].forEach(texture => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
    });

    // Create brick material (shared by all blocks)
    this.brickMaterial = new THREE.MeshStandardMaterial({
      map: this.baseColorTexture,
      normalMap: this.normalTexture,
      aoMap: this.ormTexture,
      roughnessMap: this.ormTexture,
      metalnessMap: this.ormTexture,
      roughness: 0.8,
      metalness: 0.2,
    });

    // Create cement material (shared by all joints)
    this.cementMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.9,
      metalness: 0.1,
    });
  }

  /**
   * Creates a grid of blocks to fill the wall dimensions
   * Blocks are positioned coplanar (all at z = 0)
   */
  createWall(
    wallWidth: number,
    wallHeight: number,
    blockWidth: number,
    blockHeight: number,
    blockLength: number,
    cementThickness: number,
    scene: THREE.Scene
  ): void {
    this.scene = scene;

    // Clear previous wall
    this.clearWall();

    // Calculate grid dimensions (truncate to integer)
    const blocksHorizontal = Math.floor(wallWidth / (blockWidth + cementThickness));
    const blocksVertical = Math.floor(wallHeight / (blockHeight + cementThickness));

    // Create grid of blocks
    for (let row = 0; row < blocksVertical; row++) {
      for (let col = 0; col < blocksHorizontal; col++) {
        // Calculate block position (centered at origin, coplanar at z = 0)
        const x = col * (blockWidth + cementThickness) - (wallWidth / 2) + (blockWidth / 2);
        const y = row * (blockHeight + cementThickness) - (wallHeight / 2) + (blockHeight / 2);

        // Create brick block
        const blockGeometry = new THREE.PlaneGeometry(blockWidth, blockHeight);
        // Ensure UV2 exists for aoMap
        if (!blockGeometry.attributes.uv2) {
          blockGeometry.setAttribute('uv2', blockGeometry.attributes.uv);
        }
        const blockMesh = new THREE.Mesh(blockGeometry, this.brickMaterial);
        blockMesh.position.set(x, y, 0);
        this.scene.add(blockMesh);
        this.blockMeshes.push(blockMesh);

        // Determine if this is an edge block
        const isLastColumn = col === blocksHorizontal - 1;
        const isLastRow = row === blocksVertical - 1;

        // Add top cement joint (if not last row)
        if (!isLastRow) {
          const topCementGeometry = new THREE.PlaneGeometry(blockWidth, cementThickness);
          const topCementMesh = new THREE.Mesh(topCementGeometry, this.cementMaterial);
          topCementMesh.position.set(x, y + blockHeight / 2 + cementThickness / 2, 0);
          this.scene.add(topCementMesh);
          this.cementMeshes.push(topCementMesh);
        }

        // Add right cement joint (if not last column)
        if (!isLastColumn) {
          const rightCementGeometry = new THREE.PlaneGeometry(cementThickness, blockHeight);
          const rightCementMesh = new THREE.Mesh(rightCementGeometry, this.cementMaterial);
          rightCementMesh.position.set(x + blockWidth / 2 + cementThickness / 2, y, 0);
          this.scene.add(rightCementMesh);
          this.cementMeshes.push(rightCementMesh);
        }

        // Add corner cement joint (if not last row AND not last column)
        if (!isLastRow && !isLastColumn) {
          const cornerCementGeometry = new THREE.PlaneGeometry(cementThickness, cementThickness);
          const cornerCementMesh = new THREE.Mesh(cornerCementGeometry, this.cementMaterial);
          cornerCementMesh.position.set(
            x + blockWidth / 2 + cementThickness / 2,
            y + blockHeight / 2 + cementThickness / 2,
            0
          );
          this.scene.add(cornerCementMesh);
          this.cementMeshes.push(cornerCementMesh);
        }
      }
    }
  }

  /**
   * Updates the wall dimensions and regenerates the grid
   */
  updateWall(
    wallWidth: number,
    wallHeight: number,
    blockWidth: number,
    blockHeight: number,
    blockLength: number,
    cementThickness: number
  ): void {
    if (this.scene) {
      this.createWall(wallWidth, wallHeight, blockWidth, blockHeight, blockLength, cementThickness, this.scene);
    }
  }

  /**
   * Clears all blocks and cement joints from the scene
   */
  private clearWall(): void {
    if (!this.scene) return;

    // Remove and dispose all block meshes
    this.blockMeshes.forEach(mesh => {
      this.scene!.remove(mesh);
      mesh.geometry.dispose();
    });
    this.blockMeshes = [];

    // Remove and dispose all cement meshes
    this.cementMeshes.forEach(mesh => {
      this.scene!.remove(mesh);
      mesh.geometry.dispose();
    });
    this.cementMeshes = [];
  }

  /**
   * Disposes of all resources (geometries, materials, textures)
   */
  dispose(): void {
    this.clearWall();

    // Dispose materials
    this.brickMaterial.dispose();
    this.cementMaterial.dispose();

    // Dispose textures
    this.baseColorTexture.dispose();
    this.normalTexture.dispose();
    this.ormTexture.dispose();
  }
}
