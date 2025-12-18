import * as THREE from 'three';

export class PlaceholderWall {
  static generateWall(
    width: number,
    height: number,
    length: number,
    x: number,
    y: number,
    z: number,
    rotation: number
  ): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(width, height, length);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      transparent: true,
      opacity: 0.5
    });
    const mesh = new THREE.Mesh(geometry, material);

    // Set position (center of the box is at x, y, z)
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotation;

    return mesh;
  }

  /**
   * Creates a small sphere to indicate the pivot point of the wall
   */
  static createPivotIndicator(): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(0.05, 16, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: false
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'PivotIndicator';
    return mesh;
  }

  static attachWall(
    wallGroup: THREE.Group,
    targetWidth: number,
    targetHeight: number,
    targetLength: number,
    x: number,
    y: number,
    z: number,
    rotation: number
  ): void {
    // The "Wall Placeholder" (Yellow) should represent the TARGET dimensions.
    // Since the wall now uses bottom-left as pivot point, the placeholder
    // needs to be positioned at (width/2, height/2, 0) relative to the group
    const mesh = this.generateWall(targetWidth, targetHeight, targetLength, 0, 0, 0, 0);

    // Position placeholder to align with the new bottom-left pivot system
    mesh.position.set(targetWidth / 2, targetHeight / 2, 0);

    wallGroup.add(mesh);

    // Add pivot point indicator at the bottom-left corner (origin of local space)
    const pivotIndicator = this.createPivotIndicator();
    pivotIndicator.position.set(0, 0, 0);
    wallGroup.add(pivotIndicator);
  }

  static generateActualWall(
    width: number,
    height: number,
    length: number,
    x: number,
    y: number,
    z: number,
    rotation: number
  ): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(width, height, length);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.5
    });
    const mesh = new THREE.Mesh(geometry, material);

    // Set position (center of the box is at x, y, z)
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotation;

    return mesh;
  }

  static attachActualWall(
    wallGroup: THREE.Group,
    targetHeight: number,
    targetLength: number
  ): void {
    // The "Actual Wall Placeholder" (Green) should represent the VISIBLE/TRUNCATED dimensions.
    const actualWidth = wallGroup.userData.actualWallWidth || 0;
    const actualHeight = wallGroup.userData.actualWallHeight || 0;

    console.log("attachActualWall called:", {
      actualWidth,
      actualHeight,
      targetHeight,
      targetLength,
      userData: wallGroup.userData
    });

    // Skip if dimensions are invalid
    if (actualWidth === 0 || actualHeight === 0) {
      console.warn("Skipping actual wall placeholder: dimensions are 0");
      return;
    }

    // With bottom-left pivot, the actual wall placeholder should be positioned so that
    // its bottom-left corner aligns with the origin (0, 0, 0).
    // Center of box is at (actualWidth/2, actualHeight/2, 0)
    const x = actualWidth / 2;
    const y = actualHeight / 2;

    console.log("Creating actual wall placeholder with position:", { x, y });

    const mesh = this.generateActualWall(actualWidth, actualHeight, targetLength, x, y, 0, 0);
    wallGroup.add(mesh);
  }
}

