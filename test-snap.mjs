// Test the snapToRowBoundaries function
const wallHeight = 3.0;
const blockHeight = 0.14;
const cementThickness = 0.02;
const rowHeight = blockHeight + cementThickness; // 0.16
const wallBottomY = -wallHeight / 2; // -1.5

console.log("=== Row Structure ===");
console.log("wallHeight:", wallHeight);
console.log("blockHeight:", blockHeight);
console.log("cementThickness:", cementThickness);
console.log("rowHeight:", rowHeight);
console.log("wallBottomY:", wallBottomY);
console.log("");

// Compare two formulas:
// 1. My snap logic: blockBottom = wallBottomY + i * rowHeight
// 2. WallManager's rowY: rowY = -wallHeight/2 + i * rowHeight + blockHeight/2 (center)

console.log("=== Row Positions Comparison ===");
console.log("Formula 1 (snap logic): blockBottom = wallBottomY + i * rowHeight");
console.log("Formula 2 (WallManager): rowY = wallBottomY + i * rowHeight + blockHeight/2 (CENTER)");
console.log("");

for (let i = 0; i < 10; i++) {
  // Snap logic formula
  const snapBlockBottom = wallBottomY + i * rowHeight;
  const snapBlockTop = snapBlockBottom + blockHeight;

  // WallManager formula (rowY is CENTER, then geometry is centered)
  const rowY = wallBottomY + i * rowHeight + blockHeight / 2;
  const wallMgrBlockBottom = rowY - blockHeight / 2;
  const wallMgrBlockTop = rowY + blockHeight / 2;

  const match = Math.abs(snapBlockBottom - wallMgrBlockBottom) < 0.0001 &&
                Math.abs(snapBlockTop - wallMgrBlockTop) < 0.0001;

  console.log("Row " + i + ":");
  console.log("  Snap logic:   [" + snapBlockBottom.toFixed(3) + " to " + snapBlockTop.toFixed(3) + "]");
  console.log("  WallManager:  [" + wallMgrBlockBottom.toFixed(3) + " to " + wallMgrBlockTop.toFixed(3) + "]");
  console.log("  Match: " + match);
}
console.log("");

// Test snap function
function snapToRowBoundaries(openingCenterY, openingHeight) {
  const originalBottomY = openingCenterY - openingHeight / 2;
  const originalTopY = openingCenterY + openingHeight / 2;

  // Block bottoms are at: wallBottomY + i * rowHeight
  const bottomRowIndex = Math.floor((originalBottomY - wallBottomY) / rowHeight);
  const snappedBottomY = wallBottomY + bottomRowIndex * rowHeight;

  // Block tops are at: wallBottomY + i * rowHeight + blockHeight
  const topRowIndex = Math.ceil((originalTopY - wallBottomY - blockHeight) / rowHeight);
  let snappedTopY = wallBottomY + topRowIndex * rowHeight + blockHeight;

  if (snappedTopY <= snappedBottomY) {
    snappedTopY = snappedBottomY + blockHeight;
  }

  return {
    originalBottomY,
    originalTopY,
    snappedBottomY,
    snappedTopY,
    bottomRowIndex,
    topRowIndex,
    snappedHeight: snappedTopY - snappedBottomY
  };
}

// Test cases
const testCases = [
  { centerY: 0, height: 1.0, desc: "Center window" },
  { centerY: -0.45, height: 2.1, desc: "Door (bottom-aligned)" },
  { centerY: 0.85, height: 1.0, desc: "Top window" },
  { centerY: 0, height: 0.5, desc: "Small window" },
];

console.log("=== Test Cases ===");
for (const tc of testCases) {
  const result = snapToRowBoundaries(tc.centerY, tc.height);
  console.log("");
  console.log(tc.desc + ":");
  console.log("  Original: centerY=" + tc.centerY + ", height=" + tc.height);
  console.log("  Original bounds: [" + result.originalBottomY.toFixed(3) + " to " + result.originalTopY.toFixed(3) + "]");
  console.log("  Snapped bounds:  [" + result.snappedBottomY.toFixed(3) + " to " + result.snappedTopY.toFixed(3) + "]");
  console.log("  Snapped height:  " + result.snappedHeight.toFixed(3));
  console.log("  Row indices: bottom=" + result.bottomRowIndex + ", top=" + result.topRowIndex);

  // Check if snapped encompasses original
  const encompassesOriginal = result.snappedBottomY <= result.originalBottomY && result.snappedTopY >= result.originalTopY;
  console.log("  Encompasses original: " + encompassesOriginal);
}
