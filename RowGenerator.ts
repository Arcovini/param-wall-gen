import * as THREE from 'three';
import { BlockGenerator } from './BlockGenerator';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export interface RowSpecification {
  rowHeight: number;
  totalRows: number;
  completionPerRow: number;
  actualWallHeight: number;
}

export class RowGenerator {
  static calculateRowSpecs(
    wallHeight: number,
    blockHeight: number,
    cementThickness: number
  ): RowSpecification {
    const rowHeight = blockHeight + cementThickness;
    const totalRows = Math.floor(wallHeight / rowHeight);
    const completionPerRow = rowHeight / wallHeight;
    const actualWallHeight = totalRows * blockHeight + (totalRows - 1) * cementThickness;

    return {
      rowHeight,
      totalRows,
      completionPerRow,
      actualWallHeight
    };
  }

  static getVisibleRows(totalRows: number, completion: number): number {
    const clampedCompletion = Math.max(0, Math.min(1, completion));
    return Math.floor(totalRows * clampedCompletion);
  }

  static getCompletedHeight(
    specs: RowSpecification,
    completion: number,
    blockHeight: number,
    cementThickness: number
  ): number {
    const visibleRows = this.getVisibleRows(specs.totalRows, completion);
    if (visibleRows === 0) return 0;
    return visibleRows * blockHeight + (visibleRows - 1) * cementThickness;
  }

  static getRowCompletionPercentage(rowIndex: number, totalRows: number): number {
    if (totalRows === 0) return 0;
    return (rowIndex + 1) / totalRows;
  }

