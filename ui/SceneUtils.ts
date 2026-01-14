import * as THREE from 'three';
import { BlockGenerator } from '../wall-generator/BlockGenerator';
import { RowGenerator } from '../wall-generator/RowGenerator';
import { GeometryBuilder } from '../wall-generator/utils/geometry/GeometryBuilder';

/**
 * View modes for the masonry wall visualization
 */
export type ViewMode = 'block' | 'row' | 'wall' | 'wall-output';

/**
 * SceneUtils - Utility functions for scene manipulation
 * Provides static methods for common scene operations
 */
export class SceneUtils {
  /**
   * Toggles wireframe mode for all meshes in the scene or a specific object
   */
  static setWireframeMode(sceneOrObject: THREE.Scene | THREE.Object3D, enabled: boolean): void {
    // Apply wireframe mode to all meshes
    sceneOrObject.traverse((object) => {
      if (object instanceof THREE.Mesh && object.material) {
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((mat) => {
          if ('wireframe' in mat) {
            (mat as any).wireframe = enabled;
          }
        });
      }
    });

    // Update background color only if it's a scene
    if (sceneOrObject instanceof THREE.Scene) {
      sceneOrObject.background = new THREE.Color(enabled ? 0xffffff : 0xf5f5f5);
    }
  }

  /**
   * Creates a textured floor plane
   */
  static createFloor(
    width: number,
    depth: number,
    yPosition: number = 0
  ): THREE.Mesh {
    const geometry = new THREE.PlaneGeometry(width, depth);

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const texturePath = '/textures/floor/';

    const baseColor = textureLoader.load(texturePath + 'DefaultMaterial_baseColor.png');
    const normalMap = textureLoader.load(texturePath + 'DefaultMaterial_normal.png');
    const ormMap = textureLoader.load(texturePath + 'DefaultMaterial_occlusionRoughnessMetallic.png');

    // Configure textures
    [baseColor, normalMap, ormMap].forEach(texture => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 4);
      texture.colorSpace = THREE.SRGBColorSpace;
    });

    // Normal map and ORM map should be linear
    normalMap.colorSpace = THREE.LinearSRGBColorSpace;
    ormMap.colorSpace = THREE.LinearSRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
      map: baseColor,
      normalMap: normalMap,
      roughnessMap: ormMap,
      metalnessMap: ormMap,
      aoMap: ormMap,
      roughness: 1.0, // Let texture control roughness
      metalness: 1.0, // Let texture control metalness
      color: 0xFFFFFF,
      side: THREE.DoubleSide
    });

    const floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2; // Rotate to horizontal
    floor.position.y = yPosition;
    floor.receiveShadow = true; // Receive shadows from objects above

    return floor;
  }

  /**
   * Creates a visualization based on the selected view mode
   * 
   * @param mode - The view mode ('block', 'row', or 'wall')
   * @param blockGenerator - Instance of BlockGenerator
   * @param wallParams - Wall parameters from the UI
   * @returns A THREE.Group containing the visualization
   */
  static createViewModeVisualization(
    mode: ViewMode,
    blockGenerator: BlockGenerator,
    wallParams: {
      blockWidth: number;
      blockHeight: number;
      wallLength: number;
      cementThickness: number;
      actualWallWidth?: number;
    }
  ): THREE.Group {
    const group = new THREE.Group();
    group.name = `ViewMode_${mode}`;

    switch (mode) {
      case 'block': {
        // Create a single block using addBlockToBuilder
        const builder = new GeometryBuilder();
        const { blockWidth, blockHeight, wallLength, cementThickness } = wallParams;

        const totalHeight = blockHeight + cementThickness;
        const halfTotalHeight = totalHeight / 2;
        const yBottom = -halfTotalHeight;
        const yTopBrick = -halfTotalHeight + blockHeight;
        const yTopCement = halfTotalHeight;

        // Block centered at origin: xLeft = -blockWidth/2
        const xLeft = -blockWidth / 2;
        const xRight = xLeft + blockWidth + cementThickness;
        const halfDepth = wallLength / 2;
        const zFront = halfDepth;
        const zBack = -halfDepth;

        blockGenerator.addBlockToBuilder(
          builder, xLeft, blockWidth, wallLength, cementThickness,
          0, 1, yBottom, yTopBrick, yTopCement
        );

        // Add end caps for a closed single block
        // Left cap (brick + cement)
        const lb0 = builder.addVertex(xLeft, yBottom, zBack, 0, 0);
        const lb1 = builder.addVertex(xLeft, yBottom, zFront, 1, 0);
        const lb2 = builder.addVertex(xLeft, yTopBrick, zFront, 1, 1);
        const lb3 = builder.addVertex(xLeft, yTopBrick, zBack, 0, 1);
        builder.addQuad(lb0, lb1, lb2, lb3, false);

        const lc0 = builder.addVertex(xLeft, yTopBrick, zBack, 0, 0);
        const lc1 = builder.addVertex(xLeft, yTopBrick, zFront, 1, 0);
        const lc2 = builder.addVertex(xLeft, yTopCement, zFront, 1, 1);
        const lc3 = builder.addVertex(xLeft, yTopCement, zBack, 0, 1);
        builder.addQuad(lc0, lc1, lc2, lc3, true);

        // Right cap (brick + cement)
        const rb0 = builder.addVertex(xRight, yBottom, zFront, 0, 0);
        const rb1 = builder.addVertex(xRight, yBottom, zBack, 1, 0);
        const rb2 = builder.addVertex(xRight, yTopBrick, zBack, 1, 1);
        const rb3 = builder.addVertex(xRight, yTopBrick, zFront, 0, 1);
        builder.addQuad(rb0, rb1, rb2, rb3, false);

        const rc0 = builder.addVertex(xRight, yTopBrick, zFront, 0, 0);
        const rc1 = builder.addVertex(xRight, yTopBrick, zBack, 1, 0);
        const rc2 = builder.addVertex(xRight, yTopCement, zBack, 1, 1);
        const rc3 = builder.addVertex(xRight, yTopCement, zFront, 0, 1);
        builder.addQuad(rc0, rc1, rc2, rc3, true);

        const blockGeo = builder.build();
        const materials = [
          blockGenerator.getBrickMaterial(),
          blockGenerator.getCementMaterial()
        ];
        const blockMesh = new THREE.Mesh(blockGeo, materials);
        blockMesh.castShadow = true;
        blockMesh.receiveShadow = true;
        blockMesh.name = 'SingleBlock';
        group.add(blockMesh);
        break;
      }

      case 'row':
        // Create a single row with 8 blocks for demonstration
        const actualWidth = wallParams.actualWallWidth || wallParams.blockWidth * 8 + wallParams.cementThickness * 7;
        const rowGroup = RowGenerator.createRow(
          blockGenerator,
          actualWidth,
          wallParams.wallLength,
          wallParams.blockWidth,
          wallParams.blockHeight,
          wallParams.cementThickness
        );
        rowGroup.name = 'SingleRow';
        group.add(rowGroup);
        break;

      case 'wall':
        // Wall view is handled by the main buildMasonryWall function
        // Return empty group as placeholder
        group.name = 'ViewMode_wall_placeholder';
        break;

      case 'wall-output':
        // Wall output view is handled by the main buildMasonryWall function
        // Return empty group as placeholder
        group.name = 'ViewMode_wall_output_placeholder';
        break;
    }

    return group;
  }
}

