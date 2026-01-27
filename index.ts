/**
 * Parametric Wall Project - API Entry Point
 *
 * This file serves as the main API interface for the parametric wall system.
 * It manages resources, provides a clean interface, and re-exports types.
 */

import * as THREE from 'three';
import { ToneMappingMode } from 'postprocessing';
import { SceneRenderer } from './core/SceneRenderer';
import { SceneUtils } from './ui/SceneUtils';
import { UIController } from './ui/UIController';
import { UploadConfiguration } from './core/UploadConfiguration';
import { ConstructionLoader } from './core/ConstructionLoader';
import { buildMasonryWall } from './wall-generator';
import { buildColumn } from './column-generator';
import { buildBeam } from './beam-generator';
import { WallVisualizer } from './ui/WallVisualizer';
import type { BuildMasonryWallParams, ExtractedWall } from './types';
import type { BuildColumnParams } from './column-generator';
import type { BuildBeamParams } from './beam-generator';

const DEGREES_TO_RADIANS = Math.PI / 180;

// ===== TYPE RE-EXPORTS =====
// Re-export types for external consumption
export type { BuildMasonryWallParams };

// ===== SINGLETON INSTANCES =====
let sceneRenderer: SceneRenderer | null = null;
let uiController: UIController | null = null;
let uploadConfiguration: UploadConfiguration | null = null;
let constructionLoader: ConstructionLoader | null = null;
let isLoadingConstruction = false;

// ===== LOADING OVERLAY HELPERS =====
function showLoadingOverlay(text: string): void {
  const overlay = document.getElementById('loading-overlay');
  const loadingText = overlay?.querySelector('.loading-text');
  if (overlay) {
    overlay.classList.remove('hidden');
    if (loadingText) {
      loadingText.textContent = text;
    }
  }
}

function hideLoadingOverlay(): void {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.classList.add('hidden');
  }
}

function updateLoadingProgress(percentage: number): void {
  const overlay = document.getElementById('loading-overlay');
  const loadingText = overlay?.querySelector('.loading-text');
  if (loadingText) {
    loadingText.textContent = `Loading construction site... ${percentage}%`;
  }
}

