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
  private frontBlockMeshes: THREE.Mesh[] = [];
  private backBlockMeshes: THREE.Mesh[] = [];
  private cementMeshes: THREE.Mesh[] = [];
  private edgeMeshes: THREE.Mesh[] = [];

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
   * Creates a 3D wall with front plane, back plane, and edge planes
   */
  createWall(
    wallWidth: number,
    wallHeight: number,
    wallLength: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number,
    scene: THREE.Scene
  ): void {
    this.scene = scene;

    // Clear previous wall
    this.clearWall();

    // Calculate grid dimensions (truncate to integer)
    const blocksHorizontal = Math.floor(wallWidth / (blockWidth + cementThickness));
    const blocksVertical = Math.floor(wallHeight / (blockHeight + cementThickness));

    // Calculate actual wall dimensions based on blocks that fit
    // Don't include cement thickness after the last block
    const actualWallWidth = blocksHorizontal * blockWidth + (blocksHorizontal - 1) * cementThickness;
    const actualWallHeight = blocksVertical * blockHeight + (blocksVertical - 1) * cementThickness;

    // Create front plane grid (at z = 0)
    this.createPlaneGrid(blocksHorizontal, blocksVertical, actualWallWidth, actualWallHeight, blockWidth, blockHeight, cementThickness, 0, false);

    // Create back plane grid (at z = -wallLength, with inverted normals)
    this.createPlaneGrid(blocksHorizontal, blocksVertical, actualWallWidth, actualWallHeight, blockWidth, blockHeight, cementThickness, -wallLength, true);

    // Create edge planes to bridge front and back (using actual dimensions)
    this.createEdgePlanes(actualWallWidth, actualWallHeight, wallLength);
  }

  /**
   * Creates a plane grid of blocks at a specific z position
   */
  private createPlaneGrid(
    blocksHorizontal: number,
    blocksVertical: number,
    wallWidth: number,
    wallHeight: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number,
    zPosition: number,
    invertNormals: boolean
  ): void {
    const targetArray = invertNormals ? this.backBlockMeshes : this.frontBlockMeshes;

    for (let row = 0; row < blocksVertical; row++) {
      for (let col = 0; col < blocksHorizontal; col++) {
        // Calculate block position (centered at origin)
        const x = col * (blockWidth + cementThickness) - (wallWidth / 2) + (blockWidth / 2);
        const y = row * (blockHeight + cementThickness) - (wallHeight / 2) + (blockHeight / 2);

        // Create brick block
        const blockGeometry = new THREE.PlaneGeometry(blockWidth, blockHeight);
        // Ensure UV2 exists for aoMap
        if (!blockGeometry.attributes.uv2) {
          blockGeometry.setAttribute('uv2', blockGeometry.attributes.uv);
        }

        const blockMesh = new THREE.Mesh(blockGeometry, this.brickMaterial);
        blockMesh.position.set(x, y, zPosition);

        // Invert normals for back plane by rotating 180 degrees around Y axis
        if (invertNormals) {
          blockMesh.rotation.y = Math.PI;
        }

        this.scene!.add(blockMesh);
        targetArray.push(blockMesh);

        // Determine if this is an edge block
        const isLastColumn = col === blocksHorizontal - 1;
        const isLastRow = row === blocksVertical - 1;

        // Add top cement joint (if not last row)
        if (!isLastRow) {
          const topCementGeometry = new THREE.PlaneGeometry(blockWidth, cementThickness);
          const topCementMesh = new THREE.Mesh(topCementGeometry, this.cementMaterial);
          topCementMesh.position.set(x, y + blockHeight / 2 + cementThickness / 2, zPosition);
          if (invertNormals) {
            topCementMesh.rotation.y = Math.PI;
          }
          this.scene!.add(topCementMesh);
          this.cementMeshes.push(topCementMesh);
        }

        // Add right cement joint (if not last column)
        if (!isLastColumn) {
          const rightCementGeometry = new THREE.PlaneGeometry(cementThickness, blockHeight);
          const rightCementMesh = new THREE.Mesh(rightCementGeometry, this.cementMaterial);
          rightCementMesh.position.set(x + blockWidth / 2 + cementThickness / 2, y, zPosition);
          if (invertNormals) {
            rightCementMesh.rotation.y = Math.PI;
          }
          this.scene!.add(rightCementMesh);
          this.cementMeshes.push(rightCementMesh);
        }

        // Add corner cement joint (if not last row AND not last column)
        if (!isLastRow && !isLastColumn) {
          const cornerCementGeometry = new THREE.PlaneGeometry(cementThickness, cementThickness);
          const cornerCementMesh = new THREE.Mesh(cornerCementGeometry, this.cementMaterial);
          cornerCementMesh.position.set(
            x + blockWidth / 2 + cementThickness / 2,
            y + blockHeight / 2 + cementThickness / 2,
            zPosition
          );
          if (invertNormals) {
            cornerCementMesh.rotation.y = Math.PI;
          }
          this.scene!.add(cornerCementMesh);
          this.cementMeshes.push(cornerCementMesh);
        }
      }
    }
  }

  /**
   * Creates cement edge planes to bridge the front and back planes
   */
  private createEdgePlanes(wallWidth: number, wallHeight: number, wallLength: number): void {
    // Top edge plane
    const topEdgeGeometry = new THREE.PlaneGeometry(wallWidth, wallLength);
    const topEdgeMesh = new THREE.Mesh(topEdgeGeometry, this.cementMaterial);
    topEdgeMesh.position.set(0, wallHeight / 2, -wallLength / 2);
    topEdgeMesh.rotation.x = Math.PI / 2;
    topEdgeMesh.scale.z = -1; // Flip normal
    this.scene!.add(topEdgeMesh);
    this.edgeMeshes.push(topEdgeMesh);

    // Bottom edge plane
    const bottomEdgeGeometry = new THREE.PlaneGeometry(wallWidth, wallLength);
    const bottomEdgeMesh = new THREE.Mesh(bottomEdgeGeometry, this.cementMaterial);
    bottomEdgeMesh.position.set(0, -wallHeight / 2, -wallLength / 2);
    bottomEdgeMesh.rotation.x = -Math.PI / 2;
    bottomEdgeMesh.scale.z = -1; // Flip normal
    this.scene!.add(bottomEdgeMesh);
    this.edgeMeshes.push(bottomEdgeMesh);

    // Left edge plane
    const leftEdgeGeometry = new THREE.PlaneGeometry(wallLength, wallHeight);
    const leftEdgeMesh = new THREE.Mesh(leftEdgeGeometry, this.cementMaterial);
    leftEdgeMesh.position.set(-wallWidth / 2, 0, -wallLength / 2);
    leftEdgeMesh.rotation.y = Math.PI / 2;
    leftEdgeMesh.scale.z = -1; // Flip normal
    this.scene!.add(leftEdgeMesh);
    this.edgeMeshes.push(leftEdgeMesh);

    // Right edge plane
    const rightEdgeGeometry = new THREE.PlaneGeometry(wallLength, wallHeight);
    const rightEdgeMesh = new THREE.Mesh(rightEdgeGeometry, this.cementMaterial);
    rightEdgeMesh.position.set(wallWidth / 2, 0, -wallLength / 2);
    rightEdgeMesh.rotation.y = -Math.PI / 2;
    rightEdgeMesh.scale.z = -1; // Flip normal
    this.scene!.add(rightEdgeMesh);
    this.edgeMeshes.push(rightEdgeMesh);
  }

  /**
   * Updates the wall dimensions and regenerates the 3D wall
   */
  updateWall(
    wallWidth: number,
    wallHeight: number,
    wallLength: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number
  ): void {
    if (this.scene) {
      this.createWall(wallWidth, wallHeight, wallLength, blockWidth, blockHeight, cementThickness, this.scene);
    }
  }

  /**
   * Clears all blocks and cement joints from the scene
   */
  private clearWall(): void {
    if (!this.scene) return;

    // Remove and dispose all front block meshes
    this.frontBlockMeshes.forEach(mesh => {
      this.scene!.remove(mesh);
      mesh.geometry.dispose();
    });
    this.frontBlockMeshes = [];

    // Remove and dispose all back block meshes
    this.backBlockMeshes.forEach(mesh => {
      this.scene!.remove(mesh);
      mesh.geometry.dispose();
    });
    this.backBlockMeshes = [];

    // Remove and dispose all cement meshes
    this.cementMeshes.forEach(mesh => {
      this.scene!.remove(mesh);
      mesh.geometry.dispose();
    });
    this.cementMeshes = [];

    // Remove and dispose all edge meshes
    this.edgeMeshes.forEach(mesh => {
      this.scene!.remove(mesh);
      mesh.geometry.dispose();
    });
    this.edgeMeshes = [];
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
