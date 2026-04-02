/**
 * Apply stochastic parameter deltas to BuildMasonryWallParams (domain helper).
 * Used by SolidWall facade; pure function over params + stochastic defs.
 */

import type { BuildMasonryWallParams, StochasticParamDef } from '../types';

function sampleNormal(mean: number, stdDev: number): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + stdDev * z;
}

function sampleUniform(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * Sample stochastic params once and add deltas to buildParams.wall dimensions.
 */
export function applyStochasticToBuildParams(
  buildParams: BuildMasonryWallParams,
  params: StochasticParamDef[]
): void {
  const wall = buildParams.wall;
  const byName: Record<string, number> = {};
  for (const p of params) {
    if (p.distribution === 'normal') {
      byName[p.name] = sampleNormal(p.mean, p.stdDev);
    } else if (p.distribution === 'uniform') {
      const half = (p.stdDev * 2) / 2;
      byName[p.name] = sampleUniform(p.mean - half, p.mean + half);
    }
  }
  if (byName['thickness_tolerance'] != null) wall.size.l += byName['thickness_tolerance'];
  if (byName['height_tolerance'] != null) wall.size.h += byName['height_tolerance'];
  if (byName['mortar_joint_thickness'] != null) wall.cementThickness += byName['mortar_joint_thickness'];
  if (byName['alignment_deviation'] != null) {
    wall.placement.position.x += byName['alignment_deviation'];
    wall.placement.position.z += byName['alignment_deviation'] * 0.5;
  }
  if (wall.blockSize && byName['height_tolerance'] != null) {
    wall.blockSize.h += byName['height_tolerance'] * 0.1;
  }
}