function adjustCameraForConstruction(model: THREE.Group): void {
  if (!sceneRenderer) return;

  // Calculate bounding box of the model
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());

  // Get the maximum dimension to frame the model appropriately
  const maxDim = Math.max(size.x, size.y, size.z);
  const distance = maxDim * 1.5;

  // Position camera to view the model from an isometric-like angle
  const camera = sceneRenderer.getCamera();
  camera.position.set(
    center.x + distance * 0.7,
    center.y + distance * 0.5,
    center.z + distance * 0.7
  );
  camera.lookAt(center);

  // Update orbit controls target if available
  const controls = sceneRenderer.getControls();
  if (controls) {
    controls.target.copy(center);
    controls.update();
  }
}

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

  // Wire up tone mapping dropdown and Reinhard controls
  const toneMappingSelect = document.getElementById('tone-mapping-select') as HTMLSelectElement;
  const reinhardCommonControls = document.getElementById('reinhard-common-controls');
  const reinhard2Controls = document.getElementById('reinhard2-controls');
  const reinhard2AdaptiveControls = document.getElementById('reinhard2-adaptive-controls');
  const exposureSlider = document.getElementById('exposure-slider') as HTMLInputElement;
  const contrastSlider = document.getElementById('contrast-slider') as HTMLInputElement;
  const exposureValue = document.getElementById('exposure-value');
  const contrastValue = document.getElementById('contrast-value');
  const whitepointSlider = document.getElementById('whitepoint-slider') as HTMLInputElement;
  const middlegreySlider = document.getElementById('middlegrey-slider') as HTMLInputElement;
  const avgluminanceSlider = document.getElementById('avgluminance-slider') as HTMLInputElement;
  const adaptationrateSlider = document.getElementById('adaptationrate-slider') as HTMLInputElement;
  const minluminanceSlider = document.getElementById('minluminance-slider') as HTMLInputElement;
  const whitepointValue = document.getElementById('whitepoint-value');
  const middlegreyValue = document.getElementById('middlegrey-value');
  const avgluminanceValue = document.getElementById('avgluminance-value');
  const adaptationrateValue = document.getElementById('adaptationrate-value');
  const minluminanceValue = document.getElementById('minluminance-value');

  // Helper to show/hide reinhard control sections
  const updateReinhardControlsVisibility = (mode: string) => {
    if (mode === 'aces_filmic') {
      reinhardCommonControls?.classList.add('hidden');
      reinhard2Controls?.classList.add('hidden');
      reinhard2AdaptiveControls?.classList.add('hidden');
    } else if (mode === 'reinhard2') {
      reinhardCommonControls?.classList.remove('hidden');
      reinhard2Controls?.classList.remove('hidden');
      reinhard2AdaptiveControls?.classList.add('hidden');
    } else if (mode === 'reinhard2_adaptive') {
      reinhardCommonControls?.classList.remove('hidden');
      reinhard2Controls?.classList.add('hidden');
      reinhard2AdaptiveControls?.classList.remove('hidden');
    }
  };

  if (toneMappingSelect) {
    toneMappingSelect.addEventListener('change', () => {
      const value = toneMappingSelect.value;
      updateReinhardControlsVisibility(value);

      if (value === 'aces_filmic') {
        renderer.setToneMappingMode(ToneMappingMode.ACES_FILMIC);
        renderer.setExposure(0); // Reset to default
        renderer.setContrast(0); // Reset to default
      } else if (value === 'reinhard2') {
        renderer.setToneMappingMode(ToneMappingMode.REINHARD2);
        // Apply current slider values
        renderer.setExposure(parseFloat(exposureSlider?.value || '0.4'));
        renderer.setContrast(parseFloat(contrastSlider?.value || '0.8'));
        renderer.setWhitePoint(parseFloat(whitepointSlider?.value || '4.0'));
        renderer.setMiddleGrey(parseFloat(middlegreySlider?.value || '0.18'));
        renderer.setAverageLuminance(parseFloat(avgluminanceSlider?.value || '1.0'));
      } else if (value === 'reinhard2_adaptive') {
        renderer.setToneMappingMode(ToneMappingMode.REINHARD2_ADAPTIVE);
        // Apply current slider values
        renderer.setExposure(parseFloat(exposureSlider?.value || '0.4'));
        renderer.setContrast(parseFloat(contrastSlider?.value || '0.8'));
        renderer.setWhitePoint(parseFloat(whitepointSlider?.value || '4.0'));
        renderer.setMiddleGrey(parseFloat(middlegreySlider?.value || '0.18'));
        renderer.setAdaptationRate(parseFloat(adaptationrateSlider?.value || '1.0'));
        renderer.setMinLuminance(parseFloat(minluminanceSlider?.value || '0.01'));
      }
    });
  }

  // Wire up exposure slider
  if (exposureSlider) {
    exposureSlider.addEventListener('input', () => {
      const value = parseFloat(exposureSlider.value);
      renderer.setExposure(value);
      if (exposureValue) exposureValue.textContent = value.toFixed(2);
    });
  }

  // Wire up contrast slider
  if (contrastSlider) {
    contrastSlider.addEventListener('input', () => {
      const value = parseFloat(contrastSlider.value);
      renderer.setContrast(value);
      if (contrastValue) contrastValue.textContent = value.toFixed(2);
    });
  }

  // Wire up white point slider
  if (whitepointSlider) {
    whitepointSlider.addEventListener('input', () => {
      const value = parseFloat(whitepointSlider.value);
      renderer.setWhitePoint(value);
      if (whitepointValue) whitepointValue.textContent = value.toFixed(1);
    });
  }

  // Wire up middle grey slider
  if (middlegreySlider) {
    middlegreySlider.addEventListener('input', () => {
      const value = parseFloat(middlegreySlider.value);
      renderer.setMiddleGrey(value);
      if (middlegreyValue) middlegreyValue.textContent = value.toFixed(2);
    });
  }

  // Wire up average luminance slider (Reinhard2 non-adaptive only)
  if (avgluminanceSlider) {
    avgluminanceSlider.addEventListener('input', () => {
      const value = parseFloat(avgluminanceSlider.value);
      renderer.setAverageLuminance(value);
      if (avgluminanceValue) avgluminanceValue.textContent = value.toFixed(1);
    });
  }

  // Wire up adaptation rate slider (Reinhard2 Adaptive only)
  if (adaptationrateSlider) {
    adaptationrateSlider.addEventListener('input', () => {
      const value = parseFloat(adaptationrateSlider.value);
      renderer.setAdaptationRate(value);
      if (adaptationrateValue) adaptationrateValue.textContent = value.toFixed(1);
    });
  }

  // Wire up min luminance slider (Reinhard2 Adaptive only)
  if (minluminanceSlider) {
    minluminanceSlider.addEventListener('input', () => {
      const value = parseFloat(minluminanceSlider.value);
      renderer.setMinLuminance(value);
      if (minluminanceValue) minluminanceValue.textContent = value.toFixed(3);
    });
  }

  // Wire up material color controls
  const brickColorInput = document.getElementById('brick-color') as HTMLInputElement;
  const brickColorSigmaInput = document.getElementById('brick-color-sigma') as HTMLInputElement;
  const darkBrickColorInput = document.getElementById('dark-brick-color') as HTMLInputElement;
  const cementColorInput = document.getElementById('cement-color') as HTMLInputElement;
  const lintelColorInput = document.getElementById('lintel-color') as HTMLInputElement;
  const lintelColorSigmaInput = document.getElementById('lintel-color-sigma') as HTMLInputElement;
  const infillColorInput = document.getElementById('infill-color') as HTMLInputElement;
  const infillColorSigmaInput = document.getElementById('infill-color-sigma') as HTMLInputElement;

  // Column-specific color controls
  const columnColorInput = document.getElementById('column-color') as HTMLInputElement;
  const columnColorSigmaInput = document.getElementById('column-color-sigma') as HTMLInputElement;

  // Column-specific texture controls
  const columnTextureSelect = document.getElementById('column-texture') as HTMLSelectElement;
  const columnTextureRepeatXInput = document.getElementById('column-texture-repeat-x') as HTMLInputElement;
  const columnTextureRepeatYInput = document.getElementById('column-texture-repeat-y') as HTMLInputElement;

  // Beam-specific color controls
  const beamColorInput = document.getElementById('beam-color') as HTMLInputElement;
  const beamColorSigmaInput = document.getElementById('beam-color-sigma') as HTMLInputElement;

  // Beam-specific texture controls
  const beamTextureSelect = document.getElementById('beam-texture') as HTMLSelectElement;
  const beamTextureRepeatXInput = document.getElementById('beam-texture-repeat-x') as HTMLInputElement;
  const beamTextureRepeatYInput = document.getElementById('beam-texture-repeat-y') as HTMLInputElement;

  // Add event listeners for all color and texture controls
  [brickColorInput, brickColorSigmaInput, darkBrickColorInput, cementColorInput,
   lintelColorInput, lintelColorSigmaInput, infillColorInput, infillColorSigmaInput,
   columnColorInput, columnColorSigmaInput, columnTextureSelect,
   columnTextureRepeatXInput, columnTextureRepeatYInput,
   beamColorInput, beamColorSigmaInput, beamTextureSelect,
   beamTextureRepeatXInput, beamTextureRepeatYInput]
    .filter(Boolean)
    .forEach(input => input.addEventListener('input', () => updateWall()));

  // Also listen for 'change' on select elements (for dropdown selection)
  columnTextureSelect?.addEventListener('change', () => updateWall());
  beamTextureSelect?.addEventListener('change', () => updateWall());

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

    const generatorMode = uiController.getGeneratorMode();
    const viewMode = uiController.getViewMode();

    // Remove previous wall/column if exists
    if (currentWallGroup) {
      scene.remove(currentWallGroup);
      currentWallGroup = null;
    }

    // Construction mode - load and display GLB model
    if (generatorMode === 'construction') {
      // Prevent duplicate loading
      if (isLoadingConstruction) return;

      // Initialize loader if needed
      if (!constructionLoader) {
        constructionLoader = new ConstructionLoader();
      }

      // Show loading overlay only if not cached
      if (!constructionLoader.isCached()) {
        showLoadingOverlay('Loading construction site...');
        isLoadingConstruction = true;
      }

      constructionLoader
        .load('/construction_site_building_site_architecture.glb', updateLoadingProgress)
        .then((model) => {
          isLoadingConstruction = false;
          hideLoadingOverlay();

          // Remove any existing wall group that might have been added during loading
          if (currentWallGroup) {
            scene.remove(currentWallGroup);
          }

          currentWallGroup = model;

          // Apply wireframe if enabled
          if (uiController?.getWireframeEnabled()) {
            SceneUtils.setWireframeMode(currentWallGroup, true);
          }

          scene.add(currentWallGroup);

          // Adjust camera to frame the model
          adjustCameraForConstruction(model);
        })
        .catch((error) => {
          isLoadingConstruction = false;
          hideLoadingOverlay();
          console.error('Failed to load construction site:', error);
        });

      return;
    }

    // Column generation mode
    if (generatorMode === 'column') {
      const columnParams = uiController.getColumnParams();

      const buildParams: BuildColumnParams = {
        column: {
          size: {
            l: columnParams.depth,   // Depth (front-to-back)
            w: columnParams.width,   // Width (left-to-right)
            h: columnParams.height   // Height (bottom-to-top)
          },
          placement: {
            parent: null,
            position: {
              x: columnParams.positionX,
              y: columnParams.positionY,
              z: columnParams.positionZ
            },
            direction: { yaw: columnParams.yawDegrees * DEGREES_TO_RADIANS }
          },
          material: {
            color: columnColorInput?.value,
            colorSigma: parseFloat(columnColorSigmaInput?.value) || 0,
            texture: columnTextureSelect?.value || undefined,
            textureRepeatX: parseFloat(columnTextureRepeatXInput?.value) || 1,
            textureRepeatY: parseFloat(columnTextureRepeatYInput?.value) || 1
          }
        }
      };

      // Generate column
      currentWallGroup = buildColumn(buildParams);

      // Apply wireframe if enabled
      if (uiController.getWireframeEnabled()) {
        SceneUtils.setWireframeMode(currentWallGroup, true);
      }

      scene.add(currentWallGroup);
      return;
    }

    // Beam generation mode
    if (generatorMode === 'beam') {
      const beamParams = uiController.getBeamParams();

      const buildParams: BuildBeamParams = {
        beam: {
          size: {
            l: beamParams.depth,
            w: beamParams.width,
            h: beamParams.height
          },
          placement: {
            parent: null,
            position: {
              x: beamParams.positionX,
              y: beamParams.positionY,
              z: beamParams.positionZ
            },
            direction: { yaw: beamParams.yawDegrees * DEGREES_TO_RADIANS }
          },
          material: {
            color: beamColorInput?.value,
            colorSigma: parseFloat(beamColorSigmaInput?.value) || 0,
            texture: beamTextureSelect?.value || undefined,
            textureRepeatX: parseFloat(beamTextureRepeatXInput?.value) || 1,
            textureRepeatY: parseFloat(beamTextureRepeatYInput?.value) || 1
          }
        }
      };

      currentWallGroup = buildBeam(buildParams);

      if (uiController.getWireframeEnabled()) {
        SceneUtils.setWireframeMode(currentWallGroup, true);
      }

      scene.add(currentWallGroup);
      return;
    }

    // Wall generation mode
    const params = uiController.getWallParams();
    const openings = uiController.getOpenings();
    const completion = params.completionPercentage / 100;

    // Check view mode and create appropriate visualization
    if (viewMode === 'block' || viewMode === 'row') {
      // Import BlockGenerator for view mode visualization
      import('./wall-generator/internal/BlockGenerator').then(({ BlockGenerator }) => {
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
          masonry: {
            color: brickColorInput?.value,
            colorSigma: parseFloat(brickColorSigmaInput?.value) || 0,
            darkBrickColor: darkBrickColorInput?.value,
            cementColor: cementColorInput?.value
          },
          lintel: {
            color: lintelColorInput?.value,
            colorSigma: parseFloat(lintelColorSigmaInput?.value) || 0
          },
          infill: {
            color: infillColorInput?.value,
            colorSigma: parseFloat(infillColorSigmaInput?.value) || 0
          }
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
  if (constructionLoader) {
    constructionLoader.clearCache();
    constructionLoader = null;
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
