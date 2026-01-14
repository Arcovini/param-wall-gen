import * as THREE from 'three';

/**
 * Builder class for constructing BufferGeometry with proper vertex sharing,
 * multi-material groups, and standard attribute setup.
 *
 * Consolidates geometry construction patterns for masonry elements.
 */
export class GeometryBuilder {
  private vertices: number[] = [];
  private uvs: number[] = [];
  private brickIndices: number[] = [];
  private cementIndices: number[] = [];
  private vertexIndex: number = 0;

  /**
   * Adds a vertex with UV coordinates.
   * @returns The index of the added vertex (for use in face definitions)
   */
  addVertex(x: number, y: number, z: number, u: number, v: number): number {
    this.vertices.push(x, y, z);
    this.uvs.push(u, v);
    return this.vertexIndex++;
  }

  /**
   * Adds a quad face (two triangles) to the geometry.
   * Vertices should be ordered counter-clockwise when viewed from the front.
   *
   * @param v0 First vertex index (bottom-left)
   * @param v1 Second vertex index (bottom-right)
   * @param v2 Third vertex index (top-right)
   * @param v3 Fourth vertex index (top-left)
   * @param isCement If true, adds to cement material group; otherwise brick
   */
  addQuad(v0: number, v1: number, v2: number, v3: number, isCement: boolean): void {
    const indices = isCement ? this.cementIndices : this.brickIndices;
    indices.push(v0, v1, v2);
    indices.push(v0, v2, v3);
  }

  /**
   * Builds the final BufferGeometry with standard attributes and material groups.
   * Sets position, uv, uv2 attributes and configures brick/cement material groups.
   *
   * @param computeNormals Whether to compute vertex normals (default: true)
   * @returns The completed BufferGeometry
   */
  build(computeNormals: boolean = true): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.vertices, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(this.uvs, 2));
    geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(this.uvs, 2));

    const allIndices = [...this.brickIndices, ...this.cementIndices];
    geometry.setIndex(allIndices);

    geometry.clearGroups();
    geometry.addGroup(0, this.brickIndices.length, 0);
    geometry.addGroup(this.brickIndices.length, this.cementIndices.length, 1);

    if (computeNormals) {
      geometry.computeVertexNormals();
    }

    return geometry;
  }
}
