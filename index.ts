/**
 * Parametric Wall Project - API Entry Point
 *
 * This file serves as the main API interface for the parametric wall system.
 * It manages resources, provides a clean interface, and re-exports types.
 */

import { SceneRenderer } from './core/SceneRenderer';
import { WallGenerator } from './wall/WallGenerator';
import { SceneUtils } from './utils/SceneUtils';
import { OpeningUI, OpeningData } from './ui/OpeningUI';
import { buildMasonryWall } from './buildMasonryWall';
import { getTestScenario } from './test-scenarios';
import type { BuildMasonryWallParams } from './types';

// ===== TYPE RE-EXPORTS =====
// Re-export types for external consumption
export type { BuildMasonryWallParams };

// ===== SINGLETON INSTANCES =====
let sceneRenderer: SceneRenderer | null = null;
let wallGenerator: WallGenerator | null = null;

/**
 * Initializes and returns the singleton SceneRenderer instance
 */
function getSceneRenderer(): SceneRenderer {
  if (!sceneRenderer) {
    const container = document.getElementById('canvas-container') as HTMLElement;
    if (!container) {
      throw new Error('Container element with id "canvas-container" not found');
    }
    sceneRenderer = new SceneRenderer(container);
  }
  return sceneRenderer;
}

/**
 * Initializes the application and wires up UI controls
 */
