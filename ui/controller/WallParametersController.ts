/**
 * WallParametersController - Logic for wall parameter inputs
 */

import { WallParametersView } from '../view/WallParametersView';

export interface WallParams {
  blockWidth: number;
  blockHeight: number;
  cementThickness: number;
  wallWidth: number;
  wallHeight: number;
  wallLength: number;
  positionX: number;
  positionY: number;
  positionZ: number;
  yawDegrees: number;
  completionPercentage: number;
}

const DEFAULTS: WallParams = {
  blockWidth: 0.39,
  blockHeight: 0.14,
  cementThickness: 0.02,
  wallWidth: 4.0,
  wallHeight: 3.0,
  wallLength: 0.2,
  positionX: 0,
  positionY: 1.5,
  positionZ: 0,
  yawDegrees: 0,
  completionPercentage: 100
};

export class WallParametersController {
  private view: WallParametersView;
  private onUpdate: () => void;

  constructor(onUpdate: () => void) {
    this.onUpdate = onUpdate;
    this.view = new WallParametersView();

    this.view.onInputChange(() => this.onUpdate());
  }

  private parseFloatOrDefault(value: string, defaultValue: number): number {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  getWallParams(): WallParams {
    return {
      blockWidth: this.parseFloatOrDefault(this.view.getBlockWidthValue(), DEFAULTS.blockWidth),
      blockHeight: this.parseFloatOrDefault(this.view.getBlockHeightValue(), DEFAULTS.blockHeight),
      cementThickness: this.parseFloatOrDefault(this.view.getCementThicknessValue(), DEFAULTS.cementThickness),
      wallWidth: this.parseFloatOrDefault(this.view.getWallWidthValue(), DEFAULTS.wallWidth),
      wallHeight: this.parseFloatOrDefault(this.view.getWallHeightValue(), DEFAULTS.wallHeight),
      wallLength: this.parseFloatOrDefault(this.view.getWallLengthValue(), DEFAULTS.wallLength),
      positionX: this.parseFloatOrDefault(this.view.getPositionXValue(), DEFAULTS.positionX),
      positionY: this.parseFloatOrDefault(this.view.getPositionYValue(), DEFAULTS.positionY),
      positionZ: this.parseFloatOrDefault(this.view.getPositionZValue(), DEFAULTS.positionZ),
      yawDegrees: this.parseFloatOrDefault(this.view.getRotationYawValue(), DEFAULTS.yawDegrees),
      completionPercentage: this.parseFloatOrDefault(this.view.getCompletionValue(), DEFAULTS.completionPercentage)
    };
  }

  setWallParams(params: Partial<WallParams>): void {
    if (params.wallWidth !== undefined) this.view.setWallWidth(params.wallWidth);
    if (params.wallHeight !== undefined) this.view.setWallHeight(params.wallHeight);
    if (params.wallLength !== undefined) this.view.setWallLength(params.wallLength);
    if (params.positionX !== undefined) this.view.setPositionX(params.positionX);
    if (params.positionY !== undefined) this.view.setPositionY(params.positionY);
    if (params.positionZ !== undefined) this.view.setPositionZ(params.positionZ);
    if (params.yawDegrees !== undefined) this.view.setRotationYaw(params.yawDegrees);

    this.onUpdate();
  }

  getDefaults(): WallParams {
    return { ...DEFAULTS };
  }
}
