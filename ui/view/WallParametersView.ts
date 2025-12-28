/**
 * WallParametersView - DOM management for wall parameter inputs
 */

export class WallParametersView {
  // Block inputs
  private blockWidthInput: HTMLInputElement | null;
  private blockHeightInput: HTMLInputElement | null;
  private cementThicknessInput: HTMLInputElement | null;

  // Wall dimension inputs
  private wallWidthInput: HTMLInputElement | null;
  private wallHeightInput: HTMLInputElement | null;
  private wallLengthInput: HTMLInputElement | null;

  // Position inputs
  private positionXInput: HTMLInputElement | null;
  private positionYInput: HTMLInputElement | null;
  private positionZInput: HTMLInputElement | null;

  // Rotation and completion
  private rotationYawInput: HTMLInputElement | null;
  private completionInput: HTMLInputElement | null;

  // Collapsible section
  private wallParamsTitle: HTMLElement | null;

  constructor() {
    this.blockWidthInput = document.getElementById('block-width') as HTMLInputElement;
    this.blockHeightInput = document.getElementById('block-height') as HTMLInputElement;
    this.cementThicknessInput = document.getElementById('cement-thickness') as HTMLInputElement;

    this.wallWidthInput = document.getElementById('wall-width') as HTMLInputElement;
    this.wallHeightInput = document.getElementById('wall-height') as HTMLInputElement;
    this.wallLengthInput = document.getElementById('wall-length') as HTMLInputElement;

    this.positionXInput = document.getElementById('position-x') as HTMLInputElement;
    this.positionYInput = document.getElementById('position-y') as HTMLInputElement;
    this.positionZInput = document.getElementById('position-z') as HTMLInputElement;

    this.rotationYawInput = document.getElementById('rotation-yaw') as HTMLInputElement;
    this.completionInput = document.getElementById('completion') as HTMLInputElement;

    this.wallParamsTitle = document.getElementById('wall-params-title');

    this.setupCollapsibleSection();
  }

  onInputChange(callback: () => void): void {
    const inputs = [
      this.blockWidthInput, this.blockHeightInput, this.cementThicknessInput,
      this.wallWidthInput, this.wallHeightInput, this.wallLengthInput,
      this.positionXInput, this.positionYInput, this.positionZInput,
      this.rotationYawInput, this.completionInput
    ];

    inputs.forEach(input => {
      input?.addEventListener('input', callback);
    });
  }

  private setupCollapsibleSection(): void {
    this.wallParamsTitle?.addEventListener('click', () => {
      const section = this.wallParamsTitle!.closest('.control-section');
      if (section) {
        section.classList.toggle('collapsed');
      }
    });
  }

  // Getters for raw input values
  getBlockWidthValue(): string { return this.blockWidthInput?.value ?? ''; }
  getBlockHeightValue(): string { return this.blockHeightInput?.value ?? ''; }
  getCementThicknessValue(): string { return this.cementThicknessInput?.value ?? ''; }

  getWallWidthValue(): string { return this.wallWidthInput?.value ?? ''; }
  getWallHeightValue(): string { return this.wallHeightInput?.value ?? ''; }
  getWallLengthValue(): string { return this.wallLengthInput?.value ?? ''; }

  getPositionXValue(): string { return this.positionXInput?.value ?? ''; }
  getPositionYValue(): string { return this.positionYInput?.value ?? ''; }
  getPositionZValue(): string { return this.positionZInput?.value ?? ''; }

  getRotationYawValue(): string { return this.rotationYawInput?.value ?? ''; }
  getCompletionValue(): string { return this.completionInput?.value ?? ''; }

  // Setters for programmatic updates
  setWallWidth(value: number): void {
    if (this.wallWidthInput) this.wallWidthInput.value = value.toString();
  }

  setWallHeight(value: number): void {
    if (this.wallHeightInput) this.wallHeightInput.value = value.toString();
  }

  setWallLength(value: number): void {
    if (this.wallLengthInput) this.wallLengthInput.value = value.toString();
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
