/**
 * IFC → BuildMasonryWallParams mapping (domain helper).
 * Used by SolidWall facade; no dependency on THREE or render pipeline.
 */

import type { BuildMasonryWallParams, WallParams, OpeningParams, Position, QuaternionLike } from '../types';

export interface IFCProjectElementShape {
  globalId?: string;
  ifcType?: string;
  predefinedType?: string;
  length?: number;
  height?: number;
  thickness?: number;
  openings?: Array<{ position?: Position; size?: { width?: number; height?: number; depth?: number } }>;
  position?: Position;
  rotation?: QuaternionLike;
}

export type QuaternionToYaw = (q: QuaternionLike) => number;

/**
 * Map IFC element to BuildMasonryWallParams (default block/cement when not from IFC).
 */
export function ifcElementToBuildParams(
  ifc: IFCProjectElementShape,
  quaternionToYaw: QuaternionToYaw
): BuildMasonryWallParams | null {
  const length = ifc.length ?? 0;
  const height = ifc.height ?? 0;
  const thickness = ifc.thickness ?? 0;
  if (length <= 0 || height <= 0 || thickness <= 0) return null;
  const position = ifc.position ?? { x: 0, y: 0, z: 0 };
  const yaw = ifc.rotation != null ? quaternionToYaw(ifc.rotation) : 0;
  const openings: OpeningParams[] = (ifc.openings ?? []).map((o) => ({
    placement: {
      parent: null,
      position: o.position ?? { x: 0, y: 0, z: 0 },
      direction: { yaw: 0 }
    },
    size: {
      l: o.size?.width ?? 0,
      w: o.size?.depth ?? 0,
      h: o.size?.height ?? 0
    }
  }));
  const wall: WallParams = {
    placement: { parent: null, position, direction: { yaw } },
    size: { l: thickness, w: length, h: height },
    blockSize: { l: 0.39, h: 0.14, w: 0 },
    cementThickness: 0.02
  };
  return { wall, openings, task: { completion: 0 } };
}
