import * as THREE from 'three';
import { BlockGenerator } from '../wall/BlockGenerator';
import { RowGenerator } from '../wall/RowGenerator';
import { GeometryBuilder } from './geometry/GeometryBuilder';

/**
 * View modes for the masonry wall visualization
 */
export type ViewMode = 'block' | 'row' | 'wall' | 'wall-output';

/**
 * SceneUtils - Utility functions for scene manipulation
 * Provides static methods for common scene operations
 */
export class SceneUtils {
  /**
   * Toggles wireframe mode for all meshes in the scene or a specific object
   */
  static setWireframeMode(sceneOrObject: THREE.Scene | THREE.Object3D, enabled: boolean): void {
    // Apply wireframe mode to all meshes
    sceneOrObject.traverse((object) => {
      if (object instanceof THREE.Mesh && object.material) {
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((mat) => {
          if ('wireframe' in mat) {
            (mat as any).wireframe = enabled;
          }
        });
      }
    });

    // Update background color only if it's a scene
    if (sceneOrObject instanceof THREE.Scene) {
      sceneOrObject.background = new THREE.Color(enabled ? 0xffffff : 0xf5f5f5);
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
      case 'block': {
        // Create a single block using addBlockToBuilder
        const builder = new GeometryBuilder();
        const { blockWidth, blockHeight, wallLength, cementThickness } = wallParams;

        const totalHeight = blockHeight + cementThickness;
        const halfTotalHeight = totalHeight / 2;
        const yBottom = -halfTotalHeight;
        const yTopBrick = -halfTotalHeight + blockHeight;
        const yTopCement = halfTotalHeight;

        const result = blockGenerator.addBlockToBuilder(
          builder, 0, blockWidth, blockHeight, wallLength, cementThickness,
          0, 1, yBottom, yTopBrick, yTopCement
        );

        // Add end caps for a closed single block
        if (result.leftVertices && result.rightVertices) {
          const [vl0, vl1, vl2, vl3] = result.leftVertices.brick;
          const [vl4, vl5] = result.leftVertices.cementTop;
          builder.addQuad(vl2, vl0, vl1, vl3, false); // Left brick cap
          builder.addQuad(vl3, vl1, vl4, vl5, true);  // Left cement cap

          const [vr0, vr1, vr2, vr3] = result.rightVertices.rightCement;
          const [vr4, vr5] = result.rightVertices.rightCorner;
          builder.addQuad(vr0, vr2, vr3, vr1, true); // Right lower cap
          builder.addQuad(vr1, vr3, vr5, vr4, true); // Right upper cap
        }

        const blockGeo = builder.build();
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
      }

      case 'row':
        // Create a single row with 8 blocks for demonstration
        const actualWidth = wallParams.actualWallWidth || wallParams.blockWidth * 8 + wallParams.cementThickness * 7;
        const rowGroup = RowGenerator.createRow(
          blockGenerator,
          actualWidth,
          wallParams.wallLength,
          wallParams.blockWidth,
          wallParams.blockHeight,
          wallParams.cementThickness
        );
        rowGroup.name = 'SingleRow';
        group.add(rowGroup);
        break;

      case 'wall':
        // Wall view is handled by the main buildMasonryWall function
        // Return empty group as placeholder
        group.name = 'ViewMode_wall_placeholder';
        break;

      case 'wall-output':
        // Wall output view is handled by the main buildMasonryWall function
        // Return empty group as placeholder
        group.name = 'ViewMode_wall_output_placeholder';
        break;
    }

    return group;
  }
}

