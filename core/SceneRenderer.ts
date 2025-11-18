import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * SceneRenderer - Pure rendering engine for Three.js applications
 * Handles ONLY rendering infrastructure: scene, camera, renderer, lights, controls
 * Domain logic (walls, blocks, etc.) should be managed externally
 */
export class SceneRenderer {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private animationId: number | null = null;
  private canvas: HTMLCanvasElement;

  // Lighting
  private ambientLight: THREE.AmbientLight;
  private directionalLight: THREE.DirectionalLight;

  constructor(container: HTMLElement) {
    // Check WebGL support
    if (!window.WebGLRenderingContext) {
      throw new Error('WebGL is not supported by your browser');
    }

    // Initialize scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf5f5f5);

    // Initialize camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      (window.innerWidth - 320) / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(0, 0, 0);

    // Initialize renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });

    // Configure renderer
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Set size with validation
    this.setSafeSize(window.innerWidth - 320, window.innerHeight);

    // Limit pixel ratio to prevent excessive buffer sizes on high-DPI displays
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Append canvas to container
    container.appendChild(this.renderer.domElement);

    // Store canvas reference
    this.canvas = this.renderer.domElement;

    // Add WebGL context lost/restore handlers
    this.canvas.addEventListener('webglcontextlost', this.handleContextLost.bind(this));
    this.canvas.addEventListener('webglcontextrestored', this.handleContextRestored.bind(this));

    // Initialize controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    // Initialize lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    this.directionalLight.position.set(5, 5, 5);
    this.scene.add(this.directionalLight);

    // Handle window resize
    window.addEventListener('resize', this.handleResize.bind(this));

    // Start animation loop
    this.animate();
  }

  /**
   * Sets renderer size with WebGL limits validation
   */
  private setSafeSize(width: number, height: number): void {
    // Get maximum texture size supported by the GPU
    const maxSize = this.renderer.capabilities.maxTextureSize;

    // Clamp dimensions to WebGL limits
    const safeWidth = Math.min(width, maxSize);
    const safeHeight = Math.min(height, maxSize);

    this.renderer.setSize(safeWidth, safeHeight);

    // Log warning if dimensions were clamped
    if (width > maxSize || height > maxSize) {
      console.warn(
        `Canvas size clamped from ${width}x${height} to ${safeWidth}x${safeHeight} (GPU limit: ${maxSize})`
      );
    }
  }

  /**
   * Handles WebGL context lost event
   */
  private handleContextLost = (event: Event): void => {
    event.preventDefault();
    console.error('WebGL context lost. Pausing rendering...');

    // Stop animation loop
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * Handles WebGL context restored event
   */
  private handleContextRestored = (): void => {
    console.log('WebGL context restored. Resuming rendering...');

    // Restart animation loop
    if (this.animationId === null) {
      this.animate();
    }
  }

  /**
   * Animation loop
   */
  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Handles window resize events
   */
  private handleResize = (): void => {
    const width = window.innerWidth - 320;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.setSafeSize(width, height);
  }

  /**
   * Gets the Three.js scene for external object management
   */
  getScene(): THREE.Scene {
    return this.scene;
  }

  /**
   * Gets the camera for advanced usage
   */
  getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  /**
   * Gets the renderer for advanced usage
   */
  getRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }

  /**
   * Cleans up resources
   */
  dispose(): void {
    // Stop animation
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }

    // Remove event listeners
    window.removeEventListener('resize', this.handleResize);
    this.canvas.removeEventListener('webglcontextlost', this.handleContextLost);
    this.canvas.removeEventListener('webglcontextrestored', this.handleContextRestored);

    // Dispose controls
    this.controls.dispose();

    // Dispose scene resources
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (object.material instanceof THREE.Material) {
          object.material.dispose();
        }
      }
    });

    // Dispose renderer
    this.renderer.dispose();
  }
}
