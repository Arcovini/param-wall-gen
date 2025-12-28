/**
 * PlaceholdersController - Logic for wireframe and placeholder toggles
 */

import * as THREE from 'three';
import { PlaceholdersView } from '../view/PlaceholdersView';
import { SceneUtils } from '../../utils/SceneUtils';

export class PlaceholdersController {
  private view: PlaceholdersView;
  private onUpdate: () => void;
  private scene: THREE.Scene;

  constructor(onUpdate: () => void, scene: THREE.Scene) {
    this.onUpdate = onUpdate;
    this.scene = scene;
    this.view = new PlaceholdersView();

    this.setupEventHandlers();
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
