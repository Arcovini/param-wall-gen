/**
 * PerformanceStats - Performance monitoring panel for Three.js
 *
 * Displays FPS, frame time, draw calls, triangles, and memory usage.
 */

import * as THREE from 'three';

export class PerformanceStats {
  private container: HTMLDivElement;
  private fpsElement: HTMLSpanElement;
  private frameTimeElement: HTMLSpanElement;
  private drawCallsElement: HTMLSpanElement;
  private trianglesElement: HTMLSpanElement;
  private geometriesElement: HTMLSpanElement;
  private texturesElement: HTMLSpanElement;
  private programsElement: HTMLSpanElement;

  // FPS calculation
  private frames: number = 0;
  private lastTime: number = performance.now();
  private fps: number = 0;
  private frameTime: number = 0;
  private lastFrameTime: number = performance.now();

  // Renderer reference
  private renderer: THREE.WebGLRenderer | null = null;

  constructor() {
    this.container = this.createPanel();
    this.fpsElement = this.container.querySelector('#stats-fps')!;
    this.frameTimeElement = this.container.querySelector('#stats-frametime')!;
    this.drawCallsElement = this.container.querySelector('#stats-drawcalls')!;
    this.trianglesElement = this.container.querySelector('#stats-triangles')!;
    this.geometriesElement = this.container.querySelector('#stats-geometries')!;
    this.texturesElement = this.container.querySelector('#stats-textures')!;
    this.programsElement = this.container.querySelector('#stats-programs')!;

    document.body.appendChild(this.container);
  }

  private createPanel(): HTMLDivElement {
    const panel = document.createElement('div');
    panel.id = 'performance-stats';
    panel.innerHTML = `
      <div class="stats-title">Performance</div>
      <div class="stats-row">
        <span class="stats-label">FPS:</span>
        <span id="stats-fps" class="stats-value">0</span>
      </div>
      <div class="stats-row">
        <span class="stats-label">Frame:</span>
        <span id="stats-frametime" class="stats-value">0.00 ms</span>
      </div>
      <div class="stats-row">
        <span class="stats-label">Draw Calls:</span>
        <span id="stats-drawcalls" class="stats-value">0</span>
      </div>
      <div class="stats-row">
        <span class="stats-label">Triangles:</span>
        <span id="stats-triangles" class="stats-value">0</span>
      </div>
      <div class="stats-row">
        <span class="stats-label">Geometries:</span>
        <span id="stats-geometries" class="stats-value">0</span>
      </div>
      <div class="stats-row">
        <span class="stats-label">Textures:</span>
        <span id="stats-textures" class="stats-value">0</span>
      </div>
      <div class="stats-row">
        <span class="stats-label">Programs:</span>
        <span id="stats-programs" class="stats-value">0</span>
      </div>
    `;

    // Apply styles
    panel.style.cssText = `
      position: fixed;
      bottom: 10px;
      left: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: #0f0;
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 11px;
      padding: 8px 12px;
      border-radius: 4px;
      z-index: 10000;
      min-width: 140px;
      user-select: none;
    `;

    // Style internal elements
    const style = document.createElement('style');
    style.textContent = `
      #performance-stats .stats-title {
        font-weight: bold;
        color: #fff;
        margin-bottom: 6px;
        padding-bottom: 4px;
        border-bottom: 1px solid #444;
      }
      #performance-stats .stats-row {
        display: flex;
        justify-content: space-between;
        margin: 2px 0;
      }
      #performance-stats .stats-label {
        color: #aaa;
      }
      #performance-stats .stats-value {
        color: #0f0;
        font-weight: bold;
        min-width: 60px;
        text-align: right;
      }
      #performance-stats .stats-value.warning {
        color: #ff0;
      }
      #performance-stats .stats-value.critical {
        color: #f00;
      }
    `;
    document.head.appendChild(style);

    return panel;
  }

  /**
   * Set the renderer to monitor
   */
  setRenderer(renderer: THREE.WebGLRenderer): void {
    this.renderer = renderer;
  }

  /**
   * Call this at the beginning of each frame
   */
  begin(): void {
    this.lastFrameTime = performance.now();
  }

  /**
   * Call this at the end of each frame to update stats
   */
  end(): void {
    const now = performance.now();

    // Calculate frame time
    this.frameTime = now - this.lastFrameTime;

    // Calculate FPS (update every second)
    this.frames++;
    if (now - this.lastTime >= 1000) {
      this.fps = Math.round((this.frames * 1000) / (now - this.lastTime));
      this.frames = 0;
      this.lastTime = now;
    }

    this.updateDisplay();
  }

  /**
   * Update just the FPS (simpler, call every frame)
   */
  update(): void {
    const now = performance.now();

    // Calculate frame time from last update
    this.frameTime = now - this.lastFrameTime;
    this.lastFrameTime = now;

    // Calculate FPS
    this.frames++;
    if (now - this.lastTime >= 1000) {
      this.fps = Math.round((this.frames * 1000) / (now - this.lastTime));
      this.frames = 0;
      this.lastTime = now;
      this.updateDisplay(); // Only update DOM once per second
    }
  }

  private updateDisplay(): void {
    // FPS with color coding
    this.fpsElement.textContent = String(this.fps);
    this.fpsElement.className = 'stats-value';
    if (this.fps < 30) {
      this.fpsElement.classList.add('critical');
    } else if (this.fps < 55) {
      this.fpsElement.classList.add('warning');
    }

    // Frame time
    this.frameTimeElement.textContent = `${this.frameTime.toFixed(2)} ms`;
    this.frameTimeElement.className = 'stats-value';
    if (this.frameTime > 33) {
      this.frameTimeElement.classList.add('critical');
    } else if (this.frameTime > 16) {
      this.frameTimeElement.classList.add('warning');
    }

    // Renderer info
    if (this.renderer) {
      const info = this.renderer.info;

      this.drawCallsElement.textContent = String(info.render.calls);
      this.trianglesElement.textContent = this.formatNumber(info.render.triangles);
      this.geometriesElement.textContent = String(info.memory.geometries);
      this.texturesElement.textContent = String(info.memory.textures);
      this.programsElement.textContent = String(info.programs?.length || 0);
    }
  }

  private formatNumber(n: number): string {
    if (n >= 1000000) {
      return (n / 1000000).toFixed(1) + 'M';
    } else if (n >= 1000) {
      return (n / 1000).toFixed(1) + 'K';
    }
    return String(n);
  }

  /**
   * Show/hide the stats panel
   */
  setVisible(visible: boolean): void {
    this.container.style.display = visible ? 'block' : 'none';
  }

  /**
   * Dispose of the stats panel
   */
  dispose(): void {
    this.container.remove();
  }
}
