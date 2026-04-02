import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  ElementStateType,
  ElementThreeJsBuilder,
  generateUUID,
  Pose,
  Quaternion,
  SlabFloorThreeJsBuilder,
  SLAB_FLOOR_DEMO,
  SLAB_FLOOR_STANDARD_TYPE,
  Vec2,
  Vec3,
} from "@webphy/syncker-lib-v2";

export type SlabDemoKey =
  | "rect-plain"
  | "rect-central-hole"
  | "rect-two-holes"
  | "l-shape"
  | "hex-with-hole"
  /** Registro IFC: Piso TQS h=14 (conversão Z-up → Three Y-up no demo). */
  | "ifc-tqs-floor";

export interface SlabSceneProps {
  /** Demo do elemento SlabFloor: perfil 2D + aberturas (`Vec2[][]`). */
  demoKey?: SlabDemoKey;
}

/** id 1_FivgDDH2C8jkh3arHnTf — Piso:TQS h=14 - Concreto C35 (extrude_arbitrary, sem openings). */
const IFC_TQS_PROFILE_2D: [number, number][] = [
  [-0.4679999999998633, -6.280999999999937],
  [3.241999999999969, -6.280999999999937],
  [3.241999999999969, -1.8209999999999673],
  [2.19200000000013, -1.8209999999999673],
  [2.19200000000013, -1.570999999999868],
  [3.241999999999969, -1.570999999999868],
  [3.241999999999969, 2.889000000000036],
  [2.1920000000000086, 2.889000000000036],
  [2.1920000000000086, 3.1390000000000313],
  [3.241999999999969, 3.1390000000000313],
  [3.241999999999969, 8.888999999999832],
  [-4.918000000000142, 8.888999999999832],
  [-4.918000000000142, 3.028999999999935],
  [-1.6280000000001411, 3.028999999999935],
  [-1.6280000000001411, -0.6310000000000645],
  [-2.228000000000061, -0.6310000000000645],
  [-2.228000000000061, -2.9210000000000638],
  [-4.867999999999881, -2.9210000000000638],
  [-4.867999999999881, -4.720999999999966],
  [-0.4679999999998633, -4.720999999999966],
  [-0.4679999999998633, -6.280999999999937],
];

