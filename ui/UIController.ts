/**
 * UIController - Main coordinator that composes sub-controllers
 */

import * as THREE from 'three';
import { PlaceholdersController } from './controller/PlaceholdersController';
import { WallParametersController, WallParams } from './controller/WallParametersController';
import { ColumnParametersController, ColumnParams } from './controller/ColumnParametersController';
import { OpeningsController, type OpeningData } from './controller/OpeningsController';
import { ViewControlsController, type ViewMode } from './controller/ViewControlsController';

export type { OpeningData };
export type { ColumnParams };
export type GeneratorMode = 'wall' | 'column';

export class UIController {
  private placeholders: PlaceholdersController;
  private wallParams: WallParametersController;
  private columnParams: ColumnParametersController;
  private openings: OpeningsController;
  private viewControls: ViewControlsController;
  private generatorMode: GeneratorMode = 'wall';

  // DOM references for generator mode toggle
  private generatorModeSelect: HTMLSelectElement | null;
  private wallParamsSection: HTMLElement | null;
  private columnParamsSection: HTMLElement | null;
  private openingsSection: HTMLElement | null;

  constructor(onUpdate: () => void, scene: THREE.Scene) {
    // Initialize sub-controllers
    this.placeholders = new PlaceholdersController(onUpdate, scene);
    this.wallParams = new WallParametersController(onUpdate);
    this.columnParams = new ColumnParametersController(onUpdate);
    this.openings = new OpeningsController('openings-container', () => {
      console.log('Openings updated:', this.openings.getOpenings());
      onUpdate();
    });
    this.viewControls = new ViewControlsController(
      onUpdate,
      this.openings,
      this.wallParams
    );

    // Get DOM references for generator mode toggle
    this.generatorModeSelect = document.getElementById('generator-mode-select') as HTMLSelectElement;
    this.wallParamsSection = document.getElementById('wall-params-section');
    this.columnParamsSection = document.getElementById('column-params-section');
    this.openingsSection = document.getElementById('openings-section');

    // Setup generator mode toggle
    this.setupGeneratorModeToggle(onUpdate);

    // Wire up cross-domain visibility updates
    this.viewControls.onViewModeChange((mode) => {
      this.placeholders.updateVisibilityForViewMode(mode);
      this.openings.setControlVisibility(mode !== 'wall-output' && this.generatorMode === 'wall');
    });

    // Initialize visibility based on current view mode
    const currentMode = this.viewControls.getViewMode();
    this.placeholders.updateVisibilityForViewMode(currentMode);
    this.openings.setControlVisibility(currentMode !== 'wall-output');
  }

  private setupGeneratorModeToggle(onUpdate: () => void): void {
    if (!this.generatorModeSelect) return;

    this.generatorModeSelect.addEventListener('change', () => {
      this.generatorMode = this.generatorModeSelect!.value as GeneratorMode;
      this.updateSectionVisibility();
      onUpdate();
    });
  }

  private updateSectionVisibility(): void {
    const isWallMode = this.generatorMode === 'wall';
    const isColumnMode = this.generatorMode === 'column';

    // Toggle wall params section
    if (this.wallParamsSection) {
      this.wallParamsSection.classList.toggle('hidden', !isWallMode);
    }

    // Toggle column params section
    if (this.columnParamsSection) {
      this.columnParamsSection.classList.toggle('hidden', !isColumnMode);
    }

    // Toggle openings section (only for walls)
    if (this.openingsSection) {
      this.openingsSection.classList.toggle('hidden', !isWallMode);
    }
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

  // Generator mode methods
  getGeneratorMode(): GeneratorMode {
    return this.generatorMode;
  }

  // Delegate to ColumnParametersController
  getColumnParams(): ColumnParams {
    return this.columnParams.getColumnParams();
  }

  setColumnParams(params: Partial<ColumnParams>): void {
    this.columnParams.setColumnParams(params);
  }
}
