/**
 * CLAHEProcessor - Applies CLAHE using OpenCV.js
 * Handles memory management carefully to avoid leaks
 */
export class CLAHEProcessor {
  private cv: any = null;
  private cvReady = false;
  private loadingInProgress = false;
  private clahe: any = null;
  private onReadyCallbacks: Array<() => void> = [];

  // CLAHE parameters
  private clipLimit = 2.0;
  private tileGridSize = 8;

  // Processing state
  private enabled = false;

  // Output canvas for processed result
  private outputCanvas: HTMLCanvasElement;
  private outputCtx: CanvasRenderingContext2D;

  constructor() {
    this.outputCanvas = document.createElement('canvas');
    this.outputCtx = this.outputCanvas.getContext('2d')!;
    // OpenCV loads lazily when first enabled
  }

  /**
   * Loads OpenCV.js asynchronously in background
   */
  loadOpenCV(): void {
    if (this.cvReady || this.loadingInProgress) return;

    this.loadingInProgress = true;
    console.log('OpenCV.js: Starting background load...');

    // Use dynamic import with setTimeout to not block initial render
    setTimeout(async () => {
      try {
        const cvModule = await import('@techstark/opencv-js');
        this.cv = cvModule.default || cvModule;

        // Poll for OpenCV readiness without blocking
        const checkReady = () => {
          if (this.cv && this.cv.Mat) {
            this.cvReady = true;
            this.loadingInProgress = false;
            this.createCLAHE();
            console.log('OpenCV.js: Ready for CLAHE processing');

            // Notify waiting callbacks
            this.onReadyCallbacks.forEach(cb => cb());
            this.onReadyCallbacks = [];
          } else {
            setTimeout(checkReady, 100);
          }
        };
        checkReady();
      } catch (error) {
        console.error('Failed to load OpenCV.js:', error);
        this.loadingInProgress = false;
      }
    }, 100);
  }

  /**
   * Register a callback for when OpenCV is ready
   */
  onReady(callback: () => void): void {
    if (this.cvReady) {
      callback();
    } else {
      this.onReadyCallbacks.push(callback);
    }
  }

  /**
   * Creates/recreates the CLAHE object with current parameters
   */
  private createCLAHE(): void {
    if (!this.cvReady) return;

    // Delete old CLAHE object if exists
    if (this.clahe) {
      this.clahe.delete();
      this.clahe = null;
    }

    this.clahe = new this.cv.CLAHE(
      this.clipLimit,
      new this.cv.Size(this.tileGridSize, this.tileGridSize)
    );
  }

  /**
   * Applies CLAHE to the source canvas
   * Returns the processed canvas
   */
  process(sourceCanvas: HTMLCanvasElement): HTMLCanvasElement | null {
    if (!this.cvReady || !this.enabled || !this.clahe) {
      return null;
    }

    const cv = this.cv;

    // Resize output canvas to match source
    if (this.outputCanvas.width !== sourceCanvas.width ||
        this.outputCanvas.height !== sourceCanvas.height) {
      this.outputCanvas.width = sourceCanvas.width;
      this.outputCanvas.height = sourceCanvas.height;
    }

    // OpenCV Mat objects - track for cleanup
    let src: any = null;
    let lab: any = null;
    let labChannels: any = null;
    let lChannel: any = null;
    let claheL: any = null;
    let resultLab: any = null;
    let result: any = null;

    try {
      // Draw source to output canvas first to get ImageData
      this.outputCtx.drawImage(sourceCanvas, 0, 0);
      const imageData = this.outputCtx.getImageData(
        0, 0,
        sourceCanvas.width,
        sourceCanvas.height
      );

      // Create Mat from image data
      src = cv.matFromImageData(imageData);

      // Convert to LAB color space (CLAHE works on L channel)
      lab = new cv.Mat();
      cv.cvtColor(src, lab, cv.COLOR_RGBA2RGB);

      const labTemp = new cv.Mat();
      cv.cvtColor(lab, labTemp, cv.COLOR_RGB2Lab);
      lab.delete();
      lab = labTemp;

      // Split LAB channels
      labChannels = new cv.MatVector();
      cv.split(lab, labChannels);

      // Get L channel
      lChannel = labChannels.get(0);

      // Apply CLAHE to L channel
      claheL = new cv.Mat();
      this.clahe.apply(lChannel, claheL);

      // Replace L channel with CLAHE result
      labChannels.set(0, claheL);

      // Merge channels back
      resultLab = new cv.Mat();
      cv.merge(labChannels, resultLab);

      // Convert back to RGB
      result = new cv.Mat();
      cv.cvtColor(resultLab, result, cv.COLOR_Lab2RGB);

      // Convert to RGBA for canvas
      const rgbaResult = new cv.Mat();
      cv.cvtColor(result, rgbaResult, cv.COLOR_RGB2RGBA);
      result.delete();
      result = rgbaResult;

      // Put result back to canvas
      const outputData = new ImageData(
        new Uint8ClampedArray(result.data),
        result.cols,
        result.rows
      );
      this.outputCtx.putImageData(outputData, 0, 0);

      return this.outputCanvas;

    } catch (error) {
      console.error('CLAHE processing failed:', error);
      return null;

    } finally {
      // CRITICAL: Clean up all Mat objects to prevent memory leaks
      if (src) src.delete();
      if (lab) lab.delete();
      if (labChannels) {
        // Delete individual channels before the vector
        for (let i = 0; i < labChannels.size(); i++) {
          const ch = labChannels.get(i);
          if (ch && ch !== lChannel && ch !== claheL) {
            ch.delete();
          }
        }
        labChannels.delete();
      }
      if (lChannel) lChannel.delete();
      if (claheL) claheL.delete();
      if (resultLab) resultLab.delete();
      if (result) result.delete();
    }
  }

  /**
   * Sets CLAHE enabled state
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    // Start loading OpenCV when first enabled
    if (enabled && !this.cvReady && !this.loadingInProgress) {
      this.loadOpenCV();
    }
  }

  /**
   * Returns loading state
   */
  isLoading(): boolean {
    return this.loadingInProgress;
  }

  /**
   * Gets enabled state
   */
  isEnabled(): boolean {
    return this.enabled && this.cvReady;
  }

  /**
   * Sets the clip limit (contrast limit)
   * @param value - Clip limit (1.0 - 10.0, default 2.0)
   */
  setClipLimit(value: number): void {
    this.clipLimit = value;
    if (this.cvReady) {
      this.createCLAHE();
    }
  }

  /**
   * Gets the current clip limit
   */
  getClipLimit(): number {
    return this.clipLimit;
  }

  /**
   * Sets the tile grid size
   * @param size - Grid size (default 8)
   */
  setTileGridSize(size: number): void {
    this.tileGridSize = size;
    if (this.cvReady) {
      this.createCLAHE();
    }
  }

  /**
   * Gets the current tile grid size
   */
  getTileGridSize(): number {
    return this.tileGridSize;
  }

  /**
   * Checks if OpenCV is ready
   */
  isReady(): boolean {
    return this.cvReady;
  }

  /**
   * Cleans up resources
   */
  dispose(): void {
    if (this.clahe) {
      this.clahe.delete();
      this.clahe = null;
    }
    this.cv = null;
    this.cvReady = false;
  }
}