function buildDemoParams(demoKey: SlabDemoKey) {
  const base = {
    pose: new Pose(new Vec3(0, 0.1, 0), new Quaternion(0, 0, 0, 1)),
    worldScale: new Vec3(1, 1, 1),
    solidPose: new Pose(new Vec3(0, 0, 0), new Quaternion(0, 0, 0, 1)),
    solidScale: new Vec3(1, 1, 1),
    thickness: 0.2,
    extrusionDirection: new Vec3(0, 1, 0),
  };

  switch (demoKey) {
    case "rect-plain":
      return {
        ...base,
        profile2d: [
          new Vec2(-2, -1.5),
          new Vec2(2, -1.5),
          new Vec2(2, 1.5),
          new Vec2(-2, 1.5),
        ],
        openings: [] as Vec2[][],
        displayName: "Retângulo sem aberturas",
      };

    case "rect-central-hole":
      return {
        ...base,
        profile2d: [
          new Vec2(-2, -1.5),
          new Vec2(2, -1.5),
          new Vec2(2, 1.5),
          new Vec2(-2, 1.5),
        ],
        openings: [
          [
            new Vec2(-0.5, -0.35),
            new Vec2(0.5, -0.35),
            new Vec2(0.5, 0.35),
            new Vec2(-0.5, 0.35),
          ],
        ],
        displayName: "Retângulo com furo central",
      };

    case "rect-two-holes":
      return {
        ...base,
        profile2d: [
          new Vec2(-2.5, -1.2),
          new Vec2(2.5, -1.2),
          new Vec2(2.5, 1.2),
          new Vec2(-2.5, 1.2),
        ],
        openings: [
          [
            new Vec2(-1.6, -0.35),
            new Vec2(-0.5, -0.35),
            new Vec2(-0.5, 0.35),
            new Vec2(-1.6, 0.35),
          ],
          [
            new Vec2(0.5, -0.35),
            new Vec2(1.6, -0.35),
            new Vec2(1.6, 0.35),
            new Vec2(0.5, 0.35),
          ],
        ],
        displayName: "Retângulo com dois furos",
      };

    case "l-shape":
      return {
        ...base,
        profile2d: [
          new Vec2(-2, -2),
          new Vec2(2, -2),
          new Vec2(2, -0.5),
          new Vec2(-0.5, -0.5),
          new Vec2(-0.5, 2),
          new Vec2(-2, 2),
        ],
        openings: [] as Vec2[][],
        displayName: "Perfil em L",
      };

    case "hex-with-hole": {
      const r = 1.8;
      const hex: Vec2[] = [];
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        hex.push(new Vec2(r * Math.cos(a), r * Math.sin(a)));
      }
      const holeR = 0.55;
      const tri: Vec2[] = [];
      for (let i = 0; i < 3; i++) {
        const a = (Math.PI * 2 * i) / 3 + Math.PI / 2;
        tri.push(new Vec2(holeR * Math.cos(a), holeR * Math.sin(a)));
      }
      return {
        ...base,
        profile2d: hex,
        openings: [tri],
        displayName: "Hexágono com furo triangular",
      };
    }

    case "ifc-tqs-floor": {
      /**
       * IFC é Z-up: rotação no plano horizontal = eixo Z. No Three.js (Y-up) isso não pode
       * ser aplicada como quaternion da world_matrix direto — viraria rotação em torno de Z
       * horizontal e o piso ficaria vertical. Convertemos o yaw do plano IFC (XY) para
       * rotação em torno de Y (plano XZ). O solid_matrix do IFC assume extrusão em Z; aqui a
       * geometria já está em Y-up (extrusão Y), então usamos só a translação in-plane
       * mapeada (x,y)_IFC → (x,z)_Three.
       */
      const cos = 0.8962543159726004;
      const sin = -0.44354052926478577;
      const yawY = Math.atan2(sin, cos);
      const qWorldY = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        yawY,
      );

      const solidPosThree = new Vec3(45.201000932320994, 0, 27.80800000000165);

      const mWorld = new THREE.Matrix4().compose(
        new THREE.Vector3(0, 0, 0),
        qWorldY,
        new THREE.Vector3(1, 1, 1),
      );
      const mSolid = new THREE.Matrix4().compose(
        new THREE.Vector3(solidPosThree.x, solidPosThree.y, solidPosThree.z),
        new THREE.Quaternion(),
        new THREE.Vector3(1, 1, 1),
      );
      const combined = new THREE.Matrix4().multiplyMatrices(mWorld, mSolid);
      const originW = new THREE.Vector3();
      combined.decompose(originW, new THREE.Quaternion(), new THREE.Vector3());

      const profile2d = IFC_TQS_PROFILE_2D.map(([x, y]) => new Vec2(x, y));

      return {
        pose: new Pose(
          new Vec3(0, 0, 0),
          new Quaternion(qWorldY.x, qWorldY.y, qWorldY.z, qWorldY.w),
        ),
        worldScale: new Vec3(1, 1, 1),
        solidPose: new Pose(solidPosThree, new Quaternion(0, 0, 0, 1)),
        solidScale: new Vec3(1, 1, 1),
        thickness: 0.14000000000000282,
        extrusionDirection: new Vec3(0, 1, 0),
        profile2d,
        openings: [] as Vec2[][],
        displayName: "Piso:TQS h=14 - Concreto C35 (IFC)",
        orbitTarget: new Vec3(originW.x, originW.y, originW.z),
      };
    }

    default:
      return buildDemoParams("rect-plain");
  }
}

export function SlabScene({ demoKey = "ifc-tqs-floor" }: SlabSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      500,
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight1.position.set(1, 2, 1);
    directionalLight1.castShadow = true;
    directionalLight1.shadow.mapSize.width = 2048;
    directionalLight1.shadow.mapSize.height = 2048;
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.45);
    directionalLight2.position.set(-1, 1, -1);
    scene.add(directionalLight2);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.35);
    scene.add(hemisphereLight);

    const demo = buildDemoParams(demoKey);
    const { orbitTarget, ...floorCreateParams } = demo as typeof demo & {
      orbitTarget?: Vec3;
    };

    const floor = SLAB_FLOOR_STANDARD_TYPE.createElement({
      id: generateUUID(),
      ...floorCreateParams,
      preset: SLAB_FLOOR_DEMO,
      stateType: ElementStateType.PROJECTED,
    });

    const builder = new ElementThreeJsBuilder();
    const floorObject = builder.build(
      new SlabFloorThreeJsBuilder(),
      floor,
      ElementStateType.PROJECTED,
      {
        castShadow: true,
        receiveShadow: true,
        renderer,
      } as never,
    );

    const floorRoot = floorObject as unknown as THREE.Object3D;
    scene.add(floorObject as never);

    const target = orbitTarget
      ? new THREE.Vector3(orbitTarget.x, orbitTarget.y, orbitTarget.z)
      : new THREE.Vector3(
          floorCreateParams.pose.position.x,
          floorCreateParams.pose.position.y,
          floorCreateParams.pose.position.z,
        );

    const grid = new THREE.GridHelper(10, 20, 0x9d4b4b, 0x6e6e6e);
    scene.add(grid);

    const axes = new THREE.AxesHelper(1);
    axes.position.copy(target);
    scene.add(axes);

    camera.position.set(target.x + 28, target.y + 22, target.z + 36);
    camera.lookAt(target);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(target);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 2;
    controls.maxDistance = 180;

    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();

      scene.remove(floorRoot);
      floorRoot.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const mat = object.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });

      scene.remove(grid);
      scene.remove(axes);

      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [demoKey]);

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
