import * as THREE from 'three';
import { MaterialManager } from './MaterialManager';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export class BlockGenerator {
  constructor() {
    // Materials are managed by MaterialManager
  }

  /**
   * Creates an open-sided block geometry with cement layer on top and right side.
   * The block consists of:
   * - Brick portion (front, back, bottom - NO top since cement covers it)
   * - Cement layer on top (front, back, top)
   * - Cement vertical strip on RIGHT side (front, back, right)
   * - Corner where top cement meets right cement
   * 
   * Left side is open (will be closed by RowGenerator for the row)
   * 
   * @param width Block width (X-axis)
   * @param height Block height (Y-axis) - brick portion only
   * @param depth Block depth (Z-axis, wallLength)
   * @param cementThickness Thickness of cement layer on top
   * @returns Merged BufferGeometry with welded vertices and material groups
   */
  createBlockGeometry(
    width: number,
    height: number,
    depth: number,
    cementThickness: number = 0
  ): THREE.BufferGeometry {
    const halfWidth = width / 2;
    const halfDepth = depth / 2;

    // Total height includes brick + cement
    const totalHeight = height + cementThickness;
    const halfTotalHeight = totalHeight / 2;
    const halfBrickHeight = height / 2;

    // Y positions
    const yBottom = -halfTotalHeight;
    const yTopBrick = -halfTotalHeight + height;
    const yTopCement = halfTotalHeight;

    // X positions
    const xLeft = -halfWidth;
    const xRight = halfWidth;
    const xRightCement = halfWidth + cementThickness;

    const geometries: THREE.BufferGeometry[] = [];

    // ===== BRICK PORTION =====

    // Front face - Brick
    const frontBrickGeo = new THREE.PlaneGeometry(width, height);
    frontBrickGeo.translate(0, yBottom + halfBrickHeight, halfDepth);
    geometries.push(frontBrickGeo);

    // Back face - Brick (flipped normals)
    const backBrickGeo = new THREE.PlaneGeometry(width, height);
    backBrickGeo.rotateY(Math.PI);
    backBrickGeo.translate(0, yBottom + halfBrickHeight, -halfDepth);
    geometries.push(backBrickGeo);

    // Bottom face of brick
    const bottomBrickGeo = new THREE.PlaneGeometry(width, depth);
    bottomBrickGeo.rotateX(Math.PI / 2);
    bottomBrickGeo.translate(0, yBottom, 0);
    geometries.push(bottomBrickGeo);

    // NOTE: No top face for brick - cement covers it

    // ===== CEMENT PORTION (if cementThickness > 0) =====
    const cementGeometries: THREE.BufferGeometry[] = [];

    if (cementThickness > 0) {
      // === HORIZONTAL CEMENT (on top of brick) ===

      // Front face - Horizontal cement
      const frontCementGeo = new THREE.PlaneGeometry(width, cementThickness);
      frontCementGeo.translate(0, yTopBrick + cementThickness / 2, halfDepth);
      cementGeometries.push(frontCementGeo);

      // Back face - Horizontal cement (flipped normals)
      const backCementGeo = new THREE.PlaneGeometry(width, cementThickness);
      backCementGeo.rotateY(Math.PI);
      backCementGeo.translate(0, yTopBrick + cementThickness / 2, -halfDepth);
      cementGeometries.push(backCementGeo);

      // Top face of horizontal cement
      const topCementGeo = new THREE.PlaneGeometry(width, depth);
      topCementGeo.rotateX(-Math.PI / 2);
      topCementGeo.translate(0, yTopCement, 0);
      cementGeometries.push(topCementGeo);

      // === VERTICAL CEMENT (right side of brick) ===

      // Front face - Vertical cement
      const frontVertCementGeo = new THREE.PlaneGeometry(cementThickness, height);
      frontVertCementGeo.translate(xRight + cementThickness / 2, yBottom + halfBrickHeight, halfDepth);
      cementGeometries.push(frontVertCementGeo);

      // Back face - Vertical cement (flipped normals)
      const backVertCementGeo = new THREE.PlaneGeometry(cementThickness, height);
      backVertCementGeo.rotateY(Math.PI);
      backVertCementGeo.translate(xRight + cementThickness / 2, yBottom + halfBrickHeight, -halfDepth);
      cementGeometries.push(backVertCementGeo);



      // === CORNER (where horizontal and vertical cement meet) ===

      // Front face - Corner
      const frontCornerGeo = new THREE.PlaneGeometry(cementThickness, cementThickness);
      frontCornerGeo.translate(xRight + cementThickness / 2, yTopBrick + cementThickness / 2, halfDepth);
      cementGeometries.push(frontCornerGeo);

      // Back face - Corner (flipped normals)
      const backCornerGeo = new THREE.PlaneGeometry(cementThickness, cementThickness);
      backCornerGeo.rotateY(Math.PI);
      backCornerGeo.translate(xRight + cementThickness / 2, yTopBrick + cementThickness / 2, -halfDepth);
      cementGeometries.push(backCornerGeo);



      // Top face - Corner (horizontal)
      const topCornerGeo = new THREE.PlaneGeometry(cementThickness, depth);
      topCornerGeo.rotateX(-Math.PI / 2);
      topCornerGeo.translate(xRight + cementThickness / 2, yTopCement, 0);
      cementGeometries.push(topCornerGeo);
    }

    // Ensure all geometries have UV2
    [...geometries, ...cementGeometries].forEach(geo => {
      if (!geo.attributes.uv2) {
        geo.setAttribute('uv2', geo.attributes.uv);
      }
    });

    // Calculate index counts BEFORE merging
    const blockIndexCount = geometries.reduce((sum, geo) => sum + (geo.index?.count || 0), 0);
    const cementIndexCount = cementGeometries.reduce((sum, geo) => sum + (geo.index?.count || 0), 0);

    // Merge all geometries
    const mergedGeo = BufferGeometryUtils.mergeGeometries([
      ...geometries,
      ...cementGeometries
    ]);

    if (!mergedGeo) {
      throw new Error('Failed to merge block geometries');
    }

    // Merge vertices at shared edges
    const weldedGeo = BufferGeometryUtils.mergeVertices(mergedGeo);

    // Set material groups
    weldedGeo.clearGroups();
    weldedGeo.addGroup(0, blockIndexCount, 0); // Material index 0: Brick
    weldedGeo.addGroup(blockIndexCount, cementIndexCount, 1); // Material index 1: Cement

    return weldedGeo;
  }

  /**
   * Returns the shared brick material
   */
  getBrickMaterial(): THREE.Material {
    return MaterialManager.getInstance().getBrickMaterial();
  }

  /**
   * Returns the shared cement material
   */
  getCementMaterial(): THREE.Material {
    return MaterialManager.getInstance().getCementMaterial();
  }

  /**
   * Disposes of resources
   */
  dispose(): void {
    // Materials are managed by MaterialManager, so we don't dispose them here
  }
}
