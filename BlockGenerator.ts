import * as THREE from 'three';
import { MaterialManager } from './MaterialManager';

export class BlockGenerator {
  constructor() {
    // Materials are managed by MaterialManager
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

    const mesh = new THREE.Mesh(geometry, MaterialManager.getInstance().getBrickMaterial());
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

    const mesh = new THREE.Mesh(geometry, MaterialManager.getInstance().getCementMaterial());
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  /**
   * Returns the shared brick material
   */
  getBrickMaterial(): THREE.Material {
    return MaterialManager.getInstance().getBrickMaterial();
  }

  /**
   * Returns the shared cement material
   */
  getCementMaterial(): THREE.Material {
    return MaterialManager.getInstance().getCementMaterial();
  }

  /**
   * Disposes of all resources
   */
  /**
   * Disposes of resources
   */
  dispose(): void {
    // Materials are managed by MaterialManager, so we don't dispose them here
  }
}
