import { OpeningUI, OpeningData } from './OpeningUI';
import { getTestScenario } from '../test-scenarios';
import { SceneUtils } from '../utils/SceneUtils';
import * as THREE from 'three';

export class UIController {
  private openingUI: OpeningUI;
  private onUpdate: () => void;

  // Input Elements
  private wireframeToggle: HTMLInputElement | null;
  private labelWireframe: HTMLElement | null;

  private blockWidthInput: HTMLInputElement | null;
  private blockHeightInput: HTMLInputElement | null;
  private cementThicknessInput: HTMLInputElement | null;

  private wallWidthInput: HTMLInputElement | null;
  private wallHeightInput: HTMLInputElement | null;
  private wallLengthInput: HTMLInputElement | null;

  private positionXInput: HTMLInputElement | null;
  private positionYInput: HTMLInputElement | null;
  private positionZInput: HTMLInputElement | null;
  private rotationYawInput: HTMLInputElement | null;

  private completionInput: HTMLInputElement | null;

  private testButtons: NodeListOf<Element>;
  private testDescription: HTMLElement | null;
  private wallParamsTitle: HTMLElement | null;
  private addOpeningBtn: HTMLElement | null;

  // Default values (mirrored from index.ts for fallback)
  private readonly defaults = {
    blockWidth: 0.39,
    blockHeight: 0.14,
    cementThickness: 0.02,
    wallWidth: 4.0,
    wallHeight: 3.0,
    wallLength: 0.2,
    positionX: 0,
    positionY: 1.43,
    positionZ: 0,
    yawDegrees: 0,
    completionPercentage: 100
  };

  constructor(onUpdate: () => void, scene: THREE.Scene) {
    this.onUpdate = onUpdate;

    // Initialize OpeningUI
    this.openingUI = new OpeningUI('openings-container', (openings: OpeningData[]) => {
      console.log('Openings updated:', openings);
      this.onUpdate();
    });

    // Select Elements
    this.wireframeToggle = document.getElementById('wireframe-toggle') as HTMLInputElement;
    this.labelWireframe = document.getElementById('label-wireframe');

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

    this.testButtons = document.querySelectorAll('.test-button');
    this.testDescription = document.getElementById('test-description');
    this.wallParamsTitle = document.getElementById('wall-params-title');
    this.addOpeningBtn = document.getElementById('add-opening-btn');

    // Attach Listeners
    this.attachListeners(scene);
  }

  private attachListeners(scene: THREE.Scene): void {
    // Wireframe
    if (this.wireframeToggle) {
      this.wireframeToggle.addEventListener('change', () => {
        const isWireframe = this.wireframeToggle!.checked;
        SceneUtils.setWireframeMode(scene, isWireframe);

        if (this.labelWireframe) {
          if (isWireframe) {
            this.labelWireframe.style.fontWeight = 'bold';
            this.labelWireframe.style.color = '#333';
          } else {
            this.labelWireframe.style.fontWeight = 'normal';
            this.labelWireframe.style.color = '#666';
          }
        }
      });
    }

    // Inputs
    const inputs = [
      this.blockWidthInput, this.blockHeightInput, this.cementThicknessInput,
      this.wallWidthInput, this.wallHeightInput, this.wallLengthInput,
      this.positionXInput, this.positionYInput, this.positionZInput, this.rotationYawInput,
      this.completionInput
    ];

    inputs.forEach(input => {
      input?.addEventListener('input', () => this.onUpdate());
    });

    // Add Opening Button
    if (this.addOpeningBtn) {
      this.addOpeningBtn.addEventListener('click', () => {
        this.openingUI.addOpening();
      });
    }

    // Collapsible Section
    if (this.wallParamsTitle) {
      this.wallParamsTitle.addEventListener('click', () => {
        const section = this.wallParamsTitle!.closest('.control-section');
        if (section) {
          section.classList.toggle('collapsed');
        }
      });
    }

    // Test Buttons
    this.testButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const testNum = button.getAttribute('data-test');

        if (testNum === 'clear') {
          this.clearTest();
        } else if (testNum) {
          this.loadTestScenario(parseInt(testNum));
        }
      });
    });
  }

  private setActiveTestButton(testNumber: number | null) {
    this.testButtons.forEach((btn) => {
      const button = btn as HTMLElement;
      const testNum = button.getAttribute('data-test');
      if (testNum && testNum !== 'clear') {
        if (parseInt(testNum) === testNumber) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      }
    });
  }

  private loadTestScenario(testNumber: number) {
    const wallHeight = parseFloat(this.wallHeightInput?.value || '0') || this.defaults.wallHeight;
    const scenario = getTestScenario(testNumber, wallHeight);

    if (this.testDescription) {
      this.testDescription.innerHTML = `<strong>${scenario.name}</strong><br>${scenario.description}`;
    }

    this.openingUI.clearAll();

    scenario.openings.forEach((opening: any) => {
      this.openingUI.addOpening({
        x: opening.placement.position.x,
        y: opening.placement.position.y,
        z: opening.placement.position.z,
        width: opening.size.l,
        height: opening.size.h,
        length: opening.size.w,
      });
    });

    this.setActiveTestButton(testNumber);
    this.onUpdate();
  }

  private clearTest() {
    this.openingUI.clearAll();
    this.setActiveTestButton(null);
    if (this.testDescription) {
      this.testDescription.innerHTML = '';
    }
    this.onUpdate();
  }

  // Getters for Params
  public getWallParams() {
    const params = {
      blockWidth: parseFloat(this.blockWidthInput?.value || '0') || this.defaults.blockWidth,
      blockHeight: parseFloat(this.blockHeightInput?.value || '0') || this.defaults.blockHeight,
      cementThickness: parseFloat(this.cementThicknessInput?.value || '0') || this.defaults.cementThickness,
      wallWidth: parseFloat(this.wallWidthInput?.value || '0') || this.defaults.wallWidth,
      wallHeight: parseFloat(this.wallHeightInput?.value || '0') || this.defaults.wallHeight,
      wallLength: parseFloat(this.wallLengthInput?.value || '0') || this.defaults.wallLength,
      positionX: parseFloat(this.positionXInput?.value || '0') || this.defaults.positionX,
      positionY: parseFloat(this.positionYInput?.value || '0') || this.defaults.positionY,
      positionZ: parseFloat(this.positionZInput?.value || '0') || this.defaults.positionZ,
      yawDegrees: parseFloat(this.rotationYawInput?.value || '0') || this.defaults.yawDegrees,
      completionPercentage: parseFloat(this.completionInput?.value || '0') || this.defaults.completionPercentage
    };
    console.log("UIController Params:", params);
    return params;
  }

  public getOpenings() {
    return this.openingUI.getOpenings();
  }
}
