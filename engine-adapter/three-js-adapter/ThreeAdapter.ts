/**
 * ThreeAdapter - Three.js translation of GeometryDescriptor.
 * DEC-A3: creates BufferGeometry, Material, Mesh per mesh; single Group with pose.
 * Also provides updateInstance (style) and dispose for any group created by this adapter.
 */

import * as THREE from 'three';
import { SRGBColorSpace } from 'three';
import type { GeometryDescriptor, MeshDescriptor, MaterialDescriptor } from '../../rendering-descriptors/types';

const DEFAULT_ROUGHNESS = 0.9;
const DEFAULT_METALNESS = 0.1;

const textureCache = new Map<string, THREE.Texture>();
const textureLoader = new THREE.TextureLoader();

export interface Pose {
  position: { x: number; y: number; z: number };
  rotation: { yaw: number };
}

/** Style update contract (compatible with ElementStyleUpdate from column/wall). */
export interface StyleUpdate {
  styleValues: Array<{ property: string; value: number | string }>;
}

function parseColor(value: number | string | undefined): number {
  if (value === undefined) return 0x4488ff;
  if (typeof value === 'number') return value;
  const s = String(value).replace(/^#/, '');
  return parseInt(s, 16);
}

function gaussianRandom(): number {
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function generateVariedColor(baseColor: THREE.Color, sigma: number): THREE.Color {
  const color = baseColor.clone();
  const normalizedSigma = sigma / 10;
  const hsl = { h: 0, s: 0, l: 0 };
  color.getHSL(hsl, SRGBColorSpace);
  hsl.h = hsl.h + gaussianRandom() * normalizedSigma * 0.2;
  hsl.s = Math.max(0, Math.min(1, hsl.s + gaussianRandom() * normalizedSigma * 0.5));
  hsl.l = Math.max(0, Math.min(1, hsl.l + gaussianRandom() * normalizedSigma));
  color.setHSL(hsl.h, hsl.s, hsl.l, SRGBColorSpace);
  return color;
}

function loadTexture(path: string, repeatX: number, repeatY: number): THREE.Texture {
  const cacheKey = `${path}|${repeatX}|${repeatY}`;
  if (!textureCache.has(cacheKey)) {
    const texture = textureLoader.load(path);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.colorSpace = SRGBColorSpace;
    texture.repeat.set(repeatX, repeatY);
    textureCache.set(cacheKey, texture);
  }
  return textureCache.get(cacheKey)!;
}

function resolveMaterialColor(matDesc: MaterialDescriptor): number {
  const baseHex = parseColor(matDesc.color);
  const baseColor = new THREE.Color(baseHex);
  if (matDesc.colorSigma && matDesc.colorSigma > 0) {
    return generateVariedColor(baseColor, matDesc.colorSigma).getHex();
  }
  return baseColor.getHex();
}

function buildMaterialFromDescriptor(matDesc: MaterialDescriptor): THREE.MeshStandardMaterial {
  const color = resolveMaterialColor(matDesc);
  const opacity = matDesc.opacity ?? 1;
  const roughness = matDesc.roughness ?? DEFAULT_ROUGHNESS;
  const metalness = matDesc.metalness ?? DEFAULT_METALNESS;
  const useVertexColors = matDesc.vertexColors === true;
  const flatShading = matDesc.flatShading ?? true;

  const material = new THREE.MeshStandardMaterial({
    color: useVertexColors ? 0xffffff : color,
    opacity,
    transparent: opacity < 1,
    flatShading,
    roughness,
    metalness,
    vertexColors: useVertexColors,
  });

  let texturePath: string | undefined;
  if (matDesc.texturePath) {
    texturePath = matDesc.texturePath;
  } else if (matDesc.texture) {
    texturePath = (matDesc.textureFolder ?? '') + matDesc.texture;
  }
  if (texturePath) {
    const repeatX = matDesc.textureRepeatX ?? 1;
    const repeatY = matDesc.textureRepeatY ?? 1;
    material.map = loadTexture(texturePath, repeatX, repeatY);
  }

  return material;
}

function buildMeshFromDescriptor(meshDesc: MeshDescriptor): THREE.Mesh {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(meshDesc.positions, 3));
  geometry.setIndex(new THREE.BufferAttribute(meshDesc.indices, 1));
  if (meshDesc.uvs) {
    geometry.setAttribute('uv', new THREE.BufferAttribute(meshDesc.uvs, 2));
  }
  if (meshDesc.colors && meshDesc.colors.length > 0) {
    geometry.setAttribute('color', new THREE.BufferAttribute(meshDesc.colors, 3));
  }
  geometry.computeVertexNormals();

  if (meshDesc.groups && meshDesc.groups.length > 0) {
    geometry.clearGroups();
    for (const g of meshDesc.groups) {
      geometry.addGroup(g.start, g.count, g.materialIndex);
    }
  }

  const materialArray = meshDesc.materials && meshDesc.materials.length > 0
    ? meshDesc.materials.map((m) => buildMaterialFromDescriptor(m))
    : [buildMaterialFromDescriptor(meshDesc.material)];
  const material = materialArray.length === 1 ? materialArray[0] : materialArray;

  return new THREE.Mesh(geometry, material);
}

/**
 * Creates a THREE.Group from a GeometryDescriptor and pose.
 * One mesh per descriptor.meshes[]; pose applied to the group.
 */
export function create(
  descriptor: GeometryDescriptor,
  pose: Pose
): THREE.Group {
  const group = new THREE.Group();
  group.name = 'Geometry';

  for (let i = 0; i < descriptor.meshes.length; i++) {
    const mesh = buildMeshFromDescriptor(descriptor.meshes[i]);
    mesh.name = `Mesh${i}`;
    group.add(mesh);
  }

  group.position.set(pose.position.x, pose.position.y, pose.position.z);
  group.rotation.y = pose.rotation.yaw;

  return group;
}

function setOpacity(mat: THREE.Material, value: number): void {
  mat.opacity = value;
  mat.transparent = value < 1;
  if ('needsUpdate' in mat) (mat as THREE.Material & { needsUpdate?: boolean }).needsUpdate = true;
}

function parseHex(str: string): number {
  if (str.startsWith('#')) str = str.slice(1);
  return parseInt(str, 16);
}

function applyEmissive(mat: THREE.Material, hex: number, intensity: number): void {
  const m = mat as THREE.MeshStandardMaterial;
  if (m.emissive != null) {
    m.emissive.setHex(hex);
    m.emissiveIntensity = intensity;
    if ('needsUpdate' in m) (m as THREE.Material & { needsUpdate?: boolean }).needsUpdate = true;
  }
}

/**
 * Apply style update to a group (opacity, visibleHeight/clip plane, highlightColor, outlineColor, outlineWidth).
 */
export function updateInstance(meshOrGroup: THREE.Object3D, styleUpdate: StyleUpdate): void {
  const group = meshOrGroup as THREE.Group;
  if (!group.userData) group.userData = {};
  (group.userData as Record<string, unknown>).lastStyleUpdate = styleUpdate;

  for (const sv of styleUpdate.styleValues) {
    if (sv.property === 'opacity') {
      const value = typeof sv.value === 'number' ? sv.value : parseFloat(String(sv.value));
      group.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh && (obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material as THREE.Material;
          if (Array.isArray(mat)) mat.forEach((m) => setOpacity(m, value));
          else setOpacity(mat, value);
        }
      });
    }
    if (sv.property === 'visibleHeight') {
      const value = typeof sv.value === 'number' ? sv.value : parseFloat(String(sv.value));
      (group.userData as Record<string, unknown>).visibleHeight = value;
      const plane =
        value > 0 ? new THREE.Plane(new THREE.Vector3(0, -1, 0), -value) : null;
      group.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh && (obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material as THREE.Material;
          const materials = Array.isArray(mat) ? mat : [mat];
          materials.forEach((m) => {
            if ('clippingPlanes' in m) {
              (m as THREE.Material & { clippingPlanes?: THREE.Plane[] }).clippingPlanes = plane ? [plane] : [];
              (m as THREE.Material & { clipIntersection?: boolean }).clipIntersection = false;
              if ('needsUpdate' in m) (m as THREE.Material & { needsUpdate?: boolean }).needsUpdate = true;
            }
          });
        }
      });
    }
    if (sv.property === 'highlightColor') {
      (group.userData as Record<string, unknown>).highlightColor = sv.value;
      const hex = typeof sv.value === 'number' ? sv.value : parseHex(String(sv.value));
      group.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh && (obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material as THREE.Material;
          const materials = Array.isArray(mat) ? mat : [mat];
          materials.forEach((m) => applyEmissive(m, hex, 0.25));
        }
      });
    }
    if (sv.property === 'outlineColor') {
      (group.userData as Record<string, unknown>).outlineColor = sv.value;
    }
    if (sv.property === 'outlineWidth') {
      (group.userData as Record<string, unknown>).outlineWidth = sv.value;
    }
  }
}

function disposeMaterial(m: THREE.Material): void {
  m.dispose();
  const mapKeys = ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap'] as const;
  const mat = m as unknown as Record<string, THREE.Texture | undefined>;
  for (const key of mapKeys) {
    const tex = mat[key];
    if (tex) tex.dispose();
  }
}

/**
 * Release geometry, materials, and textures used by the group.
 */
export function dispose(instance: THREE.Object3D): void {
  instance.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) {
        const mat = mesh.material;
        if (Array.isArray(mat)) mat.forEach(disposeMaterial);
        else disposeMaterial(mat);
      }
    }
  });
}
