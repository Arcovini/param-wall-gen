import * as THREE from 'three';

export class GeometryBuilder {
  private vertices: number[] = [];
  private uvs: number[] = [];
  private brickIndices: number[] = [];
  private cementIndices: number[] = [];
  private vertexIndex = 0;

  addVertex(x: number, y: number, z: number, u: number, v: number): number {
    this.vertices.push(x, y, z);
    this.uvs.push(u, v);
    return this.vertexIndex++;
  }

  addQuad(v0: number, v1: number, v2: number, v3: number, isCement: boolean): void {
    const indices = isCement ? this.cementIndices : this.brickIndices;
    indices.push(v0, v1, v2, v0, v2, v3);
  }

  build(computeNormals = true): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.vertices, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(this.uvs, 2));
    geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(this.uvs, 2));

    geometry.setIndex([...this.brickIndices, ...this.cementIndices]);

    geometry.clearGroups();
    geometry.addGroup(0, this.brickIndices.length, 0);
    geometry.addGroup(this.brickIndices.length, this.cementIndices.length, 1);

    if (computeNormals) {
      geometry.computeVertexNormals();
    }

    return geometry;
  }
}
