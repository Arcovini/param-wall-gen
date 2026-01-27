/**
 * ConstructionLoader - Utility for loading and caching GLB construction site models
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export type ProgressCallback = (percentage: number) => void;

export class ConstructionLoader {
  private loader: GLTFLoader;
  private cachedModel: THREE.Group | null = null;
  private isLoading = false;

  constructor() {
    this.loader = new GLTFLoader();
  }

  /**
   * Loads the construction site GLB model
   * @param url - Path to the GLB file
   * @param onProgress - Optional callback for loading progress (0-100)
   * @returns Promise resolving to the loaded model group
   */
  async load(url: string, onProgress?: ProgressCallback): Promise<THREE.Group> {
    // Return cached model if available
    if (this.cachedModel) {
      return this.cachedModel.clone();
    }

    // Prevent duplicate loading
    if (this.isLoading) {
      return new Promise((resolve) => {
        const checkCache = setInterval(() => {
          if (this.cachedModel) {
            clearInterval(checkCache);
            resolve(this.cachedModel.clone());
          }
        }, 100);
      });
    }

    this.isLoading = true;

    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (gltf) => {
          const model = gltf.scene;

          // Enable shadows on all meshes
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          // Cache the model
          this.cachedModel = model;
          this.isLoading = false;

          resolve(model.clone());
        },
        (xhr) => {
          if (onProgress && xhr.total > 0) {
            const percentage = Math.round((xhr.loaded / xhr.total) * 100);
            onProgress(percentage);
          }
        },
        (error) => {
          this.isLoading = false;
          console.error('Error loading GLB:', error);
          reject(error);
        }
      );
    });
  }

  /**
   * Checks if a model is already cached
   */
  isCached(): boolean {
    return this.cachedModel !== null;
  }

  /**
   * Clears the cached model to free memory
   */
  clearCache(): void {
    if (this.cachedModel) {
      this.cachedModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else if (child.material) {
            child.material.dispose();
          }
        }
      });
      this.cachedModel = null;
    }
  }
}
