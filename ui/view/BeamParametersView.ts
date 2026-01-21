/**
 * BeamParametersView - DOM management for beam parameter inputs
 */

export class BeamParametersView {
  // Beam dimension inputs
  private beamWidthInput: HTMLInputElement | null;
  private beamHeightInput: HTMLInputElement | null;
  private beamDepthInput: HTMLInputElement | null;

  // Position inputs
  private positionXInput: HTMLInputElement | null;
  private positionYInput: HTMLInputElement | null;
  private positionZInput: HTMLInputElement | null;

  // Rotation
  private rotationYawInput: HTMLInputElement | null;

  // Collapsible section
  private beamParamsTitle: HTMLElement | null;

  constructor() {
    this.beamWidthInput = document.getElementById('beam-width') as HTMLInputElement;
    this.beamHeightInput = document.getElementById('beam-height') as HTMLInputElement;
    this.beamDepthInput = document.getElementById('beam-depth') as HTMLInputElement;

    this.positionXInput = document.getElementById('beam-position-x') as HTMLInputElement;
    this.positionYInput = document.getElementById('beam-position-y') as HTMLInputElement;
    this.positionZInput = document.getElementById('beam-position-z') as HTMLInputElement;

    this.rotationYawInput = document.getElementById('beam-rotation-yaw') as HTMLInputElement;

    this.beamParamsTitle = document.getElementById('beam-params-title');

    this.setupCollapsibleSection();
  }

  onInputChange(callback: () => void): void {
    const inputs = [
      this.beamWidthInput, this.beamHeightInput, this.beamDepthInput,
      this.positionXInput, this.positionYInput, this.positionZInput,
      this.rotationYawInput
    ];

    inputs.forEach(input => {
      input?.addEventListener('input', callback);
    });
  }

  private setupCollapsibleSection(): void {
    this.beamParamsTitle?.addEventListener('click', () => {
      const section = this.beamParamsTitle!.closest('.control-section');
      if (section) {
        section.classList.toggle('collapsed');
      }
    });
  }

  // Getters for raw input values
  getBeamWidthValue(): string { return this.beamWidthInput?.value ?? ''; }
  getBeamHeightValue(): string { return this.beamHeightInput?.value ?? ''; }
  getBeamDepthValue(): string { return this.beamDepthInput?.value ?? ''; }

  getPositionXValue(): string { return this.positionXInput?.value ?? ''; }
  getPositionYValue(): string { return this.positionYInput?.value ?? ''; }
  getPositionZValue(): string { return this.positionZInput?.value ?? ''; }

  getRotationYawValue(): string { return this.rotationYawInput?.value ?? ''; }

  // Setters for programmatic updates
  setBeamWidth(value: number): void {
    if (this.beamWidthInput) this.beamWidthInput.value = value.toString();
  }

  setBeamHeight(value: number): void {
    if (this.beamHeightInput) this.beamHeightInput.value = value.toString();
  }

  setBeamDepth(value: number): void {
    if (this.beamDepthInput) this.beamDepthInput.value = value.toString();
  }

  setPositionX(value: number): void {
    if (this.positionXInput) this.positionXInput.value = value.toString();
  }

  setPositionY(value: number): void {
    if (this.positionYInput) this.positionYInput.value = value.toString();
  }

  setPositionZ(value: number): void {
    if (this.positionZInput) this.positionZInput.value = value.toString();
  }

  setRotationYaw(value: number): void {
    if (this.rotationYawInput) this.rotationYawInput.value = value.toString();
  }
}
