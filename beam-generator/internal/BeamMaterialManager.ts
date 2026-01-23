/**
 * BeamMaterialManager - Material creation for beams
 *
 * Handles texture loading (with caching) and color variation (Gaussian sigma).
 */

import * as THREE from 'three';
import { SRGBColorSpace } from 'three';
import type { BeamMaterialConfig } from '../types';

const TEXTURE_FOLDER = '/beam-generator/textures/';
const DEFAULT_COLOR = 0xC0C0B8;
const DEFAULT_ROUGHNESS = 0.9;
const DEFAULT_METALNESS = 0.1;

const textureCache = new Map<string, THREE.Texture>();
const textureLoader = new THREE.TextureLoader();

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

function loadTexture(filename: string, repeatX: number, repeatY: number): THREE.Texture {
  const path = TEXTURE_FOLDER + filename;
  const cacheKey = `${path}|${repeatX}|${repeatY}`;

  if (!textureCache.has(cacheKey)) {
    const texture = textureLoader.load(path);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.repeat.set(repeatX, repeatY);
    textureCache.set(cacheKey, texture);
  }

  return textureCache.get(cacheKey)!;
}

export function createBeamMaterial(config: BeamMaterialConfig = {}): THREE.MeshStandardMaterial {
  const baseColor = new THREE.Color(config.color ?? DEFAULT_COLOR);
  const finalColor = config.colorSigma
    ? generateVariedColor(baseColor, config.colorSigma)
    : baseColor;

  const material = new THREE.MeshStandardMaterial({
    color: finalColor,
    roughness: config.roughness ?? DEFAULT_ROUGHNESS,
    metalness: config.metalness ?? DEFAULT_METALNESS,
    flatShading: true,
  });

  if (config.texture) {
    const repeatX = config.textureRepeatX ?? 1;
    const repeatY = config.textureRepeatY ?? 1;
    material.map = loadTexture(config.texture, repeatX, repeatY);
  }

  return material;
}
