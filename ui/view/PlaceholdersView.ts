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
  private floorToggle: HTMLInputElement | null;
  private floorLabel: HTMLElement | null;
  private debugCentroidToggle: HTMLInputElement | null;
  private debugKeypointsToggle: HTMLInputElement | null;
  private debugBoundsToggle: HTMLInputElement | null;

  private placeholderControl: HTMLElement | null;
  private actualWallControl: HTMLElement | null;
  private floorControl: HTMLElement | null;
  private debugControl: HTMLElement | null;

  constructor() {
    this.wireframeToggle = document.getElementById('wireframe-toggle') as HTMLInputElement;
    this.wireframeLabel = document.getElementById('label-wireframe');
    this.placeholderToggle = document.getElementById('placeholder-toggle') as HTMLInputElement;
    this.placeholderLabel = document.getElementById('label-placeholder');
    this.actualWallToggle = document.getElementById('actual-wall-toggle') as HTMLInputElement;
    this.actualWallLabel = document.getElementById('label-actual-wall');
    this.floorToggle = document.getElementById('floor-toggle') as HTMLInputElement;
    this.floorLabel = document.getElementById('label-floor');

    this.placeholderControl = document.getElementById('wall-placeholder-control');
    this.actualWallControl = document.getElementById('actual-wall-control');
    this.floorControl = document.getElementById('floor-control');
    this.debugControl = document.getElementById('debug-control');
    this.debugCentroidToggle = document.getElementById('debug-centroid-toggle') as HTMLInputElement;
    this.debugKeypointsToggle = document.getElementById('debug-keypoints-toggle') as HTMLInputElement;
    this.debugBoundsToggle = document.getElementById('debug-bounds-toggle') as HTMLInputElement;
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

  onFloorChange(callback: (checked: boolean) => void): void {
    this.floorToggle?.addEventListener('change', () => {
      this.updateLabelStyle(this.floorLabel, this.floorToggle!.checked);
      callback(this.floorToggle!.checked);
    });
  }

  onDebugCentroidChange(callback: () => void): void {
    this.debugCentroidToggle?.addEventListener('change', () => callback());
  }

  onDebugKeypointsChange(callback: () => void): void {
    this.debugKeypointsToggle?.addEventListener('change', () => callback());
  }

  onDebugBoundsChange(callback: () => void): void {
    this.debugBoundsToggle?.addEventListener('change', () => callback());
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
    if (this.debugControl) {
      this.debugControl.style.display = isWallOutputMode ? 'none' : '';
    }
  }

  isWireframeChecked(): boolean {
    return this.wireframeToggle?.checked ?? false;
  }

  isPlaceholderChecked(): boolean {
    return this.placeholderToggle?.checked ?? false;
  }

  isActualWallChecked(): boolean {
    return this.actualWallToggle?.checked ?? false;
  }

  isFloorChecked(): boolean {
    return this.floorToggle?.checked ?? false;
  }

  isDebugCentroidChecked(): boolean {
    return this.debugCentroidToggle?.checked ?? false;
  }

  isDebugKeypointsChecked(): boolean {
    return this.debugKeypointsToggle?.checked ?? false;
  }

  isDebugBoundsChecked(): boolean {
    return this.debugBoundsToggle?.checked ?? false;
  }
}
