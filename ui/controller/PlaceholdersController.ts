/**
 * PlaceholdersController - Logic for wireframe and placeholder toggles
 */

import * as THREE from 'three';
import { PlaceholdersView } from '../view/PlaceholdersView';
import { SceneUtils } from '../SceneUtils';

export class PlaceholdersController {
  private view: PlaceholdersView;
  private onUpdate: () => void;
  private scene: THREE.Scene;
  private floor: THREE.Mesh | null = null;

  constructor(onUpdate: () => void, scene: THREE.Scene) {
    this.onUpdate = onUpdate;
    this.scene = scene;
    this.view = new PlaceholdersView();

    this.setupEventHandlers();
  }

  setFloor(floor: THREE.Mesh): void {
    this.floor = floor;
  }

  private setupEventHandlers(): void {
    this.view.onWireframeChange((checked) => {
      SceneUtils.setWireframeMode(this.scene, checked);
    });

    this.view.onPlaceholderChange(() => {
      this.onUpdate();
    });

    this.view.onActualWallChange(() => {
      this.onUpdate();
    });

    this.view.onFloorChange((checked) => {
      this.updateFloorVisibility(checked);
    });
  }

  private updateFloorVisibility(visible: boolean): void {
    if (!this.floor) return;
    if (visible && !this.floor.parent) {
      this.scene.add(this.floor);
    } else if (!visible && this.floor.parent) {
      this.scene.remove(this.floor);
    }
  }

  getShowPlaceholder(): boolean {
    return this.view.isPlaceholderChecked();
  }

  getShowActualWall(): boolean {
    return this.view.isActualWallChecked();
  }

  getWireframeEnabled(): boolean {
    return this.view.isWireframeChecked();
  }

  updateVisibilityForViewMode(viewMode: string): void {
    const isWallOutputMode = viewMode === 'wall-output';
    this.view.setControlsVisibility(isWallOutputMode);
  }
}
