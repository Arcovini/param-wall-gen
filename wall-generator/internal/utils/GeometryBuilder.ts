import * as THREE from 'three';

/** Engine-agnostic mesh data (typed arrays + groups). Use buildRaw() to obtain without THREE. */
export interface RawMeshData {
  positions: Float32Array;
  colors: Float32Array;
  uvs: Float32Array;
  indices: Uint32Array;
  groups: { start: number; count: number; materialIndex: number }[];
}

/** Color as THREE.Color or plain RGB (engine-agnostic). */
export type ColorLike = THREE.Color | { r: number; g: number; b: number };

function toRgb(c: ColorLike): { r: number; g: number; b: number } {
  return 'r' in c && typeof c.r === 'number' ? { r: c.r, g: c.g, b: c.b } : { r: (c as THREE.Color).r, g: (c as THREE.Color).g, b: (c as THREE.Color).b };
}

export class GeometryBuilder {
  private vertices: number[] = [];
  private colors: number[] = [];
  private uvs: number[] = [];
  private brickIndices: number[] = [];
  private cementIndices: number[] = [];
  private vertexIndex = 0;
  private defaultColor: THREE.Color = new THREE.Color(0xffffff);

  /**
   * Sets the default color for vertices that don't specify a color
   */
  setDefaultColor(color: ColorLike): void {
    const rgb = toRgb(color);
    this.defaultColor.setRGB(rgb.r, rgb.g, rgb.b);
  }

  /**
   * Adds a vertex with position, UV, and optional color
   */
  addVertex(x: number, y: number, z: number, u: number, v: number, color?: ColorLike): number {
    this.vertices.push(x, y, z);
    this.uvs.push(u, v);
    const rgb = color != null ? toRgb(color) : { r: this.defaultColor.r, g: this.defaultColor.g, b: this.defaultColor.b };
    this.colors.push(rgb.r, rgb.g, rgb.b);
    return this.vertexIndex++;
  }

  addQuad(v0: number, v1: number, v2: number, v3: number, isCement: boolean): void {
    const indices = isCement ? this.cementIndices : this.brickIndices;
    indices.push(v0, v1, v2, v0, v2, v3);
  }

  /**
   * Returns raw typed arrays and groups (no THREE dependency). Use for engine-agnostic pipelines.
   */
  buildRaw(): RawMeshData {
    const allIndices = [...this.brickIndices, ...this.cementIndices];
    return {
      positions: new Float32Array(this.vertices),
      colors: new Float32Array(this.colors),
      uvs: new Float32Array(this.uvs),
      indices: new Uint32Array(allIndices),
      groups: [
        { start: 0, count: this.brickIndices.length, materialIndex: 0 },
        { start: this.brickIndices.length, count: this.cementIndices.length, materialIndex: 1 }
      ]
    };
  }

  /**
   * Builds THREE.BufferGeometry (wrapper over buildRaw for backward compatibility).
   */
  build(computeNormals = true): THREE.BufferGeometry {
    return rawToBufferGeometry(this.buildRaw(), computeNormals);
  }
}

/** Converts RawMeshData to THREE.BufferGeometry. Shared by RowGenerator and debugViews. */
export function rawToBufferGeometry(raw: RawMeshData, computeNormals = true): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(raw.positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(raw.colors, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(raw.uvs, 2));
  geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(raw.uvs, 2));
  geometry.setIndex(new THREE.BufferAttribute(raw.indices, 1));
  geometry.clearGroups();
  for (const g of raw.groups) {
    geometry.addGroup(g.start, g.count, g.materialIndex);
  }
  if (computeNormals) {
    geometry.computeVertexNormals();
  }
  return geometry;
}
