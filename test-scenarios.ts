/**
 * test-scenarios.ts - Predefined test cases for masonry wall generation
 *
 * Implements the 5 test scenarios from the PDF specification:
 * 1. No openings
 * 2. With door
 * 3. Window at center
 * 4. Window at top (touching wall top)
 * 5. Multiple openings (doors and windows)
 *
 * All dimensions in SI units (meters)
 */

import type { BuildMasonryWallParams } from './types';

// Helper to create placement relative to wall
function createPlacement(x: number, y: number, z: number) {
  return {
    parent: null,
    position: { x, y, z },
    direction: { yaw: 0 },
  };
}

/**
 * Test 1: Simple wall with no openings
 */
export function getTest1Openings() {
  return [];
}

/**
 * Test 2: Wall with a door
 * - Door dimensions: 0.9m wide x 2.1m tall (standard door)
 * - Positioned at ground level (y=0)
 * - Centered horizontally
 */
export function getTest2Openings(wallHeight: number = 3.0) {
  const doorHeight = 2.1;
  const doorY = -wallHeight / 2 + doorHeight / 2;

  return [
    {
      placement: createPlacement(0, doorY, 0), // Center at calculated Y (bottom aligned)
      size: {
        l: 0.9,  // length (width in horizontal)
        w: 1.0, // width (depth through wall)
        h: doorHeight,  // height
      },
    },
  ];
}

/**
 * Test 3: Wall with window at center
 * - Window dimensions: 1.2m wide x 1.0m tall
 * - Positioned in the middle of wall (not touching top or bottom)
 * - Requires lintel above opening
 */
export function getTest3Openings() {
  return [
    {
      placement: createPlacement(0, 0, 0), // Center at 0 (geometric center)
      size: {
        l: 1.2,  // length (width)
        w: 1.0, // width (depth)
        h: 1.0,  // height
      },
    },
  ];
}

/**
 * Test 4: Wall with window touching top
 * - Window dimensions: 1.0m wide x 1.0m tall
 * - Positioned at top of wall (y position adjusted to touch top)
 * - No lintel needed (opening touches wall top)
 *
 * Note: For a 3m tall wall, window top should be at ~2.9m
 */
export function getTest4Openings(wallHeight: number = 3.0) {
  const windowHeight = 1.0;
  const windowY = wallHeight / 2 - windowHeight / 2; // Position so top edge touches wall top (top is at wallHeight/2)

  return [
    {
      placement: createPlacement(0, windowY, 0),
      size: {
        l: 1.0,  // length (width)
        w: 1.0, // width (depth)
        h: windowHeight,
      },
    },
  ];
}

/**
 * Test 5: Wall with multiple openings (1 door + 2 windows)
 * - 1 door on the left (0.9m x 2.1m)
 * - 2 windows: one at center, one at top right
 * - Tests complex opening interactions and multiple lintels
 */
export function getTest5Openings(wallHeight: number = 3.0) {
  const doorHeight = 2.1;
  const doorY = -wallHeight / 2 + doorHeight / 2;

  return [
    // Door on the left
    {
      placement: createPlacement(-1.2, doorY, 0), // Left side, bottom aligned
      size: {
        l: 0.9,
        w: 1.0,
        h: doorHeight,
      },
    },
    // Window at center
    {
      placement: createPlacement(0.5, 0, 0), // Center-right, mid-height (y=0 is center)
      size: {
        l: 1.0,
        w: 1.0,
        h: 1.0,
      },
    },
    // Window at top right
    {
      placement: createPlacement(1.35, wallHeight / 2 - 0.65, 0), // Right side, top (adjusted to fit)
      size: {
        l: 0.8,
        w: 1.0,
        h: 1.0,
      },
    },
  ];
}

/**
 * Get test scenario by number (1-5)
 */
export function getTestScenario(testNumber: number, wallHeight: number = 3.0) {
  switch (testNumber) {
    case 1:
      return {
        name: 'Test 1: No Openings',
        description: 'Simple wall without doors or windows',
        openings: getTest1Openings(),
      };
    case 2:
      return {
        name: 'Test 2: Door',
        description: 'Wall with standard door (0.9m × 2.1m) at ground level',
        openings: getTest2Openings(wallHeight),
      };
    case 3:
      return {
        name: 'Test 3: Window at Center',
        description: 'Wall with window in center (requires lintel)',
        openings: getTest3Openings(),
      };
    case 4:
      return {
        name: 'Test 4: Window at Top',
        description: 'Wall with window touching top (no lintel needed)',
        openings: getTest4Openings(wallHeight),
      };
    case 5:
      return {
        name: 'Test 5: Multiple Openings',
        description: '1 door + 2 windows (complex scenario)',
        openings: getTest5Openings(wallHeight),
      };
    default:
      return {
        name: 'Unknown Test',
        description: '',
        openings: [],
      };
  }
}

/**
 * Get all test scenarios as array
 */
export function getAllTestScenarios(wallHeight: number = 3.0) {
  return [
    getTestScenario(1, wallHeight),
    getTestScenario(2, wallHeight),
    getTestScenario(3, wallHeight),
    getTestScenario(4, wallHeight),
    getTestScenario(5, wallHeight),
  ];
}

/**
 * Helper to build complete BuildMasonryWallParams for testing
 */
export function buildTestParams(
  testNumber: number,
  completion: number = 1.0,
  wallDimensions = { l: 4.0, w: 0.2, h: 3.0 },
  blockDimensions = { l: 0.39, w: 0.14, h: 0.19 },
  cementThickness = 0.02
): Partial<BuildMasonryWallParams> {
  const scenario = getTestScenario(testNumber, wallDimensions.h);

  return {
    wall: {
      placement: createPlacement(0, wallDimensions.h / 2, 0),
      size: wallDimensions,
      blockSize: blockDimensions,
      cementThickness,
      materials: {
        masonry: {
          albedo: '/textures/masonry/brick_baseColor.png',
          metalness: 0.2,
          roughness: 0.8,
        },
        lintel: {
          albedo: '',
          metalness: 0.15,
          roughness: 0.7,
        },
        infill: {
          albedo: '',
          metalness: 0.1,
          roughness: 0.85,
        },
      },
    },
    openings: scenario.openings,
    task: {
      completion,
    },
  };
}
