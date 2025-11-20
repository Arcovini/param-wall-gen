import * as THREE from 'three';

export class PlaceholderWall {
  static generate(
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

  static attach(
    wallGroup: THREE.Group,
    fallbackWidth: number,
    height: number,
    length: number,
    x: number,
    y: number,
    z: number,
    rotation: number
  ): void {
    const actualWidth = wallGroup.userData.actualWallWidth || fallbackWidth;

    // The wall geometry is centered around (0,0,0) in WallGenerator.ts (lines 112).
    // So we should also center the placeholder at (0,0,0) relative to the group.
    const mesh = this.generate(actualWidth, height, length, 0, 0, 0, 0);

    wallGroup.add(mesh);
  }
}
