import * as THREE from 'three';
import { BlockGenerator } from '../BlockGenerator';
import { RowGenerator } from '../RowGenerator';

/**
 * View modes for the masonry wall visualization
 */
export type ViewMode = 'block' | 'row' | 'wall';

/**
 * SceneUtils - Utility functions for scene manipulation
 * Provides static methods for common scene operations
 */
export class SceneUtils {
  /**
   * Toggles wireframe mode for all meshes in the scene
   */
  static setWireframeMode(scene: THREE.Scene, enabled: boolean): void {
    // Apply wireframe mode to all meshes in the scene
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh && object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((mat) => {
            if (mat instanceof THREE.Material) {
              (mat as any).wireframe = enabled;
            }
          });
        } else if (object.material instanceof THREE.Material) {
          (object.material as any).wireframe = enabled;
        }
      }
    });

    // Update background color
    if (enabled) {
      scene.background = new THREE.Color(0xffffff);
    } else {
      scene.background = new THREE.Color(0xf5f5f5);
    }
  }

  /**
   * Sets the background color of the scene
   */
  static setBackgroundColor(scene: THREE.Scene, color: number): void {
    scene.background = new THREE.Color(color);
  }

  /**
   * Counts the number of meshes in the scene
   */
  static getMeshCount(scene: THREE.Scene): number {
    let count = 0;
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        count++;
      }
    });
    return count;
  }

  /**
   * Gets all objects of a specific type from the scene
   */
  static getObjectsByType<T extends THREE.Object3D>(
    scene: THREE.Scene,
    type: new (...args: any[]) => T
  ): T[] {
    const objects: T[] = [];
    scene.traverse((object) => {
      if (object instanceof type) {
        objects.push(object);
      }
    });
    return objects;
  }

  /**
   * Creates a textured floor plane
   */
  static createFloor(
    width: number,
    depth: number,
    yPosition: number = 0
  ): THREE.Mesh {
    const geometry = new THREE.PlaneGeometry(width, depth);

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const texturePath = '/textures/floor/';

    const baseColor = textureLoader.load(texturePath + 'DefaultMaterial_baseColor.png');
    const normalMap = textureLoader.load(texturePath + 'DefaultMaterial_normal.png');
    const ormMap = textureLoader.load(texturePath + 'DefaultMaterial_occlusionRoughnessMetallic.png');

    // Configure textures
    [baseColor, normalMap, ormMap].forEach(texture => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 4);
      texture.colorSpace = THREE.SRGBColorSpace;
    });

    // Normal map and ORM map should be linear
    normalMap.colorSpace = THREE.LinearSRGBColorSpace;
    ormMap.colorSpace = THREE.LinearSRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
      map: baseColor,
      normalMap: normalMap,
      roughnessMap: ormMap,
      metalnessMap: ormMap,
      aoMap: ormMap,
      roughness: 1.0, // Let texture control roughness
      metalness: 1.0, // Let texture control metalness
      color: 0xFFFFFF,
      side: THREE.DoubleSide
    });

    const floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2; // Rotate to horizontal
    floor.position.y = yPosition;
    floor.receiveShadow = true; // Receive shadows from objects above

    return floor;
  }

  /**
   * Creates a visualization based on the selected view mode
   * 
   * @param mode - The view mode ('block', 'row', or 'wall')
   * @param blockGenerator - Instance of BlockGenerator
   * @param wallParams - Wall parameters from the UI
   * @returns A THREE.Group containing the visualization
   */
  static createViewModeVisualization(
    mode: ViewMode,
    blockGenerator: BlockGenerator,
    wallParams: {
      blockWidth: number;
      blockHeight: number;
      wallLength: number;
      cementThickness: number;
      actualWallWidth?: number;
    }
  ): THREE.Group {
    const group = new THREE.Group();
    group.name = `ViewMode_${mode}`;

    switch (mode) {
      case 'block':
        // Create a single block with cement layer
        const blockGeo = blockGenerator.createBlockGeometry(
          wallParams.blockWidth,
          wallParams.blockHeight,
          wallParams.wallLength,
          wallParams.cementThickness
        );
        const materials = [
          blockGenerator.getBrickMaterial(),
          blockGenerator.getCementMaterial()
        ];
        const blockMesh = new THREE.Mesh(blockGeo, materials);
        blockMesh.castShadow = true;
        blockMesh.receiveShadow = true;
        blockMesh.name = 'SingleBlock';
        group.add(blockMesh);
        break;

      case 'row':
        // Create a single row
        const actualWidth = wallParams.actualWallWidth || wallParams.blockWidth * 3 + wallParams.cementThickness * 2;
        const rowGeo = RowGenerator.createRow(
          blockGenerator,
          actualWidth,
          wallParams.wallLength,
          wallParams.blockWidth,
          wallParams.blockHeight,
          wallParams.cementThickness,
          false, // Not last row
          false  // Don't invert normals
        );
        const rowMaterials = [
          blockGenerator.getBrickMaterial(),
          blockGenerator.getCementMaterial()
        ];
        const rowMesh = new THREE.Mesh(rowGeo, rowMaterials);
        rowMesh.castShadow = true;
        rowMesh.receiveShadow = true;
        rowMesh.name = 'SingleRow';
        group.add(rowMesh);
        break;

      case 'wall':
        // Wall view is handled by the main buildMasonryWall function
        // Return empty group as placeholder
        group.name = 'ViewMode_wall_placeholder';
        break;
    }

    return group;
  }
}

