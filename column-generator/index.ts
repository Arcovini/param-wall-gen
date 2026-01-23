/**
 * column-generator - Public API
 *
 * This module provides functions for generating parametric 3D columns.
 */

// Main entry point
export { buildColumn } from './buildColumn';

// Type exports
export type {
  Position,
  Direction,
  Placement,
  Size,
  ColumnMaterialConfig,
  ColumnParams,
  BuildColumnParams
} from './types';
