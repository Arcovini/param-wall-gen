import * as THREE from 'three';
import { createDebugViewVisualization } from '../wall-generator';

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
   * Creates a visualization based on the selected view mode.
   * Block and row modes use the wall-generator public debug API; wall/wall-output return placeholders.
   *
   * @param mode - The view mode ('block', 'row', 'wall', or 'wall-output')
   * @param wallParams - Wall parameters from the UI
   * @returns A THREE.Group containing the visualization
   */
  static createViewModeVisualization(
    mode: ViewMode,
    wallParams: {
      blockWidth: number;
      blockHeight: number;
      wallLength: number;
      cementThickness: number;
      actualWallWidth?: number;
    }
  ): THREE.Group {
    if (mode === 'block' || mode === 'row') {
      return createDebugViewVisualization(mode, wallParams);
    }

    const group = new THREE.Group();
    group.name = mode === 'wall' ? 'ViewMode_wall_placeholder' : 'ViewMode_wall_output_placeholder';
    return group;
  }
}