function init(): void {
  // 1. Initialize pure rendering engine
  const renderer = getSceneRenderer();
  const scene = renderer.getScene();

  // Track the current wall group
  let currentWallGroup: THREE.Group | null = null;

  // Default block parameters
  const defaultBlockWidth = 0.39;
  const defaultBlockHeight = 0.14;
  const defaultCementThickness = 0.02;

  // Default wall parameters
  const defaultWallWidth = 4.0;
  const defaultWallHeight = 3.0;
  const defaultWallLength = 0.2;

  // Default placement parameters
  const defaultPositionX = 0;
  const defaultPositionY = 1.43;
  const defaultPositionZ = 0;
  const defaultYawDegrees = 0;

  // Default task parameters
  const defaultCompletionPercentage = 10; // 50% completion

  // 4. Create floor at ground level
  const floor = SceneUtils.createFloor(10, 10, 0);
  scene.add(floor);

  // 5. Wire up wireframe toggle
  const wireframeToggle = document.getElementById('wireframe-toggle') as HTMLInputElement;
  const labelWireframe = document.getElementById('label-wireframe');

  if (wireframeToggle) {
    wireframeToggle.addEventListener('change', () => {
      const isWireframe = wireframeToggle.checked;
      SceneUtils.setWireframeMode(scene, isWireframe);

      // Update label style if it exists
      if (labelWireframe) {
        if (isWireframe) {
          labelWireframe.style.fontWeight = 'bold';
          labelWireframe.style.color = '#333';
        } else {
          labelWireframe.style.fontWeight = 'normal';
          labelWireframe.style.color = '#666';
        }
      }
    });
  }

  // Wire up block parameter controls
  const blockWidthInput = document.getElementById('block-width') as HTMLInputElement;
  const blockHeightInput = document.getElementById('block-height') as HTMLInputElement;
  const cementThicknessInput = document.getElementById('cement-thickness') as HTMLInputElement;

  // Wire up wall parameter controls
  const wallWidthInput = document.getElementById('wall-width') as HTMLInputElement;
  const wallHeightInput = document.getElementById('wall-height') as HTMLInputElement;
  const wallLengthInput = document.getElementById('wall-length') as HTMLInputElement;

  // Wire up placement parameter controls
  const positionXInput = document.getElementById('position-x') as HTMLInputElement;
  const positionYInput = document.getElementById('position-y') as HTMLInputElement;
  const positionZInput = document.getElementById('position-z') as HTMLInputElement;
  const rotationYawInput = document.getElementById('rotation-yaw') as HTMLInputElement;

  // Wire up task parameter controls
  const completionInput = document.getElementById('completion') as HTMLInputElement;

  function updateWall(): void {
    const blockWidth = parseFloat(blockWidthInput?.value) || defaultBlockWidth;
    const blockHeight = parseFloat(blockHeightInput?.value) || defaultBlockHeight;
    const cementThickness = parseFloat(cementThicknessInput?.value) || defaultCementThickness;
    const wallWidth = parseFloat(wallWidthInput?.value) || defaultWallWidth;
    const wallHeight = parseFloat(wallHeightInput?.value) || defaultWallHeight;
    const wallLength = parseFloat(wallLengthInput?.value) || defaultWallLength;
    const positionX = parseFloat(positionXInput?.value) || defaultPositionX;
    const positionY = parseFloat(positionYInput?.value) || defaultPositionY;
    const positionZ = parseFloat(positionZInput?.value) || defaultPositionZ;
    const yawDegrees = parseFloat(rotationYawInput?.value) || defaultYawDegrees;
    const completionPercentage = parseFloat(completionInput?.value) || defaultCompletionPercentage;
    const completion = completionPercentage / 100; // Convert percentage to 0-1 range

    // Remove previous wall if exists
    if (currentWallGroup) {
      scene.remove(currentWallGroup);
      currentWallGroup = null;
    }

    // Construct parameters for buildMasonryWall
    const params: BuildMasonryWallParams = {
      wall: {
        // Map UI inputs to WallParams
        size: {
          l: wallLength, // Depth
          w: wallWidth,  // Horizontal Width
          h: wallHeight  // Vertical Height
        },
        blockSize: {
          l: blockWidth, // Horizontal
          w: 0, // Unused
          h: blockHeight // Vertical
        },
        cementThickness: cementThickness,
        placement: {
          parent: null,
          position: { x: positionX, y: positionY, z: positionZ },
          direction: { yaw: yawDegrees * (Math.PI / 180) } // Convert to radians for params
        },
        materials: {
          masonry: { albedo: '', metalness: 0, roughness: 0 },
          lintel: { albedo: '', metalness: 0, roughness: 0 },
          infill: { albedo: '', metalness: 0, roughness: 0 }
        }
      },
      openings: [], // TODO: Pass openings from UI
      task: {
        completion: completion
      }
    };

    // Generate new wall
    currentWallGroup = buildMasonryWall(params);
    scene.add(currentWallGroup);
  }

  // Event listeners for block parameters
  blockWidthInput?.addEventListener('input', updateWall);
  blockHeightInput?.addEventListener('input', updateWall);
  cementThicknessInput?.addEventListener('input', updateWall);

  // Event listeners for wall parameters
  wallWidthInput?.addEventListener('input', updateWall);
  wallHeightInput?.addEventListener('input', updateWall);
  wallLengthInput?.addEventListener('input', updateWall);

  // Event listeners for placement parameters
  positionXInput?.addEventListener('input', updateWall);
  positionYInput?.addEventListener('input', updateWall);
  positionZInput?.addEventListener('input', updateWall);
  rotationYawInput?.addEventListener('input', updateWall);

  // Event listeners for task parameters
  completionInput?.addEventListener('input', updateWall);

  // Initialize OpeningUI
  const openingUI = new OpeningUI('openings-container', (openings: OpeningData[]) => {
    console.log('Openings updated:', openings);
    // TODO: Pass openings to params
    updateWall();
  });

  const addOpeningBtn = document.getElementById('add-opening-btn');
  if (addOpeningBtn) {
    addOpeningBtn.addEventListener('click', () => {
      openingUI.addOpening();
    });
  }

  // ===== TEST BUTTONS FUNCTIONALITY =====
  const testButtons = document.querySelectorAll('.test-button');
  const testDescription = document.getElementById('test-description');

  // Function to update active button state
  function setActiveTestButton(testNumber: number | null) {
    testButtons.forEach((btn) => {
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

  // Function to load test scenario
  function loadTestScenario(testNumber: number) {
    const wallHeight = parseFloat(wallHeightInput?.value) || defaultWallHeight;
    const scenario = getTestScenario(testNumber, wallHeight);

    // Update test description
    if (testDescription) {
      testDescription.innerHTML = `<strong>${scenario.name}</strong><br>${scenario.description}`;
    }

    // Clear existing openings in UI
    openingUI.clearAll();

    // Add test scenario openings to UI
    scenario.openings.forEach((opening: any) => {
      openingUI.addOpening({
        x: opening.placement.position.x,
        y: opening.placement.position.y,
        z: opening.placement.position.z,
        width: opening.size.l,
        height: opening.size.h,
        length: opening.size.w,
      });
    });

    // Set active button
    setActiveTestButton(testNumber);

    // Update wall
    updateWall();
  }

  // Wire up test buttons (Test 1-5)
  testButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const testNum = button.getAttribute('data-test');

      if (testNum === 'clear') {
        // Clear all openings
        openingUI.clearAll();
        setActiveTestButton(null);
        if (testDescription) {
          testDescription.innerHTML = '';
        }
        updateWall();
      } else if (testNum) {
        // Load test scenario
        const testNumber = parseInt(testNum);
        loadTestScenario(testNumber);
      }
    });
  });

  // Wire up collapsible WallParams
  const wallParamsTitle = document.getElementById('wall-params-title');
  if (wallParamsTitle) {
    wallParamsTitle.addEventListener('click', () => {
      const section = wallParamsTitle.closest('.control-section');
      if (section) {
        section.classList.toggle('collapsed');
      }
    });
  }

  // Initial build
  updateWall();
}

// ===== PUBLIC API =====
/**
 * Gets the singleton SceneRenderer instance
 * Use this for advanced control over the rendering system
 */
export function getRenderer(): SceneRenderer {
  return getSceneRenderer();
}

/**
 * Disposes of all resources and cleans up
 */
export function dispose(): void {
  if (wallGenerator) {
    wallGenerator.dispose();
    wallGenerator = null;
  }
  if (sceneRenderer) {
    sceneRenderer.dispose();
    sceneRenderer = null;
  }
}

// ===== INITIALIZATION =====
// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
