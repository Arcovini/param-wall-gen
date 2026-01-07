/**
 * UIController - Main coordinator that composes sub-controllers
 */

import * as THREE from 'three';
import { PlaceholdersController } from './controller/PlaceholdersController';
import { WallParametersController, WallParams } from './controller/WallParametersController';
import { OpeningsController, type OpeningData } from './controller/OpeningsController';
import { ViewControlsController, type ViewMode } from './controller/ViewControlsController';

export type { OpeningData };

export class UIController {
  private placeholders: PlaceholdersController;
  private wallParams: WallParametersController;
  private openings: OpeningsController;
  private viewControls: ViewControlsController;

  constructor(onUpdate: () => void, scene: THREE.Scene) {
    // Initialize sub-controllers
    this.placeholders = new PlaceholdersController(onUpdate, scene);
    this.wallParams = new WallParametersController(onUpdate);
    this.openings = new OpeningsController('openings-container', () => {
      console.log('Openings updated:', this.openings.getOpenings());
      onUpdate();
    });
    this.viewControls = new ViewControlsController(
      onUpdate,
      this.openings,
      this.wallParams
    );

    // Wire up cross-domain visibility updates
    this.viewControls.onViewModeChange((mode) => {
      this.placeholders.updateVisibilityForViewMode(mode);
      this.openings.setControlVisibility(mode !== 'wall-output');
    });

    // Initialize visibility based on current view mode
    const currentMode = this.viewControls.getViewMode();
    this.placeholders.updateVisibilityForViewMode(currentMode);
    this.openings.setControlVisibility(currentMode !== 'wall-output');
  }

  // Delegate to WallParametersController
  getWallParams(): WallParams {
    const params = this.wallParams.getWallParams();
    console.log("UIController Params:", params);
    return params;
  }

  setWallParams(params: Partial<WallParams>): void {
    this.wallParams.setWallParams(params);
  }

  // Delegate to OpeningsController
  getOpenings(): OpeningData[] {
    return this.openings.getOpenings();
  }

  getVisualizationMode(): 'red' | 'wireframe' | 'none' {
    return this.openings.getVisualizationMode();
  }

  // Delegate to PlaceholdersController
  getShowPlaceholder(): boolean {
    return this.placeholders.getShowPlaceholder();
  }

  getShowActualWall(): boolean {
    return this.placeholders.getShowActualWall();
  }

  getWireframeEnabled(): boolean {
    return this.placeholders.getWireframeEnabled();
  }

  setFloor(floor: THREE.Mesh): void {
    this.placeholders.setFloor(floor);
  }

  // Delegate to ViewControlsController
  getViewMode(): ViewMode {
    return this.viewControls.getViewMode();
  }
}
