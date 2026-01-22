/**
 * shared - Public API for shared structural element code
 *
 * This module provides shared types, builders, and material management
 * for structural elements (columns, beams, slabs, etc.).
 */

// Types
export type {
  Position,
  Direction,
  Placement,
  Size,
  StructuralElementType,
  StructuralMaterialConfig,
  StructuralElementParams,
} from './types';

// Builder
export { StructuralElementBuilder } from './StructuralElementBuilder';

// Material management
export { StructuralMaterialManager } from './StructuralMaterialManager';

// Procedural textures
export {
  createProceduralConcreteMaterial,
  generateConcreteTextures,
  generateNoiseTexture,
  generateColorTexture,
  DEFAULT_TEXTURE_SIZE,
} from './ProceduralConcreteMaterial';
export type {
  ProceduralConcreteMaterialParams,
  GeneratedTextures,
} from './ProceduralConcreteMaterial';