  /**
   * Creates a complete row as a single watertight mesh with material groups.
   * Group 0: Blocks
   * Group 1: Cement
   */
  static createRow(
    blockGenerator: BlockGenerator,
    actualWallWidth: number,
    wallLength: number,
    blockWidth: number,
    blockHeight: number,
    cementThickness: number,
    isLastRow: boolean,
    invertNormals: boolean // Kept for compatibility
  ): THREE.BufferGeometry {
    const blockGeometries: THREE.BufferGeometry[] = [];
    const cementGeometries: THREE.BufferGeometry[] = [];

    const halfRowWidth = actualWallWidth / 2;
    const halfWallLength = wallLength / 2;
    const blocksHorizontal = Math.round(actualWallWidth / (blockWidth + cementThickness));

    // Y coordinates for row positioning
    const yBottom = -blockHeight / 2;
    const yTopBlock = blockHeight / 2;
    const yTopCement = yTopBlock + (!isLastRow ? cementThickness : 0);
    const yTopRow = !isLastRow ? yTopCement : yTopBlock;

    // Create blocks and cement joints
    for (let col = 0; col < blocksHorizontal; col++) {
      const isLastColumn = col === blocksHorizontal - 1;
      const xPosition = col * (blockWidth + cementThickness) - halfRowWidth + (blockWidth / 2);

      // Create block using BlockGenerator (has front, back, top, bottom - no left/right sides)
      const blockGeo = blockGenerator.createBlockGeometry(blockWidth, blockHeight, wallLength, cementThickness);
      blockGeo.translate(xPosition, cementThickness / 2, 0); // Offset by half cement thickness for proper positioning
      blockGeometries.push(blockGeo);

      // Vertical cement between blocks (if not last column)
      if (!isLastColumn) {
        const xCement = xPosition + blockWidth / 2 + cementThickness / 2;

        // Front cement plane
        const cementFrontGeo = new THREE.PlaneGeometry(cementThickness, blockHeight);
        cementFrontGeo.translate(xCement, 0, halfWallLength);
        cementGeometries.push(cementFrontGeo);

        // Back cement plane (flipped normals)
        const cementBackGeo = new THREE.PlaneGeometry(cementThickness, blockHeight);
        cementBackGeo.rotateY(Math.PI);
        cementBackGeo.translate(xCement, 0, -halfWallLength);
        cementGeometries.push(cementBackGeo);

        // Top connecting plane for vertical cement
        const cementTopGeo = new THREE.PlaneGeometry(cementThickness, wallLength);
        cementTopGeo.rotateX(-Math.PI / 2);
        cementTopGeo.translate(xCement, yTopBlock, 0);
        cementGeometries.push(cementTopGeo);

        // Bottom connecting plane for vertical cement
        const cementBottomGeo = new THREE.PlaneGeometry(cementThickness, wallLength);
        cementBottomGeo.rotateX(Math.PI / 2);
        cementBottomGeo.translate(xCement, yBottom, 0);
        cementGeometries.push(cementBottomGeo);
      }
    }

    // Horizontal cement on top of row (if not last row)
    if (!isLastRow) {
      const topCementY = yTopBlock + cementThickness / 2;

      // Front cement strip
      const topCementFrontGeo = new THREE.PlaneGeometry(actualWallWidth, cementThickness);
      topCementFrontGeo.translate(0, topCementY, halfWallLength);
      cementGeometries.push(topCementFrontGeo);

      // Back cement strip (flipped normals)
      const topCementBackGeo = new THREE.PlaneGeometry(actualWallWidth, cementThickness);
      topCementBackGeo.rotateY(Math.PI);
      topCementBackGeo.translate(0, topCementY, -halfWallLength);
      cementGeometries.push(topCementBackGeo);

      // Top connecting plane for horizontal cement
      const topCementTopGeo = new THREE.PlaneGeometry(actualWallWidth, wallLength);
      topCementTopGeo.rotateX(-Math.PI / 2);
      topCementTopGeo.translate(0, yTopCement, 0);
      cementGeometries.push(topCementTopGeo);
    }

    // Left closing plane (perpendicular) - BEFORE MERGE
    const leftCapGeo = new THREE.PlaneGeometry(wallLength, yTopRow - yBottom);
    leftCapGeo.rotateY(Math.PI / 2);
    leftCapGeo.translate(-halfRowWidth, (yTopRow + yBottom) / 2, 0);

    // Ensure UV2 for left cap
    if (!leftCapGeo.attributes.uv2) {
      leftCapGeo.setAttribute('uv2', leftCapGeo.attributes.uv);
    }
    blockGeometries.push(leftCapGeo);

    // Right closing plane (perpendicular) - BEFORE MERGE
    const rightCapGeo = new THREE.PlaneGeometry(wallLength, yTopRow - yBottom);
    rightCapGeo.rotateY(-Math.PI / 2);
    rightCapGeo.translate(halfRowWidth, (yTopRow + yBottom) / 2, 0);

    // Ensure UV2 for right cap
    if (!rightCapGeo.attributes.uv2) {
      rightCapGeo.setAttribute('uv2', rightCapGeo.attributes.uv);
    }
    blockGeometries.push(rightCapGeo);

    // Ensure all cement geometries have UV2
    cementGeometries.forEach(geo => {
      if (!geo.attributes.uv2) {
        geo.setAttribute('uv2', geo.attributes.uv);
      }
    });

    // Calculate index counts BEFORE merging
    const blockIndexCount = blockGeometries.reduce((sum, geo) => sum + (geo.index?.count || 0), 0);
    const cementIndexCount = cementGeometries.reduce((sum, geo) => sum + (geo.index?.count || 0), 0);

    // Merge all geometries
    const mergedGeo = BufferGeometryUtils.mergeGeometries([
      ...blockGeometries,
      ...cementGeometries
    ]);

    if (!mergedGeo) {
      throw new Error('Failed to merge geometries in createRow');
    }

    // Merge vertices to weld edges
    const weldedGeo = BufferGeometryUtils.mergeVertices(mergedGeo);

    // Set material groups
    weldedGeo.clearGroups();
    weldedGeo.addGroup(0, blockIndexCount, 0); // Material index 0: Blocks
    weldedGeo.addGroup(blockIndexCount, cementIndexCount, 1); // Material index 1: Cement

    return weldedGeo;
  }

  // Removed createRowSideMesh as it is now integrated
}
