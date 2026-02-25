import { CLAHEProcessor } from './CLAHEProcessor';

/**
 * RenderStats - Displays before/after color histograms with CLAHE processing
 * Uses OpenCV.js for CLAHE (Contrast Limited Adaptive Histogram Equalization)
 */
export class RenderStats {
  private sourceCanvas: HTMLCanvasElement;
  private histogramCanvas: HTMLCanvasElement;
  private toggleButton: HTMLButtonElement;
  private ctx: CanvasRenderingContext2D;
  private enabled = false;
  private updateInterval = 150; // ms between updates
  private lastUpdate = 0;

  // CLAHE processor
  private claheProcessor: CLAHEProcessor;

  // Histogram dimensions (200x100 for side-by-side before/after)
  private histWidth = 200;
  private histHeight = 100;
  private singleHistWidth = 100;

  constructor(sourceCanvas: HTMLCanvasElement) {
    this.sourceCanvas = sourceCanvas;
    this.claheProcessor = new CLAHEProcessor();

    // Create toggle button
    this.toggleButton = document.createElement('button');
    this.toggleButton.id = 'render-stats-toggle';
    this.toggleButton.textContent = 'H';
    this.toggleButton.title = 'Toggle Histogram + CLAHE';

    const btnStyle = this.toggleButton.style;
    btnStyle.position = 'fixed';
    btnStyle.bottom = '20px';
    btnStyle.left = '20px';
    btnStyle.width = '32px';
    btnStyle.height = '32px';
    btnStyle.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    btnStyle.color = 'white';
    btnStyle.border = '1px solid rgba(255, 255, 255, 0.3)';
    btnStyle.borderRadius = '4px';
    btnStyle.cursor = 'pointer';
    btnStyle.zIndex = '1001';
    btnStyle.fontSize = '14px';
    btnStyle.fontWeight = 'bold';
    btnStyle.fontFamily = 'monospace';

    this.toggleButton.addEventListener('click', () => this.toggle());
    document.body.appendChild(this.toggleButton);

    // Create histogram overlay canvas (wider for before/after)
    this.histogramCanvas = document.createElement('canvas');
    this.histogramCanvas.id = 'render-stats-histogram';
    this.histogramCanvas.width = this.histWidth;
    this.histogramCanvas.height = this.histHeight;

    const style = this.histogramCanvas.style;
    style.position = 'fixed';
    style.bottom = '60px';
    style.left = '20px';
    style.width = `${this.histWidth}px`;
    style.height = `${this.histHeight}px`;
    style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    style.border = '1px solid rgba(255, 255, 255, 0.3)';
    style.borderRadius = '4px';
    style.zIndex = '1000';
    style.pointerEvents = 'none';
    style.boxSizing = 'border-box';
    style.display = 'none';

    this.ctx = this.histogramCanvas.getContext('2d')!;
    document.body.appendChild(this.histogramCanvas);
  }

  /**
   * Toggles the histogram visibility and CLAHE processing
   */
  toggle(): void {
    this.setEnabled(!this.enabled);
  }

  /**
   * Updates the histogram display
   */
  update(): void {
    if (!this.enabled) return;

    const now = performance.now();
    if (now - this.lastUpdate < this.updateInterval) return;
    this.lastUpdate = now;

    this.computeAndDrawHistograms();
  }

  /**
   * Computes histograms for before and after CLAHE
   */
  private computeAndDrawHistograms(): void {
    try {
      // Sample region for performance
      const sampleSize = 256;
      const offsetX = Math.floor((this.sourceCanvas.width - sampleSize) / 2);
      const offsetY = Math.floor((this.sourceCanvas.height - sampleSize) / 2);

      // Get "before" image data
      const beforeCanvas = document.createElement('canvas');
      beforeCanvas.width = sampleSize;
      beforeCanvas.height = sampleSize;
      const beforeCtx = beforeCanvas.getContext('2d')!;
      beforeCtx.drawImage(
        this.sourceCanvas,
        offsetX, offsetY, sampleSize, sampleSize,
        0, 0, sampleSize, sampleSize
      );
      const beforeData = beforeCtx.getImageData(0, 0, sampleSize, sampleSize);

      // Compute "before" histogram
      const beforeHist = this.computeHistogram(beforeData);

      // Get "after" (CLAHE processed) image data
      let afterHist: { r: Uint32Array; g: Uint32Array; b: Uint32Array; max: number };
      const processedCanvas = this.claheProcessor.process(beforeCanvas);

      if (processedCanvas) {
        const afterCtx = processedCanvas.getContext('2d')!;
        const afterData = afterCtx.getImageData(0, 0, sampleSize, sampleSize);
        afterHist = this.computeHistogram(afterData);
      } else {
        // If CLAHE not ready, show same histogram on both sides
        afterHist = beforeHist;
      }

      // Draw both histograms
      this.drawDualHistogram(beforeHist, afterHist);

    } catch (error) {
      console.warn('Histogram computation failed:', error);
    }
  }

