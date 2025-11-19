/**
 * RowGenerator - Handles row-by-row wall construction calculations
 *
 * Mathematical formulas:
 * - Row Height (Rh) = Block Height (Bh) + Cement Thickness (Bc)
 * - Number of Rows (NR) = Truncate(Wall Height (Wh) / Row Height (Rh))
 * - Completion Percentage per Row (Rp) = Row Height (Rh) / Wall Height (Wh)
 */

export interface RowSpecification {
  /** Row height (block height + cement thickness) */
  rowHeight: number;
  /** Total number of rows that fit in the wall */
  totalRows: number;
  /** Completion percentage represented by each row */
  completionPerRow: number;
  /** Actual wall height based on rows that fit */
  actualWallHeight: number;
}

export class RowGenerator {
  /**
   * Calculates row specifications based on wall and block parameters
   *
   * @param wallHeight - Desired wall height (Wh)
   * @param blockHeight - Block height (Bh)
   * @param cementThickness - Cement thickness (Bc)
   * @returns Row specifications
   */
  static calculateRowSpecs(
    wallHeight: number,
    blockHeight: number,
    cementThickness: number
  ): RowSpecification {
    // Rh = Bh + Bc
    const rowHeight = blockHeight + cementThickness;

    // NR = Truncate(Wh / Rh)
    const totalRows = Math.floor(wallHeight / rowHeight);

    // Rp = Rh / Wh
    const completionPerRow = rowHeight / wallHeight;

    // Actual height based on rows that fit
    // Don't include cement thickness after the last block
    const actualWallHeight = totalRows * blockHeight + (totalRows - 1) * cementThickness;

    return {
      rowHeight,
      totalRows,
      completionPerRow,
      actualWallHeight
    };
  }

  /**
   * Calculates how many rows should be visible based on completion percentage
   *
   * @param totalRows - Total number of rows in the wall
   * @param completion - Completion percentage (0.0 to 1.0)
   * @returns Number of rows to show (building from bottom to top)
   */
  static getVisibleRows(totalRows: number, completion: number): number {
    // Clamp completion between 0 and 1
    const clampedCompletion = Math.max(0, Math.min(1, completion));

    // Calculate rows to show (rounded down)
    // Rows are built from bottom (row 0) to top
    return Math.floor(totalRows * clampedCompletion);
  }

  /**
   * Calculates the actual height of the wall based on completion percentage
   *
   * @param specs - Row specifications
   * @param completion - Completion percentage (0.0 to 1.0)
   * @param blockHeight - Block height (Bh)
   * @param cementThickness - Cement thickness (Bc)
   * @returns Actual wall height for the given completion
   */
  static getCompletedHeight(
    specs: RowSpecification,
    completion: number,
    blockHeight: number,
    cementThickness: number
  ): number {
    const visibleRows = this.getVisibleRows(specs.totalRows, completion);

    if (visibleRows === 0) return 0;

    // Height includes all blocks + cement joints between them
    // Don't include cement after the last row
    return visibleRows * blockHeight + (visibleRows - 1) * cementThickness;
  }

  /**
   * Gets the completion percentage achieved by a specific row
   *
   * @param rowIndex - Row index (0-based, 0 = bottom row)
   * @param totalRows - Total number of rows
   * @returns Completion percentage after this row is built (0.0 to 1.0)
   */
  static getRowCompletionPercentage(rowIndex: number, totalRows: number): number {
    if (totalRows === 0) return 0;
    return (rowIndex + 1) / totalRows;
  }
}
