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
    // It is centered at (0,0,0) relative to the group because the group itself is placed at (x,y,z).
    const mesh = this.generateWall(targetWidth, targetHeight, targetLength, 0, 0, 0, 0);

    wallGroup.add(mesh);
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

    // Calculate Y offset.
    // The wall group is centered vertically based on the TARGET height.
    // So local Y=0 corresponds to the center of the target wall.
    // The bottom of the target wall is at local Y = -targetHeight / 2.
    // We want the actual wall to start at the same bottom.
    // The center of the actual wall (height H) is at bottom + H / 2.
    // So: y = (-targetHeight / 2) + (actualHeight / 2).
    const y = (-targetHeight / 2) + (actualHeight / 2);

    console.log("Creating actual wall placeholder with y offset:", y);

    // Center at (0, y, 0) relative to the group
    const mesh = this.generateActualWall(actualWidth, actualHeight, targetLength, 0, y, 0, 0);
    wallGroup.add(mesh);
  }
}
