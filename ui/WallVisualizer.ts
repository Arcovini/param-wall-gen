import * as THREE from 'three';
import type { VisualizationMode } from '../types';
import type { Bounds3D } from '../wall-generator';

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
   * Represents the actual built dimensions (truncated to block count).
   * Caller should obtain actualWidth/actualHeight from getActualWallDimensions(params), not from the group.
   */
  static addActualPlaceholder(
    wallGroup: THREE.Group,
    targetLength: number,
    actualWidth: number,
    actualHeight: number
  ): void {
    if (actualWidth <= 0 || actualHeight <= 0) {
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

  /**
   * Adds a centroid marker (sphere) as child of wallGroup. Uses userData.modelParams.centroid (local space).
   */
  static addCentroidMarker(wallGroup: THREE.Group): void {
    const modelParams = wallGroup.userData?.modelParams;
    if (!modelParams?.centroid) return;
    const c = modelParams.centroid;
    const geometry = new THREE.SphereGeometry(0.06, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(c.x, c.y, c.z);
    mesh.name = 'DebugCentroid';
    wallGroup.add(mesh);
  }

  /**
   * Adds four keypoint markers (small spheres) as children of wallGroup. Uses userData.modelParams.keypoints (local space).
   */
  static addKeypointsMarkers(wallGroup: THREE.Group): void {
    const modelParams = wallGroup.userData?.modelParams;
    if (!modelParams?.keypoints) return;
    const kp = modelParams.keypoints;
    const color = 0x00ffff;
    const geometry = new THREE.SphereGeometry(0.04, 12, 12);
    const material = new THREE.MeshBasicMaterial({ color });
    const points = [kp.bottomLeft, kp.topLeft, kp.bottomRight, kp.topRight] as const;
    const names = ['DebugKP_BL', 'DebugKP_TL', 'DebugKP_BR', 'DebugKP_TR'] as const;
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const m = new THREE.Mesh(geometry.clone(), material.clone());
      m.position.set(p.x, p.y, p.z);
      m.name = names[i];
      wallGroup.add(m);
    }
  }

  /**
   * Creates a group containing wireframe boxes for bounds (world space). Caller must add to scene and remove on cleanup.
   */
  static createBoundsDebugGroup(bounds: {
    completed?: Bounds3D;
    execution?: Bounds3D;
    openings?: Bounds3D[];
    openingsExpanded?: Bounds3D[];
  }): THREE.Group {
    const group = new THREE.Group();
    group.name = 'DebugBounds';

    const addBox = (b: Bounds3D, color: number, name: string): void => {
      const box = new THREE.Box3(
        new THREE.Vector3(b.min.x, b.min.y, b.min.z),
        new THREE.Vector3(b.max.x, b.max.y, b.max.z)
      );
      const helper = new THREE.Box3Helper(box, color);
      helper.name = name;
      group.add(helper);
    };

    if (bounds.completed) {
      addBox(bounds.completed, 0xffff00, 'BoundsCompleted');
    }
    if (bounds.execution) {
      addBox(bounds.execution, 0x00ff00, 'BoundsExecution');
    }
    if (bounds.openings?.length) {
      bounds.openings.forEach((b, i) => addBox(b, 0xff6600, `BoundsOpening_${i}`));
    }
    if (bounds.openingsExpanded?.length) {
      bounds.openingsExpanded.forEach((b, i) => addBox(b, 0x888888, `BoundsOpeningExpanded_${i}`));
    }

    return group;
  }
}
