/**
 * ViewControlsView - DOM management for view mode, test scenarios, and add opening button
 */

export class ViewControlsView {
  private viewModeSelect: HTMLSelectElement | null;
  private testButtons: NodeListOf<Element>;
  private testDescription: HTMLElement | null;
  private addOpeningBtn: HTMLElement | null;

  constructor() {
    this.viewModeSelect = document.getElementById('view-mode-select') as HTMLSelectElement;
    this.testButtons = document.querySelectorAll('.test-button');
    this.testDescription = document.getElementById('test-description');
    this.addOpeningBtn = document.getElementById('add-opening-btn');
  }

  onViewModeChange(callback: (mode: string) => void): void {
    this.viewModeSelect?.addEventListener('change', () => {
      callback(this.viewModeSelect!.value);
    });
  }

  getViewMode(): string {
    return this.viewModeSelect?.value ?? 'wall';
  }

  onTestButtonClick(callback: (testIdentifier: string) => void): void {
    this.testButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const testIdentifier = button.getAttribute('data-test');
        if (testIdentifier) {
          callback(testIdentifier);
        }
      });
    });
  }

  setActiveTestButton(testNumber: number | null): void {
    this.testButtons.forEach((btn) => {
      const button = btn as HTMLElement;
      const testId = button.getAttribute('data-test');
      if (testId && testId !== 'clear') {
        if (parseInt(testId) === testNumber) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      }
    });
  }

  setTestDescription(html: string): void {
    if (this.testDescription) {
      this.testDescription.innerHTML = html;
    }
  }

  onAddOpeningClick(callback: () => void): void {
    this.addOpeningBtn?.addEventListener('click', callback);
  }
}
