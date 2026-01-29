import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * CharacterController - WASD-style movement controller
 * Handles keyboard input for first-person style navigation
 * Works alongside OrbitControls for camera rotation
 */
export class CharacterController {
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;

  // Movement state
  private moveForward = false;
  private moveBackward = false;
  private moveLeft = false;
  private moveRight = false;
  private isSprinting = false;

  // Movement configuration
  private moveSpeed = 0.15;
  private sprintMultiplier = 2.5;
  private velocity = new THREE.Vector3();
  private direction = new THREE.Vector3();

  // Enabled state
  private enabled = true;

  constructor(camera: THREE.PerspectiveCamera, controls: OrbitControls) {
    this.camera = camera;
    this.controls = controls;

    this.initializeEventListeners();
  }

  /**
   * Initializes keyboard event listeners
   */
  private initializeEventListeners(): void {
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  /**
   * Handles keydown events
   */
  private onKeyDown = (event: KeyboardEvent): void => {
    if (!this.enabled) return;

    // Ignore if typing in an input field
    if (event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement) {
      return;
    }

    // Track sprint state
    if (event.shiftKey) {
      this.isSprinting = true;
    }

    switch (event.code) {
      case 'KeyW':
        this.moveForward = true;
        break;
      case 'KeyA':
        this.moveLeft = true;
        break;
      case 'KeyS':
        this.moveBackward = true;
        break;
      case 'KeyD':
        this.moveRight = true;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.isSprinting = true;
        break;
    }
  };

  /**
   * Handles keyup events
   */
  private onKeyUp = (event: KeyboardEvent): void => {
    switch (event.code) {
      case 'KeyW':
        this.moveForward = false;
        break;
      case 'KeyA':
        this.moveLeft = false;
        break;
      case 'KeyS':
        this.moveBackward = false;
        break;
      case 'KeyD':
        this.moveRight = false;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.isSprinting = false;
        break;
    }
  };

  /**
   * Updates the character position based on input
   * Should be called every frame in the animation loop
   */
  update(): void {
    if (!this.enabled) return;

    // Reset velocity
    this.velocity.set(0, 0, 0);

    // Calculate current speed (apply sprint multiplier if sprinting)
    const currentSpeed = this.isSprinting
      ? this.moveSpeed * this.sprintMultiplier
      : this.moveSpeed;

    // Calculate movement direction based on camera orientation
    // Get camera's forward direction (ignoring vertical tilt for horizontal movement)
    const cameraDirection = new THREE.Vector3();
    this.camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0;
    cameraDirection.normalize();

    // Get camera's right direction
    const cameraRight = new THREE.Vector3();
    cameraRight.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0));
    cameraRight.normalize();

    // Apply movement based on input
    if (this.moveForward) {
      this.velocity.add(cameraDirection.clone().multiplyScalar(currentSpeed));
    }
    if (this.moveBackward) {
      this.velocity.add(cameraDirection.clone().multiplyScalar(-currentSpeed));
    }
    if (this.moveLeft) {
      this.velocity.add(cameraRight.clone().multiplyScalar(-currentSpeed));
    }
    if (this.moveRight) {
      this.velocity.add(cameraRight.clone().multiplyScalar(currentSpeed));
    }

    // Apply velocity to both camera and orbit controls target
    if (this.velocity.length() > 0) {
      this.camera.position.add(this.velocity);
      this.controls.target.add(this.velocity);
    }
  }

  /**
   * Sets the movement speed
   * @param speed - Movement speed (units per frame)
   */
  setMoveSpeed(speed: number): void {
    this.moveSpeed = speed;
  }

  /**
   * Gets the current movement speed
   */
  getMoveSpeed(): number {
    return this.moveSpeed;
  }

  /**
   * Enables or disables the controller
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;

    // Reset movement state when disabled
    if (!enabled) {
      this.moveForward = false;
      this.moveBackward = false;
      this.moveLeft = false;
      this.moveRight = false;
      this.isSprinting = false;
    }
  }

  /**
   * Sets the sprint speed multiplier
   * @param multiplier - Multiplier applied when holding Shift (default: 2.5)
   */
  setSprintMultiplier(multiplier: number): void {
    this.sprintMultiplier = multiplier;
  }

  /**
   * Gets the current sprint multiplier
   */
  getSprintMultiplier(): number {
    return this.sprintMultiplier;
  }

  /**
   * Gets whether the controller is enabled
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Checks if any movement key is currently pressed
   */
  isMoving(): boolean {
    return this.moveForward || this.moveBackward || this.moveLeft || this.moveRight;
  }

  /**
   * Cleans up event listeners
   */
  dispose(): void {
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
  }
}
