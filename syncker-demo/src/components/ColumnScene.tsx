import { useRef, useEffect } from "react";
import * as THREE from "three";
import {
  ColumnConcreteType,
  COLUMN_CONCRETE_20X20,
  COLUMN_CONCRETE_30X30,
  COLUMN_CONCRETE_MIXED,
  COLUMN_CONCRETE_MINIMAL,
  ColumnConcreteThreeJsBuilder,
  ElementThreeJsBuilder,
  ElementStateType,
  Pose,
  Vec3,
  Quaternion,
  generateUUID,
} from "@webphy/syncker-lib-v2";

interface ColumnSceneProps {
  presetType: "single-20x20" | "single-30x30" | "mixed" | "custom" | "minimal";
}

export function ColumnScene({ presetType }: ColumnSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
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
    camera.position.set(3, 3, 3);
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

    const columnType = new ColumnConcreteType(
      generateUUID(),
      "Coluna Concreto Padrão",
      [
        COLUMN_CONCRETE_20X20,
        COLUMN_CONCRETE_30X30,
        COLUMN_CONCRETE_MIXED,
        COLUMN_CONCRETE_MINIMAL,
      ],
    );

    let column;

    switch (presetType) {
      case "single-20x20":
        column = columnType.createElement({
          id: "column-001",
          pose: new Pose(new Vec3(0, 1.5, 0), new Quaternion(0, 0, 0, 1)),
          dimensions: new Vec3(0.2, 3.0, 0.2),
          preset: COLUMN_CONCRETE_20X20,
          stateType: ElementStateType.PROJECTED,
        });
        break;

      case "single-30x30":
        column = columnType.createElement({
          id: "column-002",
          pose: new Pose(new Vec3(0, 1.5, 0), new Quaternion(0, 0, 0, 1)),
          dimensions: new Vec3(0.3, 3.0, 0.3),
          preset: COLUMN_CONCRETE_30X30,
          stateType: ElementStateType.PROJECTED,
        });
        break;

      case "mixed":
        column = columnType.createElement({
          id: "column-003",
          pose: new Pose(new Vec3(0, 1.5, 0), new Quaternion(0, 0, 0, 1)),
          dimensions: new Vec3(0.25, 3.0, 0.25),
          preset: COLUMN_CONCRETE_MIXED,
          stateType: ElementStateType.PROJECTED,
        });
        break;

      case "custom":
        column = columnType.createElement({
          id: "column-004",
          pose: new Pose(new Vec3(0, 1.5, 0), new Quaternion(0, 0, 0, 1)),
          dimensions: new Vec3(0.25, 3.0, 0.25),
          presets: [
            { preset: COLUMN_CONCRETE_30X30, bias: 0.3 },
            { preset: COLUMN_CONCRETE_20X20, bias: 0.7 },
          ],
          stateType: ElementStateType.PROJECTED,
        });
        break;

      case "minimal":
        column = columnType.createElement({
          id: "column-005",
          pose: new Pose(new Vec3(0, 1.5, 0), new Quaternion(0, 0, 0, 1)),
          dimensions: new Vec3(0.25, 3.0, 0.25),
          preset: COLUMN_CONCRETE_MINIMAL,
          stateType: ElementStateType.PROJECTED,
        });
        break;
    }

    const builder = new ElementThreeJsBuilder();
    const columnObject = builder.build(
      new ColumnConcreteThreeJsBuilder(),
      column,
      ElementStateType.PROJECTED,
      {
        castShadow: true,
        receiveShadow: true,
        renderer,
      } as never,
    );

    scene.add(columnObject as never);

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

      const radius = Math.sqrt(
        Math.pow(cameraRef.current.position.x, 2) +
          Math.pow(cameraRef.current.position.z, 2),
      );

      const currentAngle = Math.atan2(
        cameraRef.current.position.z,
        cameraRef.current.position.x,
      );

      const newAngle =
        currentAngle - deltaX * controlsRef.current.rotationSpeed;

      cameraRef.current.position.x = radius * Math.cos(newAngle);
      cameraRef.current.position.z = radius * Math.sin(newAngle);

      cameraRef.current.position.y -=
        deltaY * controlsRef.current.rotationSpeed * 2;
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
      event.preventDefault();
      if (!cameraRef.current) return;

      const zoomSpeed = 0.1;
      const direction = new THREE.Vector3();
      direction
        .subVectors(new THREE.Vector3(0, 1.5, 0), cameraRef.current.position)
        .normalize();

      if (event.deltaY < 0) {
        cameraRef.current.position.addScaledVector(direction, zoomSpeed);
      } else {
        cameraRef.current.position.addScaledVector(direction, -zoomSpeed);
      }

      const minDistance = 1;
      const maxDistance = 15;
      const distance = cameraRef.current.position.distanceTo(
        new THREE.Vector3(0, 1.5, 0),
      );

      if (distance < minDistance || distance > maxDistance) {
        cameraRef.current.position.addScaledVector(
          direction,
          event.deltaY < 0 ? -zoomSpeed : zoomSpeed,
        );
      }
    };

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current)
        return;

      cameraRef.current.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight,
      );
    };

    renderer.domElement.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    renderer.domElement.addEventListener("wheel", handleWheel);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      renderer.domElement.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      renderer.domElement.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);

      if (containerRef.current && renderer.domElement.parentElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
      sceneRef.current = null;
    };
  }, [presetType]);

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
