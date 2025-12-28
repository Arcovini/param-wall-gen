/**
 * PlaceholdersView - DOM management for wireframe and placeholder toggles
 */

const LABEL_STYLES = {
  active: { fontWeight: 'bold', color: '#333' },
  inactive: { fontWeight: 'normal', color: '#666' }
} as const;

export class PlaceholdersView {
  private wireframeToggle: HTMLInputElement | null;
  private wireframeLabel: HTMLElement | null;
  private placeholderToggle: HTMLInputElement | null;
  private placeholderLabel: HTMLElement | null;
  private actualWallToggle: HTMLInputElement | null;
  private actualWallLabel: HTMLElement | null;

  private placeholderControl: HTMLElement | null;
  private actualWallControl: HTMLElement | null;

  constructor() {
    this.wireframeToggle = document.getElementById('wireframe-toggle') as HTMLInputElement;
    this.wireframeLabel = document.getElementById('label-wireframe');
    this.placeholderToggle = document.getElementById('placeholder-toggle') as HTMLInputElement;
    this.placeholderLabel = document.getElementById('label-placeholder');
    this.actualWallToggle = document.getElementById('actual-wall-toggle') as HTMLInputElement;
    this.actualWallLabel = document.getElementById('label-actual-wall');

    this.placeholderControl = document.getElementById('wall-placeholder-control');
    this.actualWallControl = document.getElementById('actual-wall-control');
  }

  onWireframeChange(callback: (checked: boolean) => void): void {
    this.wireframeToggle?.addEventListener('change', () => {
      this.updateLabelStyle(this.wireframeLabel, this.wireframeToggle!.checked);
      callback(this.wireframeToggle!.checked);
    });
  }

  onPlaceholderChange(callback: (checked: boolean) => void): void {
    this.placeholderToggle?.addEventListener('change', () => {
      this.updateLabelStyle(this.placeholderLabel, this.placeholderToggle!.checked);
      callback(this.placeholderToggle!.checked);
    });
  }

  onActualWallChange(callback: (checked: boolean) => void): void {
    this.actualWallToggle?.addEventListener('change', () => {
      this.updateLabelStyle(this.actualWallLabel, this.actualWallToggle!.checked);
      callback(this.actualWallToggle!.checked);
    });
  }

  private updateLabelStyle(label: HTMLElement | null, isActive: boolean): void {
    if (!label) return;
    const style = isActive ? LABEL_STYLES.active : LABEL_STYLES.inactive;
    label.style.fontWeight = style.fontWeight;
    label.style.color = style.color;
  }

  setControlsVisibility(isWallOutputMode: boolean): void {
    if (this.placeholderControl) {
      this.placeholderControl.style.display = isWallOutputMode ? 'none' : '';
    }
    if (this.actualWallControl) {
      this.actualWallControl.style.display = isWallOutputMode ? 'none' : '';
    }
  }

  isWireframeChecked(): boolean {
    return this.wireframeToggle?.checked ?? false;
  }

  isPlaceholderChecked(): boolean {
    return this.placeholderToggle?.checked ?? true;
  }

  isActualWallChecked(): boolean {
    return this.actualWallToggle?.checked ?? false;
  }
}
