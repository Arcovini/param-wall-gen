/**
 * buildColumn - Domain build entry point for column generation.
 * Produces domain geometry payload and pose without engine dependencies.
 */

import type { BuildColumnParams, ColumnDomainBuildResult } from './types';
import { buildColumnGeometry } from './ColumnGeometryBuilder';

/**
 * Build column domain output from BuildColumnParams.
 * Rendering adapters consume this payload to create scene objects.
 */
export function buildColumn(params: BuildColumnParams): ColumnDomainBuildResult {
  const geometry = buildColumnGeometry(params);
  const { placement } = params.column;
  return {
    geometry,
    pose: {
      position: placement.position,
      rotation: { yaw: placement.direction.yaw }
    },
    userData: {
      objectType: 'Column',
      column: params.column,
      task: params.task ?? { completion: 1 }
    }
  };
}
