import { useRef, useEffect } from "react";
import * as THREE from "three";
import {
  WallMasonryType,
  WALL_MASONRY_CERAMIC,
  WALL_MASONRY_CONCRETE,
  WALL_MASONRY_FACE_BRICK,
  WallMasonryPreset,
  WallMasonryThreeJsBuilder,
  ElementThreeJsBuilder,
  ElementStateType,
  Pose,
  Vec3,
  Quaternion,
  generateUUID,
} from "@webphy/syncker-lib-v2";

export type WallPresetChoice = "ceramic" | "concrete" | "face-brick";

const WALL_PRESET_BY_CHOICE: Record<
  WallPresetChoice,
  { id: string; preset: WallMasonryPreset }
> = {
  ceramic: { id: "ceramic", preset: WALL_MASONRY_CERAMIC },
  concrete: { id: "concrete", preset: WALL_MASONRY_CONCRETE },
  "face-brick": { id: "face-brick", preset: WALL_MASONRY_FACE_BRICK },
};

const ALL_WALL_PRESETS = Object.values(WALL_PRESET_BY_CHOICE).map(
  (o) => o.preset,
);

/** Dimensões de estado alinhadas ao `preset.sample()` (o builder Three.js usa a mesma amostragem). */
function sampleWallLayout(preset: WallMasonryPreset) {
  const s = preset.sample();
  const b = s.block.dimensions;
  return {
    blockSize: new Vec3(b.x, b.y, b.z),
    cementThickness: s.joint.dimensions.y,
    wallDepth: b.z,
  };
}

interface WallSceneProps {
  wallPresetChoice: WallPresetChoice;
}

export function WallScene({ wallPresetChoice }: WallSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const selected = WALL_PRESET_BY_CHOICE[wallPresetChoice];

  const controlsRef = useRef<{
    isDragging: boolean;
    previousMousePosition: { x: number; y: number };
    rotationSpeed: number;
  }>({
    isDragging: false,
    previousMousePosition: { x: 0, y: 0 },
    rotationSpeed: 0.005,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(5, 2, 5);
    camera.lookAt(0, 1.5, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight1.position.set(5, 10, 5);
    directionalLight1.castShadow = true;
    directionalLight1.shadow.mapSize.width = 2048;
    directionalLight1.shadow.mapSize.height = 2048;
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-3, 5, -3);
    scene.add(directionalLight2);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
    scene.add(hemisphereLight);

    const gridHelper = new THREE.GridHelper(10, 20, 0x9d4b4b, 0x6e6e6e);
    scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(1);
    axesHelper.position.set(0, 0.01, 0);
    scene.add(axesHelper);

    const preset = selected.preset;
    const { blockSize, cementThickness, wallDepth } = sampleWallLayout(preset);

    const wallType = new WallMasonryType(
      generateUUID(),
      "Parede alvenaria (demo)",
      ALL_WALL_PRESETS,
    );

    const wall = wallType.createElement({
      id: "wall-001",
      pose: new Pose(new Vec3(0, 1.5, 0), new Quaternion(0, 0, 0, 1)),
      dimensions: new Vec3(4.0, 3.0, wallDepth),
      preset,
      blockSize,
      cementThickness,
      completion: 1,
      openings: [
        {
          position: new Vec3(-1.0, 0.5, 0),
          size: new Vec3(0.8, 0.6, wallDepth),
        },
        {
          position: new Vec3(1.2, 0.8, 0),
          size: new Vec3(1.0, 0.6, wallDepth),
        },
      ],
      stateType: ElementStateType.PROJECTED,
    });

    const builder = new ElementThreeJsBuilder();
    const wallObject = builder.build(
      new WallMasonryThreeJsBuilder(),
      wall,
      ElementStateType.PROJECTED,
      {
        castShadow: true,
        receiveShadow: true,
        renderer,
      } as never,
    );

    scene.add(wallObject as never);

    const handleMouseDown = (event: MouseEvent) => {
      controlsRef.current.isDragging = true;
      controlsRef.current.previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!controlsRef.current.isDragging || !cameraRef.current) return;

      const deltaX =
        event.clientX - controlsRef.current.previousMousePosition.x;
      const deltaY =
        event.clientY - controlsRef.current.previousMousePosition.y;

      const rotationSpeed = controlsRef.current.rotationSpeed;

      const radius = Math.sqrt(
        Math.pow(cameraRef.current.position.x, 2) +
          Math.pow(cameraRef.current.position.z, 2),
      );

      const currentAngle = Math.atan2(
        cameraRef.current.position.z,
        cameraRef.current.position.x,
      );
      const newAngle = currentAngle - deltaX * rotationSpeed;

      cameraRef.current.position.x = radius * Math.cos(newAngle);
      cameraRef.current.position.z = radius * Math.sin(newAngle);

      cameraRef.current.position.y -= deltaY * rotationSpeed * 2;
      cameraRef.current.position.y = Math.max(
        0.5,
        Math.min(10, cameraRef.current.position.y),
      );

      cameraRef.current.lookAt(0, 1.5, 0);

      controlsRef.current.previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handleMouseUp = () => {
      controlsRef.current.isDragging = false;
    };

    const handleWheel = (event: WheelEvent) => {
      if (!cameraRef.current) return;

      event.preventDefault();

      const zoomSpeed = 0.001;
      const delta = event.deltaY * zoomSpeed;

      const direction = new THREE.Vector3();
      direction.subVectors(
        cameraRef.current.position,
        new THREE.Vector3(0, 1.5, 0),
      );

      const newLength = direction.length() + delta;
      const clampedLength = Math.max(2, Math.min(15, newLength));

      direction.normalize().multiplyScalar(clampedLength);
      cameraRef.current.position.copy(
        direction.add(new THREE.Vector3(0, 1.5, 0)),
      );
      cameraRef.current.lookAt(0, 1.5, 0);
    };

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current)
        return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    renderer.domElement.addEventListener("mousedown", handleMouseDown);
    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mouseup", handleMouseUp);
    renderer.domElement.addEventListener("wheel", handleWheel, {
      passive: false,
    });
    window.addEventListener("resize", handleResize);

    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      renderer.domElement.removeEventListener("mousedown", handleMouseDown);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mouseup", handleMouseUp);
      renderer.domElement.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (
        containerRef.current &&
        renderer.domElement.parentNode === containerRef.current
      ) {
        containerRef.current.removeChild(renderer.domElement);
      }

      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
    };
  }, [wallPresetChoice]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
}
