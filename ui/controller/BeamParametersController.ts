/**
 * BeamParametersController - Logic for beam parameter inputs
 */

import { BeamParametersView } from '../view/BeamParametersView';

export interface BeamParams {
  width: number;        // Beam width (horizontal length)
  height: number;       // Beam height (vertical thickness)
  depth: number;        // Beam depth (front-to-back)
  positionX: number;
  positionY: number;
  positionZ: number;
  yawDegrees: number;
}

const DEFAULTS: BeamParams = {
  width: 3.0,
  height: 0.3,
  depth: 0.3,
  positionX: 0,
  positionY: 3.0,
  positionZ: 0,
  yawDegrees: 0
};

export class BeamParametersController {
  private view: BeamParametersView;
  private onUpdate: () => void;

  constructor(onUpdate: () => void) {
    this.onUpdate = onUpdate;
    this.view = new BeamParametersView();

    this.view.onInputChange(() => this.onUpdate());
  }

  private parseFloatOrDefault(value: string, defaultValue: number): number {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  getBeamParams(): BeamParams {
    return {
      width: this.parseFloatOrDefault(this.view.getBeamWidthValue(), DEFAULTS.width),
      height: this.parseFloatOrDefault(this.view.getBeamHeightValue(), DEFAULTS.height),
      depth: this.parseFloatOrDefault(this.view.getBeamDepthValue(), DEFAULTS.depth),
      positionX: this.parseFloatOrDefault(this.view.getPositionXValue(), DEFAULTS.positionX),
      positionY: this.parseFloatOrDefault(this.view.getPositionYValue(), DEFAULTS.positionY),
      positionZ: this.parseFloatOrDefault(this.view.getPositionZValue(), DEFAULTS.positionZ),
      yawDegrees: this.parseFloatOrDefault(this.view.getRotationYawValue(), DEFAULTS.yawDegrees)
    };
  }

  setBeamParams(params: Partial<BeamParams>): void {
    if (params.width !== undefined) this.view.setBeamWidth(params.width);
    if (params.height !== undefined) this.view.setBeamHeight(params.height);
    if (params.depth !== undefined) this.view.setBeamDepth(params.depth);
    if (params.positionX !== undefined) this.view.setPositionX(params.positionX);
    if (params.positionY !== undefined) this.view.setPositionY(params.positionY);
    if (params.positionZ !== undefined) this.view.setPositionZ(params.positionZ);
    if (params.yawDegrees !== undefined) this.view.setRotationYaw(params.yawDegrees);

    this.onUpdate();
  }

  getDefaults(): BeamParams {
    return { ...DEFAULTS };
  }
}
