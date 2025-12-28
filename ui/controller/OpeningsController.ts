/**
 * OpeningsController - Logic for wall openings management
 */

import { OpeningsView, type OpeningData } from '../view/OpeningsView';

const OPENING_DEFAULTS = {
  x: 0,
  y: 0,
  z: 0,
  width: 1.0,   // 1 meter
  height: 1.0,  // 1 meter
  length: 1.0   // 1 meter (wall depth)
} as const;

export type { OpeningData };

export class OpeningsController {
  private view: OpeningsView;
  private openings: OpeningData[] = [];
  private visualizationMode: 'red' | 'wireframe' | 'none' = 'red';
  private onUpdate: (openings: OpeningData[]) => void;

  constructor(containerId: string, onUpdate: (openings: OpeningData[]) => void) {
    this.onUpdate = onUpdate;
    this.view = new OpeningsView(containerId);

    this.view.createVisualizationControl(
      this.visualizationMode,
      (mode) => {
        this.visualizationMode = mode as 'red' | 'wireframe' | 'none';
        this.onUpdate(this.openings);
      }
    );
  }

  addOpening(data?: Partial<Omit<OpeningData, 'id'>>): void {
    const id = `opening-${Date.now()}`;
    const opening: OpeningData = {
      id,
      x: data?.x ?? OPENING_DEFAULTS.x,
      y: data?.y ?? OPENING_DEFAULTS.y,
      z: data?.z ?? OPENING_DEFAULTS.z,
      width: data?.width ?? OPENING_DEFAULTS.width,
      height: data?.height ?? OPENING_DEFAULTS.height,
      length: data?.length ?? OPENING_DEFAULTS.length
    };

    this.openings.push(opening);

    this.view.renderOpening(
      opening,
      this.openings.length - 1,
      (key, value) => {
        (opening as any)[key] = value;
        this.onUpdate(this.openings);
      },
      () => this.removeOpening(opening.id)
    );

    this.onUpdate(this.openings);
  }

  removeOpening(id: string): void {
    const index = this.openings.findIndex(o => o.id === id);
    if (index === -1) return;

    this.openings.splice(index, 1);
    this.view.removeOpeningElement(id);
    this.view.refreshTitles(this.openings);
    this.onUpdate(this.openings);
  }

  clearAll(): void {
    this.view.clearAllElements(this.openings);
    this.openings = [];
    this.onUpdate(this.openings);
  }

  getOpenings(): OpeningData[] {
    return this.openings;
  }

  getVisualizationMode(): 'red' | 'wireframe' | 'none' {
    return this.visualizationMode;
  }

  setControlVisibility(visible: boolean): void {
    this.view.setControlVisibility(visible);
  }
}
