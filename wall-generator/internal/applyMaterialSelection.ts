/**
 * Apply material family (main + finish) to MaterialManager before build.
 * Used by SolidWall facade; delegates to MaterialManager singleton.
 */

import type { MaterialId } from '../types';
import { MaterialManager } from './MaterialManager';

/**
 * Set MaterialManager colors from a main (and optional finish) preset.
 */
export function applyMaterialSelection(main: MaterialId, _finish?: MaterialId): void {
  const mm = MaterialManager.getInstance();
  switch (main) {
    case 'brick-ceramic':
      mm.setBrickColor(0xE7A976);
      mm.setDarkBrickColor(0xC87C4A);
      mm.setCementColor(0x6C6C6B);
      mm.setLintelColor(0xE5E5E5);
      mm.setInfillColor(0xB0B0A8);
      break;
    case 'brick-concrete':
      mm.setBrickColor(0xCFCFCF);
      mm.setDarkBrickColor(0x9D9D9D);
      mm.setCementColor(0x6F6F6F);
      mm.setLintelColor(0x808080);
      mm.setInfillColor(0x757575);
      break;
    default:
      mm.setBrickColor(0xE7A976);
      mm.setDarkBrickColor(0xC87C4A);
      mm.setCementColor(0x6C6C6B);
      mm.setLintelColor(0xE5E5E5);
      mm.setInfillColor(0xB0B0A8);
  }
}
