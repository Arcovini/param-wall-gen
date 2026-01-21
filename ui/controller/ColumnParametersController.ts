/**
 * ColumnParametersController - Logic for column parameter inputs
 */

import { ColumnParametersView } from '../view/ColumnParametersView';

export interface ColumnParams {
  width: number;        // Column width (left-to-right)
  height: number;       // Column height (bottom-to-top)
  depth: number;        // Column depth (front-to-back)
  positionX: number;
  positionY: number;
  positionZ: number;
  yawDegrees: number;
}

const DEFAULTS: ColumnParams = {
  width: 0.3,
  height: 3.0,
  depth: 0.3,
  positionX: 0,
  positionY: 1.5,
  positionZ: 0,
  yawDegrees: 0
};

export class ColumnParametersController {
  private view: ColumnParametersView;
  private onUpdate: () => void;

  constructor(onUpdate: () => void) {
    this.onUpdate = onUpdate;
    this.view = new ColumnParametersView();

    this.view.onInputChange(() => this.onUpdate());
  }

  private parseFloatOrDefault(value: string, defaultValue: number): number {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  getColumnParams(): ColumnParams {
    return {
      width: this.parseFloatOrDefault(this.view.getColumnWidthValue(), DEFAULTS.width),
      height: this.parseFloatOrDefault(this.view.getColumnHeightValue(), DEFAULTS.height),
      depth: this.parseFloatOrDefault(this.view.getColumnDepthValue(), DEFAULTS.depth),
      positionX: this.parseFloatOrDefault(this.view.getPositionXValue(), DEFAULTS.positionX),
      positionY: this.parseFloatOrDefault(this.view.getPositionYValue(), DEFAULTS.positionY),
      positionZ: this.parseFloatOrDefault(this.view.getPositionZValue(), DEFAULTS.positionZ),
      yawDegrees: this.parseFloatOrDefault(this.view.getRotationYawValue(), DEFAULTS.yawDegrees)
    };
  }

  setColumnParams(params: Partial<ColumnParams>): void {
    if (params.width !== undefined) this.view.setColumnWidth(params.width);
    if (params.height !== undefined) this.view.setColumnHeight(params.height);
    if (params.depth !== undefined) this.view.setColumnDepth(params.depth);
    if (params.positionX !== undefined) this.view.setPositionX(params.positionX);
    if (params.positionY !== undefined) this.view.setPositionY(params.positionY);
    if (params.positionZ !== undefined) this.view.setPositionZ(params.positionZ);
    if (params.yawDegrees !== undefined) this.view.setRotationYaw(params.yawDegrees);

    this.onUpdate();
  }

  getDefaults(): ColumnParams {
    return { ...DEFAULTS };
  }
}