  /**
   * Computes RGB histogram from image data
   */
  private computeHistogram(imageData: ImageData): {
    r: Uint32Array;
    g: Uint32Array;
    b: Uint32Array;
    max: number;
  } {
    const data = imageData.data;
    const histR = new Uint32Array(256);
    const histG = new Uint32Array(256);
    const histB = new Uint32Array(256);

    // Count pixel values
    for (let i = 0; i < data.length; i += 4) {
      histR[data[i]]++;
      histG[data[i + 1]]++;
      histB[data[i + 2]]++;
    }

    // Find max for normalization
    let maxVal = 1;
    for (let i = 0; i < 256; i++) {
      maxVal = Math.max(maxVal, histR[i], histG[i], histB[i]);
    }

    return { r: histR, g: histG, b: histB, max: maxVal };
  }

  /**
   * Draws before/after histograms side by side
   */
  private drawDualHistogram(
    before: { r: Uint32Array; g: Uint32Array; b: Uint32Array; max: number },
    after: { r: Uint32Array; g: Uint32Array; b: Uint32Array; max: number }
  ): void {
    const ctx = this.ctx;
    const w = this.histWidth;
    const h = this.histHeight;
    const halfW = this.singleHistWidth;

    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(0, 0, w, h);

    // Draw divider line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.moveTo(halfW, 0);
    ctx.lineTo(halfW, h);
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '9px monospace';
    ctx.fillText('BEFORE', 4, 10);
    ctx.fillText('AFTER', halfW + 4, 10);

    // Use same max for consistent comparison
    const maxVal = Math.max(before.max, after.max);

    // Draw "before" histogram (left side)
    this.drawSingleHistogram(before, maxVal, 0, halfW, h);

    // Draw "after" histogram (right side)
    this.drawSingleHistogram(after, maxVal, halfW, halfW, h);
  }

  /**
   * Draws a single histogram in the specified region
   */
  private drawSingleHistogram(
    hist: { r: Uint32Array; g: Uint32Array; b: Uint32Array },
    maxVal: number,
    offsetX: number,
    width: number,
    height: number
  ): void {
    const ctx = this.ctx;
    const scaleX = width / 256;
    const scaleY = (height - 15) / maxVal; // Leave space for label

    ctx.save();
    ctx.translate(offsetX, 0);

    // Use additive blending for channel overlap
    ctx.globalCompositeOperation = 'lighter';

    // Red channel
    ctx.fillStyle = 'rgba(255, 0, 0, 0.35)';
    this.drawChannelPath(hist.r, scaleX, scaleY, width, height);

    // Green channel
    ctx.fillStyle = 'rgba(0, 255, 0, 0.35)';
    this.drawChannelPath(hist.g, scaleX, scaleY, width, height);

    // Blue channel
    ctx.fillStyle = 'rgba(0, 0, 255, 0.35)';
    this.drawChannelPath(hist.b, scaleX, scaleY, width, height);

    ctx.restore();
  }

  /**
   * Draws a single channel histogram path
   */
  private drawChannelPath(
    hist: Uint32Array,
    scaleX: number,
    scaleY: number,
    width: number,
    height: number
  ): void {
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.moveTo(0, height);

    for (let i = 0; i < 256; i++) {
      const x = i * scaleX;
      const y = height - hist[i] * scaleY;
      ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();
  }

  /**
   * Sets whether the histogram/CLAHE is enabled
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    this.histogramCanvas.style.display = enabled ? 'block' : 'none';
    this.toggleButton.style.backgroundColor = enabled
      ? 'rgba(0, 100, 200, 0.8)'
      : 'rgba(0, 0, 0, 0.7)';

    // Update button text based on loading state
    if (enabled && this.claheProcessor.isLoading()) {
      this.toggleButton.textContent = '...';
      this.claheProcessor.onReady(() => {
        this.toggleButton.textContent = 'H';
      });
    } else {
      this.toggleButton.textContent = 'H';
    }

    // Enable CLAHE processor
    if (enabled) {
      this.claheProcessor.setEnabled(true);
    }
  }

  /**
   * Gets whether the histogram is enabled
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Gets the CLAHE processor for parameter adjustment
   */
  getCLAHEProcessor(): CLAHEProcessor {
    return this.claheProcessor;
  }

  /**
   * Sets the update interval in milliseconds
   */
  setUpdateInterval(ms: number): void {
    this.updateInterval = ms;
  }

  /**
   * Cleans up resources
   */
  dispose(): void {
    this.claheProcessor.dispose();

    if (this.histogramCanvas.parentNode) {
      this.histogramCanvas.parentNode.removeChild(this.histogramCanvas);
    }
    if (this.toggleButton.parentNode) {
      this.toggleButton.parentNode.removeChild(this.toggleButton);
    }
  }
}
