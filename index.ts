/**
 * Parametric Wall Project - API Entry Point
 *
 * This file serves as the main API interface for the parametric wall system.
 * It manages resources, provides a clean interface, and re-exports types.
 */

import { WallRenderer } from './WallRenderer';

// ===== TYPE RE-EXPORTS =====
// Re-export types for external consumption
export type { BuildMasonryWallParams } from './types';

// ===== SINGLETON INSTANCE =====
let rendererInstance: WallRenderer | null = null;

/**
 * Initializes and returns the singleton WallRenderer instance
 */
function getRenderer(): WallRenderer {
  if (!rendererInstance) {
    const container = document.getElementById('canvas-container') as HTMLElement;
    if (!container) {
      throw new Error('Container element with id "canvas-container" not found');
    }
    rendererInstance = new WallRenderer(container);
  }
  return rendererInstance;
}

/**
 * Initializes the application and wires up UI controls
 */
function init(): void {
  const renderer = getRenderer();

  // Default block parameters
  const defaultBlockWidth = 0.39;
  const defaultBlockHeight = 0.14;
  const defaultCementThickness = 0.02;

  // Default wall parameters
  const defaultWallWidth = 4.0;
  const defaultWallHeight = 3.0;
  const defaultWallLength = 0.2;

  // Create initial wall
  renderer.createWall(defaultWallWidth, defaultWallHeight, defaultWallLength, defaultBlockWidth, defaultBlockHeight, defaultCementThickness);

  // Wire up wireframe toggle
  const wireframeToggle = document.getElementById('wireframe-toggle') as HTMLInputElement;
  const labelRendered = document.getElementById('label-rendered');
  const labelWireframe = document.getElementById('label-wireframe');

  if (wireframeToggle && labelRendered && labelWireframe) {
    wireframeToggle.addEventListener('change', () => {
      const isWireframe = wireframeToggle.checked;
      renderer.setWireframeMode(isWireframe);

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

    renderer.updateWall(wallWidth, wallHeight, wallLength, blockWidth, blockHeight, cementThickness);
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
 * Gets the singleton WallRenderer instance
 * Use this for advanced control over the rendering system
 */
export function getWallRenderer(): WallRenderer {
  return getRenderer();
}

/**
 * Disposes of all resources and cleans up
 */
export function dispose(): void {
  if (rendererInstance) {
    rendererInstance.dispose();
    rendererInstance = null;
  }
}

// ===== INITIALIZATION =====
// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
