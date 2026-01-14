/**
 * Parametric Wall Project - API Entry Point
 *
 * This file serves as the main API interface for the parametric wall system.
 * It manages resources, provides a clean interface, and re-exports types.
 */

import { SceneRenderer } from './core/SceneRenderer';
import { SceneUtils } from './ui/SceneUtils';
import { UIController } from './ui/UIController';
import { UploadConfiguration } from './core/UploadConfiguration';
import { buildMasonryWall } from './buildMasonryWall';
import { WallVisualizer } from './ui/WallVisualizer';
import type { BuildMasonryWallParams, ExtractedWall } from './types';

const DEGREES_TO_RADIANS = Math.PI / 180;

// ===== TYPE RE-EXPORTS =====
// Re-export types for external consumption
export type { BuildMasonryWallParams };

// ===== SINGLETON INSTANCES =====
let sceneRenderer: SceneRenderer | null = null;
let uiController: UIController | null = null;
let uploadConfiguration: UploadConfiguration | null = null;

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

  // 4. Create floor at ground level (starts disabled)
  const floor = SceneUtils.createFloor(10, 10, 0);

  // Initialize UIController
  uiController = new UIController(() => updateWall(), scene);

  // Pass floor to UIController for toggle control
  uiController.setFloor(floor);

  // Wire up ambient occlusion toggle
  const aoToggle = document.getElementById('ao-toggle') as HTMLInputElement;
  if (aoToggle) {
    aoToggle.addEventListener('change', () => {
      renderer.setAmbientOcclusionEnabled(aoToggle.checked);
    });
  }

  // Initialize Upload Configuration UI
  uploadConfiguration = new UploadConfiguration();
  uploadConfiguration.setOnWallsLoaded((walls: ExtractedWall[]) => {
    if (walls.length === 0) return;

    // Use only the first wall
    const firstWall = walls[0];

    // Update UI inputs with first wall's parameters
    // Note: worldYaw is already in degrees from the JSON
    uiController!.setWallParams({
      wallWidth: firstWall.size.l,
      wallHeight: firstWall.size.h,
      wallLength: firstWall.size.w,
      positionX: firstWall.worldPosition.x,
      positionY: firstWall.worldPosition.y,
      positionZ: firstWall.worldPosition.z,
      yawDegrees: firstWall.worldYaw
    });

    console.log(`Loaded first wall: ${firstWall.name || firstWall.id}`);

    updateWall();
  });

  function updateWall(): void {
    if (!uiController) return;

    const params = uiController.getWallParams();
    const openings = uiController.getOpenings();
    const completion = params.completionPercentage / 100;
    const viewMode = uiController.getViewMode();

    // Remove previous wall if exists
    if (currentWallGroup) {
      scene.remove(currentWallGroup);
      currentWallGroup = null;
    }

    // Check view mode and create appropriate visualization
    if (viewMode === 'block' || viewMode === 'row') {
      // Import BlockGenerator for view mode visualization
      import('./wall-generator/BlockGenerator').then(({ BlockGenerator }) => {
        const blockGenerator = new BlockGenerator();

        currentWallGroup = SceneUtils.createViewModeVisualization(
          viewMode,
          blockGenerator,
          {
            blockWidth: params.blockWidth,
            blockHeight: params.blockHeight,
            wallLength: params.wallLength,
            cementThickness: params.cementThickness
          }
        );

        // Position at origin for easier viewing
        currentWallGroup.position.set(0, params.blockHeight / 2, 0);
        scene.add(currentWallGroup);
      });

      return; // Exit early for block/row views
    }

    // WALL VIEW and WALL OUTPUT VIEW (both use buildMasonryWall)
    // Both modes use all user parameters, but wall-output shows only the exported THREE.Group

    /**
     * Dimension Mapping (UI → BuildMasonryWallParams):
     *
     * Wall size:  l = depth (front-to-back), w = width (left-to-right), h = height
     * Block size: l = block width (horizontal), h = block height, w = unused
     *
     * Note: The asymmetry exists because walls are oriented perpendicular to blocks.
     * A wall's "length" (l) is its depth, while blocks are laid horizontally across
     * the wall's "width" (w).
     */
    const buildParams: BuildMasonryWallParams = {
      wall: {
        size: {
          l: params.wallLength,  // Depth (front-to-back)
          w: params.wallWidth,   // Width (left-to-right)
          h: params.wallHeight   // Height (bottom-to-top)
        },
        blockSize: {
          l: params.blockWidth,  // Block horizontal width
          h: params.blockHeight, // Block vertical height
          w: 0                   // Unused for blocks
        },
        cementThickness: params.cementThickness,
        placement: {
          parent: null,
          position: { x: params.positionX, y: params.positionY, z: params.positionZ },
          direction: { yaw: params.yawDegrees * DEGREES_TO_RADIANS }
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
      // In wall-output mode, don't show opening visualizations (not part of exported THREE.Group)
      visualization: viewMode === 'wall-output' ? 'none' : uiController.getVisualizationMode()
    };

    // Generate new wall
    currentWallGroup = buildMasonryWall(buildParams);

    // Apply current wireframe state to the new wall
    if (uiController.getWireframeEnabled()) {
      SceneUtils.setWireframeMode(currentWallGroup, true);
    }

    // Add placeholders only in 'wall' mode (not in 'wall-output' mode)
    if (viewMode === 'wall') {
      // Add Placeholder Wall (Yellow Box) - represents TARGET dimensions
      if (uiController.getShowPlaceholder()) {
        WallVisualizer.addTargetPlaceholder(
          currentWallGroup,
          params.wallWidth,
          params.wallHeight,
          params.wallLength
        );
      }

      // Add Actual Wall Placeholder (Green Box) - represents VISIBLE/TRUNCATED dimensions
      if (uiController.getShowActualWall()) {
        WallVisualizer.addActualPlaceholder(
          currentWallGroup,
          params.wallLength
        );
      }
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
  if (sceneRenderer) {
    sceneRenderer.dispose();
    sceneRenderer = null;
  }
  if (uploadConfiguration) {
    uploadConfiguration.dispose();
    uploadConfiguration = null;
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
