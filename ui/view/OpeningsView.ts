/**
 * OpeningsView - DOM management for wall openings
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

const VISUALIZATION_MODES = [
  { value: 'red', label: 'Red Placeholder' },
  { value: 'wireframe', label: 'Wireframe' },
  { value: 'none', label: 'None' }
] as const;

export class OpeningsView {
  private container: HTMLElement;
  private visualizationControl: HTMLElement | null = null;

  constructor(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
    this.container = container;
  }

  createVisualizationControl(
    initialMode: string,
    onModeChange: (mode: string) => void
  ): void {
    const controlDiv = document.createElement('div');
    controlDiv.id = 'opening-visualization-control';
    controlDiv.className = 'control-group visualization-control';
    controlDiv.style.marginBottom = '15px';
    controlDiv.style.padding = '10px';
    controlDiv.style.backgroundColor = '#f5f5f5';
    controlDiv.style.borderRadius = '4px';

    const label = document.createElement('label');
    label.textContent = 'Opening Visualization: ';
    label.style.marginRight = '10px';
    controlDiv.appendChild(label);

    const select = document.createElement('select');

    VISUALIZATION_MODES.forEach(mode => {
      const option = document.createElement('option');
      option.value = mode.value;
      option.textContent = mode.label;
      if (mode.value === initialMode) option.selected = true;
      select.appendChild(option);
    });

    select.addEventListener('change', () => {
      onModeChange(select.value);
    });

    controlDiv.appendChild(select);
    this.container.insertBefore(controlDiv, this.container.firstChild);
    this.visualizationControl = controlDiv;
  }

  renderOpening(
    opening: OpeningData,
    index: number,
    onInputChange: (key: keyof OpeningData, value: number) => void,
    onRemove: () => void
  ): void {
    const subsection = document.createElement('div');
    subsection.className = 'subsection opening-subsection';
    subsection.id = opening.id;

    const title = document.createElement('div');
    title.className = 'subsection-title';
    title.textContent = `Opening ${index + 1}`;

    const removeBtn = document.createElement('span');
    removeBtn.className = 'remove-opening';
    removeBtn.textContent = '×';
    removeBtn.title = 'Remove Opening';
    removeBtn.onclick = (e) => {
      e.stopPropagation();
      onRemove();
    };
    title.appendChild(removeBtn);
    subsection.appendChild(title);

    // Position inputs
    this.createInputGroup(subsection, opening, 'x', 'x (Position)', 0.1, undefined, onInputChange);
    this.createInputGroup(subsection, opening, 'y', 'y (Position)', 0.1, undefined, onInputChange);
    this.createInputGroup(subsection, opening, 'z', 'z (Position)', 0.1, undefined, onInputChange);

    // Size inputs
    this.createInputGroup(subsection, opening, 'width', 'w (Width)', 0.1, 0.1, onInputChange);
    this.createInputGroup(subsection, opening, 'height', 'h (Height)', 0.1, 0.1, onInputChange);
    this.createInputGroup(subsection, opening, 'length', 'l (Length)', 0.1, 0.1, onInputChange);

    this.container.appendChild(subsection);
  }

  private createInputGroup(
    parent: HTMLElement,
    opening: OpeningData,
    key: keyof OpeningData,
    labelText: string,
    step: number,
    min: number | undefined,
    onInputChange: (key: keyof OpeningData, value: number) => void
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
      onInputChange(key, parseFloat(input.value) || 0);
    });

    group.appendChild(input);
    parent.appendChild(group);
  }

  removeOpeningElement(id: string): void {
    document.getElementById(id)?.remove();
  }

  refreshTitles(openings: OpeningData[]): void {
    openings.forEach((opening, index) => {
      const element = document.getElementById(opening.id);
      if (element) {
        const title = element.querySelector('.subsection-title');
        if (title) {
          const removeBtn = title.querySelector('.remove-opening');
          title.textContent = `Opening ${index + 1}`;
          if (removeBtn) {
            title.appendChild(removeBtn);
          }
        }
      }
    });
  }

  clearAllElements(openings: OpeningData[]): void {
    openings.forEach((opening) => {
      document.getElementById(opening.id)?.remove();
    });
  }

  setControlVisibility(visible: boolean): void {
    if (this.visualizationControl) {
      this.visualizationControl.style.display = visible ? '' : 'none';
    }
  }
}
