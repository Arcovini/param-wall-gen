/**
 * OpeningUI - Manages the dynamic UI for wall openings
 */
export interface OpeningData {
  id: string;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  length: number;
}

export class OpeningUI {
  private container: HTMLElement;
  private openings: OpeningData[] = [];
  private onUpdate: (openings: OpeningData[]) => void;

  constructor(containerId: string, onUpdate: (openings: OpeningData[]) => void) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
    this.container = container;
    this.onUpdate = onUpdate;
  }

  /**
   * Adds a new opening to the UI and state
   */
  public addOpening(): void {
    const id = `opening-${Date.now()}`;
    const opening: OpeningData = {
      id,
      x: 0,
      y: 0,
      z: 0,
      width: 1.0,
      height: 1.0,
      length: 0.2
    };

    this.openings.push(opening);
    this.renderOpening(opening);
    this.onUpdate(this.openings);
  }

  /**
   * Renders the UI for a single opening
   */
  private renderOpening(opening: OpeningData): void {
    const subsection = document.createElement('div');
    subsection.className = 'subsection opening-subsection';
    subsection.id = opening.id;

    const title = document.createElement('div');
    title.className = 'subsection-title';
    title.textContent = `Opening ${this.openings.indexOf(opening) + 1}`;

    // Add remove button to title
    const removeBtn = document.createElement('span');
    removeBtn.className = 'remove-opening';
    removeBtn.textContent = '×';
    removeBtn.title = 'Remove Opening';
    removeBtn.onclick = (e) => {
      e.stopPropagation();
      this.removeOpening(opening.id);
    };
    title.appendChild(removeBtn);
    subsection.appendChild(title);

    // Placement Inputs
    this.createInputGroup(subsection, opening, 'x', 'x (Position)', 0.1);
    this.createInputGroup(subsection, opening, 'y', 'y (Position)', 0.1);
    this.createInputGroup(subsection, opening, 'z', 'z (Position)', 0.1);

    // Size Inputs
    this.createInputGroup(subsection, opening, 'width', 'w (Width)', 0.1, 0.1);
    this.createInputGroup(subsection, opening, 'height', 'h (Height)', 0.1, 0.1);
    this.createInputGroup(subsection, opening, 'length', 'l (Length)', 0.1, 0.1);

    this.container.appendChild(subsection);
  }

  /**
   * Helper to create an input group
   */
  private createInputGroup(
    parent: HTMLElement,
    opening: OpeningData,
    key: keyof OpeningData,
    labelText: string,
    step: number,
    min?: number
  ): void {
    const group = document.createElement('div');
    group.className = 'control-group';

    const label = document.createElement('label');
    label.textContent = labelText;
    group.appendChild(label);

    const input = document.createElement('input');
    input.type = 'number';
    input.step = step.toString();
    input.value = opening[key].toString();
    if (min !== undefined) {
      input.min = min.toString();
    }

    input.addEventListener('input', () => {
      // Update state
      (opening as any)[key] = parseFloat(input.value) || 0;
      this.onUpdate(this.openings);
    });

    group.appendChild(input);
    parent.appendChild(group);
  }

  /**
   * Removes an opening from UI and state
   */
  private removeOpening(id: string): void {
    const index = this.openings.findIndex(o => o.id === id);
    if (index !== -1) {
      this.openings.splice(index, 1);
      const element = document.getElementById(id);
      if (element) {
        element.remove();
      }
      // Renumber remaining openings
      this.updateTitles();
      this.onUpdate(this.openings);
    }
  }

  /**
   * Updates titles of all openings to reflect their current index
   */
  private updateTitles(): void {
    this.openings.forEach((opening, index) => {
      const element = document.getElementById(opening.id);
      if (element) {
        const title = element.querySelector('.subsection-title');
        if (title) {
          // Keep the remove button
          const removeBtn = title.querySelector('.remove-opening');
          title.textContent = `Opening ${index + 1}`;
          if (removeBtn) {
            title.appendChild(removeBtn);
          }
        }
      }
    });
  }

  /**
   * Returns the current list of openings
   */
  public getOpenings(): OpeningData[] {
    return this.openings;
  }
}
