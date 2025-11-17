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
  const defaultBlockLength = 0.19;
  const defaultCementThickness = 0.02;

  // Create initial block
  renderer.createBlock(defaultBlockWidth, defaultBlockHeight, defaultBlockLength, defaultCementThickness);

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
  const blockLengthInput = document.getElementById('block-length') as HTMLInputElement;
  const cementThicknessInput = document.getElementById('cement-thickness') as HTMLInputElement;

  function updateBlock(): void {
    const blockWidth = parseFloat(blockWidthInput?.value) || defaultBlockWidth;
    const blockHeight = parseFloat(blockHeightInput?.value) || defaultBlockHeight;
    const blockLength = parseFloat(blockLengthInput?.value) || defaultBlockLength;
    const cementThickness = parseFloat(cementThicknessInput?.value) || defaultCementThickness;

    renderer.updateBlock(blockWidth, blockHeight, blockLength, cementThickness);
  }

  // Event listeners for block parameters
  blockWidthInput?.addEventListener('input', updateBlock);
  blockHeightInput?.addEventListener('input', updateBlock);
  blockLengthInput?.addEventListener('input', updateBlock);
  cementThicknessInput?.addEventListener('input', updateBlock);
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
