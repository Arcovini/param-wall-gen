/**
 * Parametric Wall Project - API Entry Point
 *
 * This file serves as the main API interface for the parametric wall system.
 * It manages resources, provides a clean interface, and re-exports types.
 */

import { SceneRenderer } from './core/SceneRenderer';
import { WallGenerator } from './wall/WallGenerator';
import { SceneUtils } from './utils/SceneUtils';

// ===== TYPE RE-EXPORTS =====
// Re-export types for external consumption
export type { BuildMasonryWallParams } from './types';

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

  // 2. Initialize wall generator with scene access
  wallGenerator = new WallGenerator();

  // Default block parameters
  const defaultBlockWidth = 0.39;
  const defaultBlockHeight = 0.14;
  const defaultCementThickness = 0.02;

  // Default wall parameters
  const defaultWallWidth = 4.0;
  const defaultWallHeight = 3.0;
  const defaultWallLength = 0.2;

  // 3. Create initial wall (directly via WallGenerator)
  wallGenerator.createWall(
    defaultWallWidth,
    defaultWallHeight,
    defaultWallLength,
    defaultBlockWidth,
    defaultBlockHeight,
    defaultCementThickness,
    scene
  );

  // 4. Create floor at ground level
  const floor = SceneUtils.createFloor(10, 10, 0);
  scene.add(floor);

  // 5. Wire up wireframe toggle
  const wireframeToggle = document.getElementById('wireframe-toggle') as HTMLInputElement;
  const labelRendered = document.getElementById('label-rendered');
  const labelWireframe = document.getElementById('label-wireframe');

  if (wireframeToggle && labelRendered && labelWireframe) {
    wireframeToggle.addEventListener('change', () => {
      const isWireframe = wireframeToggle.checked;
      SceneUtils.setWireframeMode(scene, isWireframe);

      // Update labels
      if (isWireframe) {
        labelRendered.classList.remove('active');
        labelWireframe.classList.add('active');
      } else {
        labelRendered.classList.add('active');
        labelWireframe.classList.remove('active');
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

  function updateWall(): void {
    const blockWidth = parseFloat(blockWidthInput?.value) || defaultBlockWidth;
    const blockHeight = parseFloat(blockHeightInput?.value) || defaultBlockHeight;
    const cementThickness = parseFloat(cementThicknessInput?.value) || defaultCementThickness;
    const wallWidth = parseFloat(wallWidthInput?.value) || defaultWallWidth;
    const wallHeight = parseFloat(wallHeightInput?.value) || defaultWallHeight;
    const wallLength = parseFloat(wallLengthInput?.value) || defaultWallLength;

    // Directly update wall via WallGenerator
    wallGenerator!.updateWall(wallWidth, wallHeight, wallLength, blockWidth, blockHeight, cementThickness);
  }

  // Event listeners for block parameters
  blockWidthInput?.addEventListener('input', updateWall);
  blockHeightInput?.addEventListener('input', updateWall);
  cementThicknessInput?.addEventListener('input', updateWall);

  // Event listeners for wall parameters
  wallWidthInput?.addEventListener('input', updateWall);
  wallHeightInput?.addEventListener('input', updateWall);
  wallLengthInput?.addEventListener('input', updateWall);
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
