import * as THREE from 'three';
import { applyPlacement } from '../WallPlacement';
import { RowGenerator } from '../RowGenerator';
import { BlockGenerator } from '../BlockGenerator';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/**
 * WallGenerator - Generates a grid of blocks to fill wall dimensions
 * Handles block positioning, cement joints, and material reuse
 */
export class WallGenerator {
  private scene: THREE.Scene | null = null;
  private wallGroup: THREE.Group | null = null;
  private blockGenerator: BlockGenerator;

  constructor() {
    this.blockGenerator = new BlockGenerator();
  }

  /**
   * Creates a 3D wall and adds it to the scene
   */
  createWall(
    wallWidth: number,
    wallHeight: number,
    wallLength: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number,
    scene: THREE.Scene,
    positionX: number = 0,
    positionY: number = 0,
    positionZ: number = 0,
    yawDegrees: number = 0,
    completion: number = 1.0
  ): void {
    this.scene = scene;

    // Clear previous wall
    this.clearWall();

    // Generate the wall group
    this.wallGroup = this.generateWallGroup(
      wallWidth,
      wallHeight,
      wallLength,
      blockWidth,
      blockHeight,
      cementThickness,
      positionX,
      positionY,
      positionZ,
      yawDegrees,
      completion
    );

    // Add to scene
    this.scene.add(this.wallGroup);
  }

