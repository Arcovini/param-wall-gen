import type {
  ProjectConfiguration,
  ConfigProject,
  ConfigSite,
  ConfigBuilding,
  ConfigStorey,
  ConfigSpace,
  ConfigWall,
  ExtractedWall
} from '../types';

/**
 * UploadConfiguration - UI component for uploading JSON wall configuration files
 * Creates a file upload interface positioned below the "Wall Configurator" heading
 */
export class UploadConfiguration {
  private container: HTMLDivElement;
  private fileInput: HTMLInputElement;
  private onWallsLoaded: ((walls: ExtractedWall[]) => void) | null = null;

  constructor() {
    this.container = this.createContainer();
    this.fileInput = this.createFileInput();
    this.setupUI();
    this.appendToDOM();
  }

  /**
   * Creates the main container element styled as a control-section
   */
  private createContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.id = 'upload-configuration';
    container.className = 'control-section';
    container.style.cssText = `
      margin-bottom: 25px;
      padding: 15px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 12px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
      border: 1px solid rgba(0, 0, 0, 0.05);
    `;
    return container;
  }

  /**
   * Creates the hidden file input element
   */
  private createFileInput(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.style.display = 'none';
    input.id = 'config-file-input';

    input.addEventListener('change', this.handleFileSelect.bind(this));

    return input;
  }

  /**
   * Sets up the UI elements
   */
  private setupUI(): void {
    // Section title
    const sectionTitle = document.createElement('div');
    sectionTitle.className = 'section-title';
    sectionTitle.textContent = 'Upload Configuration';
    sectionTitle.style.cssText = `
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #ddd;
    `;

    // Control group container
    const controlGroup = document.createElement('div');
    controlGroup.className = 'control-group';

    // Label
    const label = document.createElement('label');
    label.textContent = 'Upload a .json wall configuration file';
    label.style.cssText = `
      display: block;
      margin-bottom: 8px;
      color: #555;
      font-size: 14px;
      font-weight: 500;
    `;

    // Upload button
    const uploadButton = document.createElement('button');
    uploadButton.textContent = 'Choose File';
    uploadButton.className = 'action-button';
    uploadButton.style.cssText = `
      width: 100%;
      padding: 10px;
      background-color: #4a90d9;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: background-color 0.2s;
    `;

    uploadButton.addEventListener('mouseenter', () => {
      uploadButton.style.backgroundColor = '#3a7fc8';
    });

    uploadButton.addEventListener('mouseleave', () => {
      uploadButton.style.backgroundColor = '#4a90d9';
    });

    uploadButton.addEventListener('click', () => {
      this.fileInput.click();
    });

    // Status text
    const statusText = document.createElement('span');
    statusText.id = 'upload-status';
    statusText.style.cssText = `
      display: none;
      margin-top: 8px;
      font-size: 12px;
      color: #666;
    `;

    // Append elements
    controlGroup.appendChild(label);
    controlGroup.appendChild(this.fileInput);
    controlGroup.appendChild(uploadButton);
    controlGroup.appendChild(statusText);

    this.container.appendChild(sectionTitle);
    this.container.appendChild(controlGroup);
  }

  /**
   * Appends the container to the DOM after the "Wall Configurator" heading
   */
  private appendToDOM(): void {
    const controlsContent = document.querySelector('.controls-content');
    const heading = controlsContent?.querySelector('h2');

    if (heading && heading.nextSibling) {
      controlsContent?.insertBefore(this.container, heading.nextSibling);
    } else if (controlsContent) {
      controlsContent.appendChild(this.container);
    } else {
      document.body.appendChild(this.container);
    }
  }

  /**
   * Extracts all walls from the configuration, computing world positions
   */
  private extractWalls(config: ProjectConfiguration): ExtractedWall[] {
    const walls: ExtractedWall[] = [];

    // Convert from IFC coordinate system (Z-up) to Three.js coordinate system (Y-up)
    // IFC: X = horizontal, Y = horizontal (depth), Z = vertical (height)
    // Three.js: X = horizontal, Y = vertical (height), Z = horizontal (depth)
    const getPos = (pos?: { x: number; y: number; z: number } | null) => ({
      x: pos?.x ?? 0,
      y: pos?.z ?? 0,  // IFC Z becomes Three.js Y (vertical)
      z: pos?.y ?? 0   // IFC Y becomes Three.js Z (depth)
    });

    const getYaw = (dir?: { yaw: number } | null) => dir?.yaw ?? 0;

    const addPos = (a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }) => ({
      x: a.x + b.x,
      y: a.y + b.y,
      z: a.z + b.z
    });

    const processWall = (
      wall: ConfigWall,
      parentPos: { x: number; y: number; z: number },
      parentYaw: number
    ) => {
      const wallPos = getPos(wall.position);
      const wallYaw = getYaw(wall.direction);

      walls.push({
        id: wall.id,
        name: wall.name,
        size: { ...wall.size },
        worldPosition: addPos(parentPos, wallPos),
        worldYaw: parentYaw + wallYaw
      });
    };

    const processSpace = (
      space: ConfigSpace,
      parentPos: { x: number; y: number; z: number },
      parentYaw: number
    ) => {
      const spacePos = addPos(parentPos, getPos(space.position));
      const spaceYaw = parentYaw + getYaw(space.direction);

      for (const wall of space.walls || []) {
        processWall(wall, spacePos, spaceYaw);
      }
    };

    const processStorey = (
      storey: ConfigStorey,
      parentPos: { x: number; y: number; z: number },
      parentYaw: number
    ) => {
      const storeyPos = addPos(parentPos, getPos(storey.position));
      const storeyYaw = parentYaw + getYaw(storey.direction);

      // Process walls directly in storey
      for (const wall of storey.walls || []) {
        processWall(wall, storeyPos, storeyYaw);
      }

      // Process walls in spaces
      for (const space of storey.spaces || []) {
        processSpace(space, storeyPos, storeyYaw);
      }
    };

    const processBuilding = (
      building: ConfigBuilding,
      parentPos: { x: number; y: number; z: number },
      parentYaw: number
    ) => {
      const buildingPos = addPos(parentPos, getPos(building.position));
      const buildingYaw = parentYaw + getYaw(building.direction);

      for (const storey of building.storeys || []) {
        processStorey(storey, buildingPos, buildingYaw);
      }
    };

    const processSite = (
      site: ConfigSite,
      parentPos: { x: number; y: number; z: number },
      parentYaw: number
    ) => {
      const sitePos = addPos(parentPos, getPos(site.position));
      const siteYaw = parentYaw + getYaw(site.direction);

      for (const building of site.buildings || []) {
        processBuilding(building, sitePos, siteYaw);
      }
    };

    const processProject = (project: ConfigProject) => {
      const projectPos = getPos(project.position);
      const projectYaw = getYaw(project.direction);

      for (const site of project.sites || []) {
        processSite(site, projectPos, projectYaw);
      }
    };

    if (config.project) {
      processProject(config.project);
    }

    return walls;
  }

  /**
   * Handles file selection
   */
  private handleFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    if (!file.name.endsWith('.json')) {
      this.showStatus('Please select a .json file', 'error');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string) as ProjectConfiguration;
        const walls = this.extractWalls(config);

        if (walls.length === 0) {
          this.showStatus('No walls found in configuration', 'error');
          return;
        }

        this.showStatus(`Loaded ${walls.length} wall(s) from ${file.name}`, 'success');

        if (this.onWallsLoaded) {
          this.onWallsLoaded(walls);
        }
      } catch (error) {
        this.showStatus('Invalid JSON file', 'error');
        console.error('Error parsing JSON:', error);
      }
    };

    reader.onerror = () => {
      this.showStatus('Error reading file', 'error');
    };

    reader.readAsText(file);

    // Reset input to allow re-uploading the same file
    input.value = '';
  }

  /**
   * Shows status message
   */
  private showStatus(message: string, type: 'success' | 'error'): void {
    const statusText = this.container.querySelector('#upload-status') as HTMLSpanElement;
    statusText.textContent = message;
    statusText.style.display = 'block';
    statusText.style.color = type === 'success' ? '#4CAF50' : '#f44336';

    // Auto-hide after 3 seconds
    setTimeout(() => {
      statusText.style.display = 'none';
    }, 3000);
  }

  /**
   * Sets the callback for when walls are loaded from configuration
   */
  setOnWallsLoaded(callback: (walls: ExtractedWall[]) => void): void {
    this.onWallsLoaded = callback;
  }

  /**
   * Gets the container element
   */
  getContainer(): HTMLDivElement {
    return this.container;
  }

  /**
   * Removes the UI from the DOM
   */
  dispose(): void {
    this.container.remove();
  }
}
