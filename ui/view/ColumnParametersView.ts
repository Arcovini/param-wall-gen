/**
 * ColumnParametersView - DOM management for column parameter inputs
 */

export class ColumnParametersView {
  // Column dimension inputs
  private columnWidthInput: HTMLInputElement | null;
  private columnHeightInput: HTMLInputElement | null;
  private columnDepthInput: HTMLInputElement | null;

  // Position inputs
  private positionXInput: HTMLInputElement | null;
  private positionYInput: HTMLInputElement | null;
  private positionZInput: HTMLInputElement | null;

  // Rotation
  private rotationYawInput: HTMLInputElement | null;

  // Collapsible section
  private columnParamsTitle: HTMLElement | null;

  constructor() {
    this.columnWidthInput = document.getElementById('column-width') as HTMLInputElement;
    this.columnHeightInput = document.getElementById('column-height') as HTMLInputElement;
    this.columnDepthInput = document.getElementById('column-depth') as HTMLInputElement;

    this.positionXInput = document.getElementById('column-position-x') as HTMLInputElement;
    this.positionYInput = document.getElementById('column-position-y') as HTMLInputElement;
    this.positionZInput = document.getElementById('column-position-z') as HTMLInputElement;

    this.rotationYawInput = document.getElementById('column-rotation-yaw') as HTMLInputElement;

    this.columnParamsTitle = document.getElementById('column-params-title');

    this.setupCollapsibleSection();
  }

  onInputChange(callback: () => void): void {
    const inputs = [
      this.columnWidthInput, this.columnHeightInput, this.columnDepthInput,
      this.positionXInput, this.positionYInput, this.positionZInput,
      this.rotationYawInput
    ];

    inputs.forEach(input => {
      input?.addEventListener('input', callback);
    });
  }

  private setupCollapsibleSection(): void {
    this.columnParamsTitle?.addEventListener('click', () => {
      const section = this.columnParamsTitle!.closest('.control-section');
      if (section) {
        section.classList.toggle('collapsed');
      }
    });
  }

  // Getters for raw input values
  getColumnWidthValue(): string { return this.columnWidthInput?.value ?? ''; }
  getColumnHeightValue(): string { return this.columnHeightInput?.value ?? ''; }
  getColumnDepthValue(): string { return this.columnDepthInput?.value ?? ''; }

  getPositionXValue(): string { return this.positionXInput?.value ?? ''; }
  getPositionYValue(): string { return this.positionYInput?.value ?? ''; }
  getPositionZValue(): string { return this.positionZInput?.value ?? ''; }

  getRotationYawValue(): string { return this.rotationYawInput?.value ?? ''; }

  // Setters for programmatic updates
  setColumnWidth(value: number): void {
    if (this.columnWidthInput) this.columnWidthInput.value = value.toString();
  }

  setColumnHeight(value: number): void {
    if (this.columnHeightInput) this.columnHeightInput.value = value.toString();
  }

  setColumnDepth(value: number): void {
    if (this.columnDepthInput) this.columnDepthInput.value = value.toString();
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