  /**
   * Generates a wall group without adding it to the scene
   * Useful for external consumers like buildMasonryWall
   */
  generateWallGroup(
    wallWidth: number,
    wallHeight: number,
    wallLength: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number,
    positionX: number = 0,
    positionY: number = 0,
    positionZ: number = 0,
    yawDegrees: number = 0,
    completion: number = 1.0
  ): THREE.Group {
    // Create a new group to hold all wall meshes
    const wallGroup = new THREE.Group();
    this.wallGroup = wallGroup;

    // Calculate grid dimensions (truncate to integer)
    const blocksHorizontal = Math.floor(wallWidth / (blockWidth + cementThickness));
    const blocksVertical = Math.floor(wallHeight / (blockHeight + cementThickness));

    // Calculate how many rows to show based on completion percentage
    const rowsToShow = RowGenerator.getVisibleRows(blocksVertical, completion);

    console.log("WallGenerator:", {
      wallWidth, wallHeight, blockHeight, cementThickness,
      blocksVertical, completion, rowsToShow
    });

    // Calculate actual wall dimensions based on blocks that fit
    // Don't include cement thickness after the last block
    const actualWallWidth = blocksHorizontal > 0
      ? blocksHorizontal * blockWidth + (blocksHorizontal - 1) * cementThickness
      : 0;
    const fullWallHeight = blocksVertical * blockHeight + (blocksVertical - 1) * cementThickness;
    const completedWallHeight = rowsToShow > 0
      ? rowsToShow * blockHeight + (rowsToShow - 1) * cementThickness
      : 0;

    const allRowGeometries: THREE.BufferGeometry[] = [];

    // Generate Rows
    for (let row = 0; row < rowsToShow; row++) {
      const isLastRow = row === rowsToShow - 1;

      // Calculate Y position for this row
      // Center of the row
      const rowY = row * (blockHeight + cementThickness) - (fullWallHeight / 2) + (blockHeight / 2);

      // Create Row (Single Watertight Mesh)
      const rowGeometry = RowGenerator.createRow(
        this.blockGenerator,
        wallWidth,
        wallLength,
        blockWidth,
        blockHeight,
        cementThickness,
        isLastRow,
        false // unused
      );

      // Translate to correct Y position
      rowGeometry.translate(0, rowY, 0);
      allRowGeometries.push(rowGeometry);
    }

    // Create top and bottom caps for the wall
    // Actually, the rows are now closed boxes.
    // Stacking closed boxes is fine.
    // The bottom of Row 0 is closed.
    // The top of Row N is closed.
    // So we don't need extra wall caps anymore!
    // The side caps are also included in the row.

    // Merge all geometries
    // Filter out empty geometries
    const validGeometries = allRowGeometries.filter(g => g.attributes.position && g.attributes.position.count > 0);

    // Manual Merge to ensure correct Grouping
    // BufferGeometryUtils.mergeGeometries can be unpredictable with groups order.
    // We will manually merge attributes and consolidate indices into two groups.

    const finalGeometry = new THREE.BufferGeometry();

    if (validGeometries.length > 0) {
      const positions: number[] = [];
      const normals: number[] = [];
      const uvs: number[] = [];
      const uv2s: number[] = [];

      const globalBlockIndices: number[] = [];
      const globalCementIndices: number[] = [];

      let vertexOffset = 0;

      validGeometries.forEach(geom => {
        // 1. Append Attributes
        const posAttr = geom.attributes.position;
        const normAttr = geom.attributes.normal;
        const uvAttr = geom.attributes.uv;
        const uv2Attr = geom.attributes.uv2;

        for (let i = 0; i < posAttr.count; i++) {
          positions.push(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
          normals.push(normAttr.getX(i), normAttr.getY(i), normAttr.getZ(i));
          uvs.push(uvAttr.getX(i), uvAttr.getY(i));

          // Explicitly ensure uv2 matches uv for consistency, 
          // unless we really need separate lightmap UVs (which we don't yet).
          // This avoids any potential mismatch or missing attribute issues.
          if (uv2Attr) {
            uv2s.push(uv2Attr.getX(i), uv2Attr.getY(i));
          } else {
            uv2s.push(uvAttr.getX(i), uvAttr.getY(i));
          }
        }

        // 2. Append Indices (with offset) separated by Material Group
        const indexAttr = geom.index;
        if (indexAttr) {
          const indices = indexAttr.array;
          const groups = geom.groups;

          // If no groups, assume it's all block (Material 0)
          if (groups.length === 0) {
            for (let i = 0; i < indexAttr.count; i++) {
              globalBlockIndices.push(indices[i] + vertexOffset);
            }
          } else {
            groups.forEach(group => {
              const start = group.start;
              const count = group.count;
              const materialIndex = group.materialIndex;

              const targetIndices = materialIndex === 0 ? globalBlockIndices : globalCementIndices;

              for (let i = start; i < start + count; i++) {
                targetIndices.push(indices[i] + vertexOffset);
              }
            });
          }
        }

        vertexOffset += posAttr.count;

        // Debug log for first few rows
        if (validGeometries.indexOf(geom) < 3) {
          console.log(`Row ${validGeometries.indexOf(geom)}:`, {
            vertices: posAttr.count,
            groups: geom.groups.length,
            blockIndices: geom.groups.find(g => g.materialIndex === 0)?.count || 0,
            cementIndices: geom.groups.find(g => g.materialIndex === 1)?.count || 0
          });
        }
      });

      console.log("Final Merge Stats:", {
        totalVertices: positions.length / 3,
        totalBlockIndices: globalBlockIndices.length,
        totalCementIndices: globalCementIndices.length,
        vertexOffset: vertexOffset
      });

      // 3. Set Attributes to Final Geometry
      finalGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      finalGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
      finalGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      finalGeometry.setAttribute('uv2', new THREE.Float32BufferAttribute(uv2s, 2));

      // 4. Set Final Indices and Groups
      const finalIndices = [...globalBlockIndices, ...globalCementIndices];
      finalGeometry.setIndex(finalIndices);

      finalGeometry.addGroup(0, globalBlockIndices.length, 0); // Group 0: Blocks
      finalGeometry.addGroup(globalBlockIndices.length, globalCementIndices.length, 1); // Group 1: Cement
    }

    // Create Single Mesh with Multi-Material
    const blockMaterial = this.blockGenerator.getBrickMaterial();
    const cementMaterial = this.blockGenerator.getCementMaterial();

    const wallMesh = new THREE.Mesh(finalGeometry, [blockMaterial, cementMaterial]);
    wallMesh.castShadow = true;
    wallMesh.receiveShadow = true;
    wallMesh.name = "WallMesh";
    wallGroup.add(wallMesh);

    // Apply placement transformations to the wall group
    applyPlacement(wallGroup, { x: positionX, y: positionY, z: positionZ }, yawDegrees);

    return wallGroup;
  }

  /**
   * Creates top and bottom caps for the wall and adds them to cement geometries
   */
  private addWallCaps(cementGeometries: THREE.BufferGeometry[], wallWidth: number, completedWallHeight: number, wallLength: number, fullWallHeight: number): void {
    // Calculate edge positions based on bottom-up construction
    const bottomY = -fullWallHeight / 2;
    const topY = bottomY + completedWallHeight;

    // Top edge plane
    const topEdgeGeometry = new THREE.PlaneGeometry(wallWidth, wallLength);
    if (!topEdgeGeometry.attributes.uv2) topEdgeGeometry.setAttribute('uv2', topEdgeGeometry.attributes.uv);

    // Plane lies on XY. Normal +Z.
    // Rotate -PI/2 around X -> Plane lies on XZ. Normal +Y.
    topEdgeGeometry.rotateX(-Math.PI / 2);

    // Position
    topEdgeGeometry.translate(0, topY, -wallLength / 2);
    cementGeometries.push(topEdgeGeometry);

    // Bottom edge plane
    const bottomEdgeGeometry = new THREE.PlaneGeometry(wallWidth, wallLength);
    if (!bottomEdgeGeometry.attributes.uv2) bottomEdgeGeometry.setAttribute('uv2', bottomEdgeGeometry.attributes.uv);

    // We want normal pointing DOWN (-Y).
    // Rotate PI/2 around X -> Plane lies on XZ. Normal -Y.
    bottomEdgeGeometry.rotateX(Math.PI / 2);

    // Position
    bottomEdgeGeometry.translate(0, bottomY, -wallLength / 2);
    cementGeometries.push(bottomEdgeGeometry);
  }

  /**
   * Updates the wall dimensions and regenerates the 3D wall
   */
  updateWall(
    wallWidth: number,
    wallHeight: number,
    wallLength: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number,
    positionX: number = 0,
    positionY: number = 0,
    positionZ: number = 0,
    yawDegrees: number = 0,
    completion: number = 1.0
  ): void {
    if (this.scene) {
      this.createWall(wallWidth, wallHeight, wallLength, blockWidth, blockHeight, cementThickness, this.scene, positionX, positionY, positionZ, yawDegrees, completion);
    }
  }

  /**
   * Clears all blocks and cement joints from the scene
   */
  private clearWall(): void {
    if (!this.scene) return;

    // Remove wall group from scene if it exists
    if (this.wallGroup) {
      this.scene.remove(this.wallGroup);

      // Dispose of geometries in the group
      this.wallGroup.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          // Materials are managed by BlockGenerator, so we don't dispose them here
        }
      });

      this.wallGroup = null;
    }
  }

  /**
   * Disposes of all resources (geometries, materials, textures)
   */
  dispose(): void {
    this.clearWall();
    this.blockGenerator.dispose();
  }
}
