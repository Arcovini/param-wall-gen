import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer, RenderPass, EffectPass, BloomEffect, ToneMappingEffect, ToneMappingMode, BrightnessContrastEffect } from 'postprocessing';

// Type declarations for the external 'n8ao' package are provided in a separate ambient declaration file (types/n8ao.d.ts).

import { N8AOPostPass } from 'n8ao';

/**
 * SceneRenderer - Pure rendering engine for Three.js applications
 * Handles ONLY rendering infrastructure: scene, camera, renderer, lights, controls
 * Domain logic (walls, blocks, etc.) should be managed externally
 */
export class SceneRenderer {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private composer!: EffectComposer;
  private controls!: OrbitControls;
  private animationId: number | null = null;
  private canvas!: HTMLCanvasElement;
  private brightnessContrastEffect!: BrightnessContrastEffect;
  private toneMappingEffect!: ToneMappingEffect;
  private n8aoPass!: N8AOPostPass;

  constructor(container: HTMLElement) {
    // Check WebGL support (fail-fast)
    if (!window.WebGLRenderingContext) {
      throw new Error('WebGL is not supported by your browser');
    }

    // Initialize scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    // Initialize camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      (window.innerWidth - 320) / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(15, 15, 15);
    this.camera.lookAt(0, 0, 0);

    // Delegated initialization
    this.initializeRenderer(container);
    this.initializeControls();
    this.initializeLighting();
    this.generateEnvironment();
    this.initializePostProcessing();
    this.registerEventHandlers();
  }

