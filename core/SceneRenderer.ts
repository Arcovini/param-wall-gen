import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer, RenderPass, EffectPass, BloomEffect, Pass } from 'postprocessing';

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
  private renderer: THREE.WebGLRenderer;
  private composer: EffectComposer;
  private controls: OrbitControls;
  private animationId: number | null = null;
  private canvas: HTMLCanvasElement;

  // Lighting
  private ambientLight: THREE.AmbientLight;

  constructor(container: HTMLElement) {
    // Check WebGL support
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
    this.camera.position.set(15, 15, 15); // Adjusted position for better view
    this.camera.lookAt(0, 0, 0);

    // Initialize renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: false, // Disabled for post-processing
      alpha: false,
      powerPreference: "high-performance",
      stencil: false,
      depth: false
    });

    // Configure renderer
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.5;
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

    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 15, 0);
    spotLight.angle = 0.3;
    spotLight.penumbra = 1;
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.0001;
    this.scene.add(spotLight);

    // Generate Procedural Environment
    this.generateEnvironment();

    // Initialize Post-Processing
    this.composer = new EffectComposer(this.renderer);

    // Render Pass
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // N8AO Pass (SSAO)
    const n8aoPass = new N8AOPostPass(
      this.scene,
      this.camera,
      window.innerWidth - 320,
      window.innerHeight
    );
    n8aoPass.configuration.aoRadius = 2.0;
    n8aoPass.configuration.intensity = 5.0;
    this.composer.addPass(n8aoPass);

    // Bloom Pass
    const bloomEffect = new BloomEffect({
      luminanceThreshold: 1.0,
      intensity: 1.0,
      mipmapBlur: true,
      levels: 7
    });
    const effectPass = new EffectPass(this.camera, bloomEffect);
    this.composer.addPass(effectPass);

    // Handle window resize
    window.addEventListener('resize', this.handleResize.bind(this));

    // Start animation loop
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
