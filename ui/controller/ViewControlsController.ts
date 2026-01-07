/**
 * ViewControlsController - Logic for view mode, test scenarios, and add opening
 */

import { ViewControlsView } from '../view/ViewControlsView';
import { OpeningsController } from './OpeningsController';
import { WallParametersController } from './WallParametersController';
import { getTestScenario } from '../../utils/test-scenarios';

export type ViewMode = 'block' | 'row' | 'wall' | 'wall-output';

export class ViewControlsController {
  private view: ViewControlsView;
  private onUpdate: () => void;
  private openingsController: OpeningsController;
  private wallParamsController: WallParametersController;
  private onViewModeChangeCallback: ((mode: ViewMode) => void) | null = null;

  constructor(
    onUpdate: () => void,
    openingsController: OpeningsController,
    wallParamsController: WallParametersController
  ) {
    this.onUpdate = onUpdate;
    this.openingsController = openingsController;
    this.wallParamsController = wallParamsController;
    this.view = new ViewControlsView();

    this.setupEventHandlers();

    // Load test scenario 5 by default (multiple openings)
    this.loadTestScenario(5);
  }

  private setupEventHandlers(): void {
    this.view.onViewModeChange((mode) => {
      if (this.onViewModeChangeCallback) {
        this.onViewModeChangeCallback(mode as ViewMode);
      }
      this.onUpdate();
    });

    this.view.onTestButtonClick((testIdentifier) => {
      if (testIdentifier === 'clear') {
        this.clearTest();
      } else {
        this.loadTestScenario(parseInt(testIdentifier));
      }
    });

    this.view.onAddOpeningClick(() => {
      this.openingsController.addOpening();
    });
  }

  onViewModeChange(callback: (mode: ViewMode) => void): void {
    this.onViewModeChangeCallback = callback;
  }

  getViewMode(): ViewMode {
    return this.view.getViewMode() as ViewMode;
  }

  loadTestScenario(testNumber: number): void {
    const wallParams = this.wallParamsController.getWallParams();
    const scenario = getTestScenario(testNumber, wallParams.wallHeight);

    this.view.setTestDescription(
      `<strong>${scenario.name}</strong><br>${scenario.description}`
    );

    this.openingsController.clearAll();

    scenario.openings.forEach((opening: any) => {
      this.openingsController.addOpening({
        x: opening.placement.position.x,
        y: opening.placement.position.y,
        z: opening.placement.position.z,
        width: opening.size.l,
        height: opening.size.h,
        length: opening.size.w
      });
    });

    this.view.setActiveTestButton(testNumber);
    this.onUpdate();
  }

  clearTest(): void {
    this.openingsController.clearAll();
    this.view.setActiveTestButton(null);
    this.view.setTestDescription('');
    this.onUpdate();
  }
}
