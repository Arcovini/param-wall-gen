import * as THREE from 'three';

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
        const material = object.material as THREE.MeshStandardMaterial;
        material.wireframe = enabled;
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
    yPosition: number = 0,
    texturePath?: string
  ): THREE.Mesh {
    const geometry = new THREE.PlaneGeometry(width, depth);

    const material = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.9,
      metalness: 0.1,
    });

    // Load texture if provided
    if (texturePath) {
      const textureLoader = new THREE.TextureLoader();
      material.map = textureLoader.load(texturePath);
    }

    const floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2; // Rotate to horizontal
    floor.position.y = yPosition;
    floor.receiveShadow = true; // Receive shadows from objects above

    return floor;
  }
}
