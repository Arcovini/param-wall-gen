import * as THREE from 'three';
import { ifcPointToThree } from './ifcToThree';
import type { StairGeometryData } from './index';

function createThreeBoxFromIfcBounds(minIfc: THREE.Vector3, maxIfc: THREE.Vector3): THREE.Box3 {
  const cornersIfc = [
    new THREE.Vector3(minIfc.x, minIfc.y, minIfc.z),
    new THREE.Vector3(minIfc.x, minIfc.y, maxIfc.z),
    new THREE.Vector3(minIfc.x, maxIfc.y, minIfc.z),
    new THREE.Vector3(minIfc.x, maxIfc.y, maxIfc.z),
    new THREE.Vector3(maxIfc.x, minIfc.y, minIfc.z),
    new THREE.Vector3(maxIfc.x, minIfc.y, maxIfc.z),
    new THREE.Vector3(maxIfc.x, maxIfc.y, minIfc.z),
    new THREE.Vector3(maxIfc.x, maxIfc.y, maxIfc.z),
  ];
  const cornersThree = cornersIfc.map((corner) => ifcPointToThree([corner.x, corner.y, corner.z]));
  return new THREE.Box3().setFromPoints(cornersThree);
}

export function buildStairDebugGroup(data: StairGeometryData): THREE.Group {
  const group = new THREE.Group();
  group.name = 'stair-debug-group';

  const axisMaterial = new THREE.LineBasicMaterial({ color: 0x1f77ff });
  const footprintMaterial = new THREE.LineBasicMaterial({ color: 0x00aa55 });

  for (const polyline of data.axisPolylines) {
    if (polyline.length < 2) continue;
    const points = polyline.map(ifcPointToThree);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, axisMaterial);
    line.name = 'stair-axis';
    group.add(line);
  }

  for (const polyline of data.footprintPolylines) {
    if (polyline.length < 2) continue;
    const points = polyline.map(ifcPointToThree);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = polyline.length >= 3
      ? new THREE.LineLoop(geometry, footprintMaterial)
      : new THREE.Line(geometry, footprintMaterial);
    line.name = 'stair-footprint';
    group.add(line);
  }

  return group;
}

export function buildStairBoundsGroup(data: StairGeometryData): THREE.Group {
  const group = new THREE.Group();
  group.name = 'stair-bounds-group';

  const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0xff6600,
    transparent: true,
    opacity: 0.15,
    depthWrite: false,
  });
  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xff6600 });
  const stairFlightBoxMaterial = new THREE.MeshBasicMaterial({
    color: 0x00aaff,
    transparent: true,
    opacity: 0.15,
    depthWrite: false,
  });
  const stairFlightEdgeMaterial = new THREE.LineBasicMaterial({ color: 0x00aaff });

  const MIN_THICKNESS = 0.02;

  for (const stairBox of data.boundingBoxes) {
    const minIfc = new THREE.Vector3(stairBox.min[0], stairBox.min[1], stairBox.min[2]);
    const maxIfc = new THREE.Vector3(stairBox.max[0], stairBox.max[1], stairBox.max[2]);
    const boxThree = createThreeBoxFromIfcBounds(minIfc, maxIfc);
    const size = boxThree.getSize(new THREE.Vector3());
    if (size.x < MIN_THICKNESS) size.x = MIN_THICKNESS;
    if (size.y < MIN_THICKNESS) size.y = MIN_THICKNESS;
    if (size.z < MIN_THICKNESS) size.z = MIN_THICKNESS;

    const center = boxThree.getCenter(new THREE.Vector3());
    const isFlight = stairBox.source === 'IfcStairFlight';
    const fillMaterial = isFlight ? stairFlightBoxMaterial : boxMaterial;
    const lineMaterial = isFlight ? stairFlightEdgeMaterial : edgeMaterial;
    const namePrefix = isFlight ? 'stair-flight-bbox' : 'stair-bbox';
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(size.x, size.y, size.z), fillMaterial);
    mesh.position.copy(center);
    mesh.name = `${namePrefix}-${stairBox.expressID}`;
    group.add(mesh);

    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(size.x, size.y, size.z)), lineMaterial);
    edges.position.copy(center);
    edges.name = `${namePrefix}-edges-${stairBox.expressID}`;
    group.add(edges);
  }

  return group;
}
