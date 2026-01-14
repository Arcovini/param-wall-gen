import * as THREE from 'three';
import type { VisualizationMode } from '../types';

export class WallVisualizer {
  /**
   * Creates a transparent colored box for visualization
   */
  private static createPlaceholderMesh(
    width: number,
    height: number,
    length: number,
    color: number,
    opacity: number = 0.5
  ): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(width, height, length);
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity
    });
    return new THREE.Mesh(geometry, material);
  }

  /**
   * Creates a small sphere to indicate the pivot point
   */
  static createPivotIndicator(): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(0.05, 16, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: false
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'PivotIndicator';
    return mesh;
  }

  /**
   * Adds the "Target Wall" placeholder (Yellow)
   * Represents the desired/target dimensions of the wall
   */
  static addTargetPlaceholder(
    wallGroup: THREE.Group,
    width: number,
    height: number,
    length: number
  ): void {
    // Center of box is at (width/2, height/2, 0) relative to bottom-left pivot
    const mesh = this.createPlaceholderMesh(width, height, length, 0xffff00, 0.5);
    mesh.position.set(width / 2, height / 2, 0);
    mesh.name = 'TargetWallPlaceholder';
    wallGroup.add(mesh);

    // Add pivot point indicator at the bottom-left corner
    const pivotIndicator = this.createPivotIndicator();
    pivotIndicator.position.set(0, 0, 0);
    wallGroup.add(pivotIndicator);
  }

  /**
   * Adds the "Actual Wall" placeholder (Green)
   * Represents the actual built dimensions (truncated to block count)
   */
  static addActualPlaceholder(
    wallGroup: THREE.Group,
    targetLength: number
  ): void {
    const actualWidth = wallGroup.userData.actualWallWidth || 0;
    const actualHeight = wallGroup.userData.actualWallHeight || 0;

    if (actualWidth === 0 || actualHeight === 0) {
      return;
    }

    // Center of box is at (actualWidth/2, actualHeight/2, 0)
    const mesh = this.createPlaceholderMesh(actualWidth, actualHeight, targetLength, 0x00ff00, 0.5);
    mesh.position.set(actualWidth / 2, actualHeight / 2, 0);
    mesh.name = 'ActualWallPlaceholder';

    wallGroup.add(mesh);
  }

  /**
   * Creates visualization meshes for an opening showing both original and snapped bounds
   *
   * @param originalMesh The original opening mesh (exact params, for red visualization)
   * @param snappedVisMesh The snapped visualization mesh (exact snapped dims, for blue visualization)
   * @param mode Visualization mode
   * @returns Object with red (original) and blue (snapped) visualization meshes, or null if mode is 'none'
   */
  static createOpeningVisualization(
    originalMesh: THREE.Mesh,
    snappedVisMesh: THREE.Mesh,
    mode: VisualizationMode
  ): { originalVisMesh: THREE.Mesh; snappedVisMesh: THREE.Mesh } | null {
    if (mode === 'none') {
      return null;
    }

    // Red mesh: Original opening from parameters (exact size)
    const originalVisMeshClone = originalMesh.clone();
    if (mode === 'wireframe') {
      originalVisMeshClone.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    } else {
      originalVisMeshClone.material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5 });
    }
    originalVisMeshClone.name = 'OpeningVisualization_Original';

    // Blue mesh: Snapped opening (row-aligned, exact snapped dimensions)
    const snappedVisMeshClone = snappedVisMesh.clone();
    if (mode === 'wireframe') {
      snappedVisMeshClone.material = new THREE.MeshBasicMaterial({ color: 0x0066ff, wireframe: true });
    } else {
      snappedVisMeshClone.material = new THREE.MeshBasicMaterial({ color: 0x0066ff, transparent: true, opacity: 0.35 });
    }
    snappedVisMeshClone.name = 'OpeningVisualization_Snapped';

    return { originalVisMesh: originalVisMeshClone, snappedVisMesh: snappedVisMeshClone };
  }
}