  /**
   * Initializes WebGL renderer with configuration
   */
  private initializeRenderer(container: HTMLElement): void {
    this.renderer = new THREE.WebGLRenderer({
      antialias: false, // Disabled for post-processing
      alpha: false,
      powerPreference: "high-performance",
      stencil: false,
      depth: false
    });

    // Color space (tone mapping handled by ToneMappingEffect in post-processing)
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Shadow configuration
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Size and pixel ratio
    this.setSafeSize(window.innerWidth - 320, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // DOM integration
    container.appendChild(this.renderer.domElement);
    this.canvas = this.renderer.domElement;

    // Context loss handlers
    this.canvas.addEventListener('webglcontextlost', this.handleContextLost.bind(this));
    this.canvas.addEventListener('webglcontextrestored', this.handleContextRestored.bind(this));
  }

  /**
   * Initializes OrbitControls for camera interaction
   */
  private initializeControls(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  /**
   * Initializes scene lighting
   */
  private initializeLighting(): void {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(-5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.bias = -0.0001;
    directionalLight.shadow.radius = 4;
    this.scene.add(directionalLight);
  }

  /**
   * Initializes post-processing pipeline (EffectComposer, SSAO, Bloom)
   */
  private initializePostProcessing(): void {
    this.composer = new EffectComposer(this.renderer);

    // Render pass
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // N8AO pass (Screen-Space Ambient Occlusion)
    this.n8aoPass = new N8AOPostPass(
      this.scene,
      this.camera,
      window.innerWidth - 320,
      window.innerHeight
    );
    this.n8aoPass.configuration.aoRadius = 20.0;
    this.n8aoPass.configuration.intensity = 16.0;
    this.n8aoPass.enabled = true; // Start enabled
    this.composer.addPass(this.n8aoPass);

    // Bloom effect
    const bloomEffect = new BloomEffect({
      luminanceThreshold: 1.0,
      intensity: 1.0,
      mipmapBlur: true,
      levels: 7
    });

    // Tone mapping effect (replaces renderer.toneMapping for EffectComposer)
    this.toneMappingEffect = new ToneMappingEffect({
      mode: ToneMappingMode.ACES_FILMIC,
    });

    // Brightness/Contrast effect for exposure control
    this.brightnessContrastEffect = new BrightnessContrastEffect({
      brightness: 0,  // Range: -1 to 1, 0 = no change
      contrast: 0,    // Range: -1 to 1, 0 = no change
    });

    // Combine effects in a single pass for efficiency
    const effectPass = new EffectPass(this.camera, bloomEffect, this.brightnessContrastEffect, this.toneMappingEffect);
    this.composer.addPass(effectPass);
  }

  /**
   * Sets the exposure value (simulated via brightness)
   * @param value - Exposure value. 0 = default, positive = brighter, negative = darker. Range: -1 to 1
   */
  setExposure(value: number): void {
    this.brightnessContrastEffect.brightness = value;
  }

  /**
   * Gets the current exposure value
   */
  getExposure(): number {
    return this.brightnessContrastEffect.brightness;
  }

  /**
   * Sets the contrast value
   * @param value - Contrast value. 0 = default, positive = more contrast, negative = less. Range: -1 to 1
   */
  setContrast(value: number): void {
    this.brightnessContrastEffect.contrast = value;
  }

  /**
   * Gets the current contrast value
   */
  getContrast(): number {
    return this.brightnessContrastEffect.contrast;
  }

  /**
   * Sets the ambient occlusion enabled state
   * @param enabled - Whether ambient occlusion should be enabled
   */
  setAmbientOcclusionEnabled(enabled: boolean): void {
    this.n8aoPass.enabled = enabled;
  }

  /**
   * Gets whether ambient occlusion is currently enabled
   */
  isAmbientOcclusionEnabled(): boolean {
    return this.n8aoPass.enabled;
  }

  /**
   * Sets the tone mapping mode
   * @param mode - The tone mapping mode to use
   */
  setToneMappingMode(mode: ToneMappingMode): void {
    this.toneMappingEffect.mode = mode;
  }

  /**
   * Gets the current tone mapping mode
   */
  getToneMappingMode(): ToneMappingMode {
    return this.toneMappingEffect.mode;
  }

  /**
   * Sets the white point for Reinhard 2 Adaptive tone mapping
   * @param value - White point value. Range: 1 to 10, default 4.0
   */
  setWhitePoint(value: number): void {
    // Cast to any because TypeScript definitions are missing setters
    (this.toneMappingEffect as any).whitePoint = value;
  }

  /**
   * Sets the middle grey for Reinhard 2 Adaptive tone mapping
   * @param value - Middle grey value. Range: 0.01 to 0.5, default 0.18
   */
  setMiddleGrey(value: number): void {
    (this.toneMappingEffect as any).middleGrey = value;
  }

  /**
   * Sets the average luminance for Reinhard 2 Adaptive tone mapping
   * @param value - Average luminance value. Range: 0.1 to 5, default 1.0
   */
  setAverageLuminance(value: number): void {
    (this.toneMappingEffect as any).averageLuminance = value;
  }

  /**
   * Sets the adaptation rate for Reinhard 2 Adaptive tone mapping
   * @param value - Adaptation rate value. Higher = faster adaptation. Range: 0.01 to 20
   */
  setAdaptationRate(value: number): void {
    // Set on both the effect and directly on the material to ensure it takes effect
    (this.toneMappingEffect as any).adaptationRate = value;
    const adaptiveMaterial = (this.toneMappingEffect as any).adaptiveLuminanceMaterial;
    if (adaptiveMaterial) {
      adaptiveMaterial.adaptationRate = value;
    }
  }

  /**
   * Sets the minimum luminance for Reinhard 2 Adaptive tone mapping
   * Prevents very high exposure in dark scenes
   * @param value - Min luminance value. Range: 0.001 to 0.1, default 0.01
   */
  setMinLuminance(value: number): void {
    const adaptiveMaterial = (this.toneMappingEffect as any).adaptiveLuminanceMaterial;
    if (adaptiveMaterial) {
      adaptiveMaterial.minLuminance = value;
    }
  }

  /**
   * Registers event handlers and starts animation loop
   */
  private registerEventHandlers(): void {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.animate();
  }

  /**
   * Generates a procedural environment map using PMREMGenerator
   * Replicates the 'Lightformers' setup
   */
  private generateEnvironment(): void {
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color('#444');

    // Helper to create lightformers
    const createLightformer = (
      geometry: THREE.BufferGeometry,
      color: THREE.ColorRepresentation,
      intensity: number,
      position: [number, number, number],
      rotation: [number, number, number],
      scale: [number, number, number]
    ) => {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        side: THREE.DoubleSide,
      });
      // Multiply color by intensity to simulate high dynamic range
      material.color.multiplyScalar(intensity);

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      mesh.rotation.set(...rotation);
      mesh.scale.set(...scale);
      envScene.add(mesh);
    };

    // Geometries
    const planeGeo = new THREE.PlaneGeometry(1, 1);
    const circleGeo = new THREE.CircleGeometry(1, 32);
    const ringGeo = new THREE.RingGeometry(0.8, 1, 32);

    // Ceiling
    createLightformer(planeGeo, 0xffffff, 0.75, [0, 5, -9], [Math.PI / 2, 0, 0], [10, 10, 1]);

    // Ceiling Circles
    const positions = [2, 0, 2, 0, 2, 0, 2, 0];
    positions.forEach((x, i) => {
      createLightformer(circleGeo, 0xffffff, 2, [x, 4, (i * 4) - 10], [Math.PI / 2, 0, 0], [3, 1, 1]); // Offset z to center roughly
    });

    // Sides
    createLightformer(planeGeo, 0xffffff, 4, [-5, 1, -1], [0, Math.PI / 2, 0], [20, 0.1, 1]);
    createLightformer(planeGeo, 0xffffff, 1, [-5, -1, -1], [0, Math.PI / 2, 0], [20, 0.5, 1]);
    createLightformer(planeGeo, 0xffffff, 1, [10, 1, 0], [0, -Math.PI / 2, 0], [20, 1, 1]);

    // Accent (Red Ring)
    createLightformer(ringGeo, 'red', 1, [-15, 4, -18], [0, 0, 0], [10, 10, 1]);

    // Generate environment texture
    const envMap = pmremGenerator.fromScene(envScene).texture;
    this.scene.environment = envMap;
    // this.scene.background = envMap; // Optional: set as background too if desired

    // Cleanup
    pmremGenerator.dispose();
    // envScene.traverse(o => {
    //   if (o instanceof THREE.Mesh) {
    //     o.geometry.dispose();
    //     o.material.dispose();
    //   }
    // });
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
    if (this.composer) {
      this.composer.setSize(safeWidth, safeHeight);
    }

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
    this.composer.render();
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
   * Gets the OrbitControls for advanced usage
   */
  getControls(): OrbitControls {
    return this.controls;
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

    // Dispose composer
    this.composer.dispose();

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
