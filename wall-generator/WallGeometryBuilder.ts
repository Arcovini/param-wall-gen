/**
 * Wall geometry builder - produces GeometryDescriptor from BuildMasonryWallParams.
 * DEC-A3: this file is the single point of translation THREE → descriptor (incremental path).
 * It uses WallBuilder to produce a THREE.Group, then traverses meshes and extracts
 * positions, indices, uvs, colors, groups, and material descriptors into engine-agnostic
 * MeshDescriptor. The next step toward full decoupling is for internal modules to use
 * GeometryBuilder.buildRaw() (RawMeshData) and produce descriptors without THREE first.
 */

import * as THREE from 'three';
import type { GeometryDescriptor, MeshDescriptor, MaterialDescriptor, MeshGroupDescriptor } from '../rendering-descriptors/types';
import type { BuildMasonryWallParams, Position, WallParams, OpeningParams, ModelParams, WallBounds } from './types';
import { WallBuilder } from './internal/builders/WallBuilder';

export interface WallDescriptorResult {
  descriptor: GeometryDescriptor;
  meshLocalPositions: Position[];
  wall: WallParams;
  openings: OpeningParams[];
  task: { completion: number };
  modelParams: ModelParams;
  bounds: WallBounds;
}

function meshToMaterialDescriptor(mat: THREE.Material): MaterialDescriptor {
  const m = mat as THREE.MeshStandardMaterial;
  const color = m.color != null ? m.color.getHex() : 0x808080;
  const desc: MaterialDescriptor = {
    color,
    opacity: m.opacity ?? 1,
    roughness: m.roughness,
    metalness: m.metalness,
    vertexColors: m.vertexColors === true,
    flatShading: m.flatShading === true,
  };
  if (m.map?.image?.src) {
    desc.texturePath = m.map.image.src;
    desc.textureRepeatX = m.map.repeat?.x ?? 1;
    desc.textureRepeatY = m.map.repeat?.y ?? 1;
  }
  return desc;
}

function extractMeshDescriptor(mesh: THREE.Mesh): MeshDescriptor {
  const geom = mesh.geometry;
  const materials = mesh.material
    ? (Array.isArray(mesh.material)
        ? (mesh.material as THREE.Material[]).map((m) => meshToMaterialDescriptor(m))
        : [meshToMaterialDescriptor(mesh.material as THREE.Material)])
    : [{ color: 0x808080, opacity: 1 }];
  const material = materials[0];

  if (!geom) {
    return {
      positions: new Float32Array(0),
      indices: new Uint32Array(0),
      material,
      ...(materials.length > 1 ? { materials } : {}),
    };
  }

  const posAttr = geom.getAttribute('position');
  const positions = posAttr ? new Float32Array(posAttr.array) : new Float32Array(0);
  const indexAttr = geom.getIndex();
  const indices = indexAttr ? new Uint32Array(indexAttr.array) : new Uint32Array(0);
  const uvAttr = geom.getAttribute('uv');
  const uvs = uvAttr ? new Float32Array(uvAttr.array) : undefined;
  const colorAttr = geom.getAttribute('color');
  const colors = colorAttr && colorAttr.array.length > 0 ? new Float32Array(colorAttr.array) : undefined;

  const groups: MeshGroupDescriptor[] | undefined =
    geom.groups && geom.groups.length > 0
      ? geom.groups.map((g) => ({ start: g.start, count: g.count, materialIndex: g.materialIndex ?? 0 }))
      : undefined;

  return {
    positions,
    indices,
    uvs,
    material,
    ...(colors ? { colors } : {}),
    ...(groups && groups.length > 0 ? { groups } : {}),
    ...(materials.length > 1 ? { materials } : {}),
  };
}

/**
 * Build wall descriptor and metadata from params.
 * Uses existing WallBuilder to generate geometry, then extracts engine-agnostic
 * descriptor and per-mesh local positions for the shared adapter pipeline.
 */
export function buildWallDescriptor(params: BuildMasonryWallParams): WallDescriptorResult {
  const group = new WallBuilder(params)
    .parseParameters()
    .precomputeOpeningBounds()
    .generateBaseWall()
    .addWallTopCap()
    .addInfill()
    .createOpenings()
    .applyCsgOperations()
    .addMetadata()
    .build();

  const meshes: MeshDescriptor[] = [];
  const meshLocalPositions: Position[] = [];

  group.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh;
      meshes.push(extractMeshDescriptor(mesh));
      meshLocalPositions.push({
        x: mesh.position.x,
        y: mesh.position.y,
        z: mesh.position.z
      });
    }
  });

  const ud = group.userData as {
    wall?: WallParams;
    openings?: OpeningParams[];
    task?: { completion: number };
    modelParams?: ModelParams;
    bounds?: WallBounds;
  };

  // Dispose only geometry; materials are shared singletons from MaterialManager and must not be disposed
  group.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
    }
  });

  return {
    descriptor: { meshes },
    meshLocalPositions,
    wall: ud.wall ?? params.wall,
    openings: ud.openings ?? params.openings,
    task: ud.task ?? params.task,
    modelParams: ud.modelParams ?? {
      isWalkable: false,
      isCollidable: true,
      roles: ['COLLIDABLE', 'REFERENCE'],
      keypoints: { bottomLeft: { x: 0, y: 0, z: 0 }, topLeft: { x: 0, y: 0, z: 0 }, bottomRight: { x: 0, y: 0, z: 0 }, topRight: { x: 0, y: 0, z: 0 } },
      centroid: { x: 0, y: 0, z: 0 }
    },
    bounds: ud.bounds ?? {
      completed: { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } },
      execution: { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } },
      openings: [],
      openingsExpanded: []
    }
  };
}
