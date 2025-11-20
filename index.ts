/**
 * Parametric Wall Project - API Entry Point
 *
 * This file serves as the main API interface for the parametric wall system.
 * It manages resources, provides a clean interface, and re-exports types.
 */

import { SceneRenderer } from './core/SceneRenderer';
import { WallGenerator } from './wall/WallGenerator';
import { SceneUtils } from './utils/SceneUtils';
import { UIController } from './ui/UIController';
import { buildMasonryWall } from './buildMasonryWall';
import { PlaceholderWall } from './placeholderWall';
import type { BuildMasonryWallParams } from './types';

// ===== TYPE RE-EXPORTS =====
// Re-export types for external consumption
export type { BuildMasonryWallParams };

// ===== SINGLETON INSTANCES =====
let sceneRenderer: SceneRenderer | null = null;
let wallGenerator: WallGenerator | null = null;
let uiController: UIController | null = null;

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

  // 4. Create floor at ground level
  const floor = SceneUtils.createFloor(10, 10, 0);
  scene.add(floor);

  // Initialize UIController
  uiController = new UIController(() => updateWall(), scene);

  function updateWall(): void {
    if (!uiController) return;

    const params = uiController.getWallParams();
    const openings = uiController.getOpenings();
    const completion = params.completionPercentage / 100;

    // Remove previous wall if exists
    if (currentWallGroup) {
      scene.remove(currentWallGroup);
      currentWallGroup = null;
    }

    // Construct parameters for buildMasonryWall
    const buildParams: BuildMasonryWallParams = {
      wall: {
        // Map UI inputs to WallParams
        size: {
          l: params.wallLength, // Depth
          w: params.wallWidth,  // Horizontal Width
          h: params.wallHeight  // Vertical Height
        },
        blockSize: {
          l: params.blockWidth, // Horizontal
          w: 0, // Unused
          h: params.blockHeight // Vertical
        },
        cementThickness: params.cementThickness,
        placement: {
          parent: null,
          position: { x: params.positionX, y: params.positionY, z: params.positionZ },
          direction: { yaw: params.yawDegrees * (Math.PI / 180) } // Convert to radians for params
        },
        materials: {
          masonry: { albedo: '', metalness: 0, roughness: 0 },
          lintel: { albedo: '', metalness: 0, roughness: 0 },
          infill: { albedo: '', metalness: 0, roughness: 0 }
        }
      },
      openings: openings.map((o: any) => ({
        placement: {
          parent: null,
          position: { x: o.x, y: o.y, z: o.z },
          direction: { yaw: 0 }
        },
        size: {
          l: o.width,
          w: o.length,
          h: o.height
        }
      })),
      task: {
        completion: completion
      },
      visualization: uiController.getVisualizationMode()
    };

    // Generate new wall
    currentWallGroup = buildMasonryWall(buildParams);

    // Add Placeholder Wall (Yellow Box) - represents TARGET dimensions
    if (uiController.getShowPlaceholder()) {
      PlaceholderWall.attachWall(
        currentWallGroup,
        params.wallWidth,
        params.wallHeight,
        params.wallLength,
        params.positionX,
        params.positionY,
        params.positionZ,
        params.yawDegrees * (Math.PI / 180)
      );
    }

    // Add Actual Wall Placeholder (Green Box) - represents VISIBLE/TRUNCATED dimensions
    if (uiController.getShowActualWall()) {
      PlaceholderWall.attachActualWall(
        currentWallGroup,
        params.wallHeight,
        params.wallLength
      );
    }

    scene.add(currentWallGroup);
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
  // UIManager doesn't have a dispose method yet, but if it did, we'd call it here
}

// ===== INITIALIZATION =====
// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
