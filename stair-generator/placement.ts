import * as THREE from 'three';
import { IFCAXIS2PLACEMENT2D, IFCAXIS2PLACEMENT3D } from 'web-ifc';

function getRef(value: unknown): number | null {
  if (typeof value === 'number') return value;
  if (value && typeof value === 'object' && 'value' in value) {
    const raw = (value as { value: unknown }).value;
    return typeof raw === 'number' ? raw : null;
  }
  return null;
}

function getCoordinates(pointLine: any): number[] {
  const coordinates = pointLine?.Coordinates;
  if (Array.isArray(coordinates)) {
    return coordinates.map((entry) => {
      if (typeof entry === 'number') return entry;
      if (entry && typeof entry === 'object' && 'value' in entry) {
        const value = (entry as { value: unknown }).value;
        return typeof value === 'number' ? value : 0;
      }
      return 0;
    });
  }
  return [0, 0, 0];
}

function getPoint3(pointLine: any): THREE.Vector3 {
  const coords = getCoordinates(pointLine);
  return new THREE.Vector3(
    coords[0] ?? 0,
    coords[1] ?? 0,
    coords[2] ?? 0
  );
}

function getDirection3(directionLine: any, fallback: THREE.Vector3): THREE.Vector3 {
  const ratios = directionLine?.DirectionRatios;
  if (!Array.isArray(ratios)) return fallback.clone();

  const xyz = ratios.map((entry: unknown) => {
    if (typeof entry === 'number') return entry;
    if (entry && typeof entry === 'object' && 'value' in entry) {
      const value = (entry as { value: unknown }).value;
      return typeof value === 'number' ? value : 0;
    }
    return 0;
  });

  const v = new THREE.Vector3(xyz[0] ?? 0, xyz[1] ?? 0, xyz[2] ?? 0);
  if (v.lengthSq() < 1e-12) return fallback.clone();
  return v.normalize();
}

export function resolveObjectPlacementMatrix(
  api: { GetLine: (modelID: number, expressID: number, flatten?: boolean) => any },
  modelID: number,
  objectPlacementId: number | null
): THREE.Matrix4 {
  if (!objectPlacementId) return new THREE.Matrix4().identity();

  const placement = api.GetLine(modelID, objectPlacementId, false);
  const relativePlacementId = getRef(placement?.RelativePlacement);
  const parentPlacementId = getRef(placement?.PlacementRelTo);

  const localMatrix = resolveAxisPlacementMatrix(api, modelID, relativePlacementId);
  const parentMatrix = resolveObjectPlacementMatrix(api, modelID, parentPlacementId);
  return parentMatrix.multiply(localMatrix);
}

function resolveAxisPlacementMatrix(
  api: { GetLine: (modelID: number, expressID: number, flatten?: boolean) => any },
  modelID: number,
  axisPlacementId: number | null
): THREE.Matrix4 {
  if (!axisPlacementId) return new THREE.Matrix4().identity();

  const placement = api.GetLine(modelID, axisPlacementId, false);
  if (!placement) return new THREE.Matrix4().identity();

  if (placement.type === IFCAXIS2PLACEMENT3D) {
    const location = api.GetLine(modelID, getRef(placement.Location) ?? 0, false);
    const origin = getPoint3(location);

    const axisDirection = placement.Axis
      ? getDirection3(api.GetLine(modelID, getRef(placement.Axis) ?? 0, false), new THREE.Vector3(0, 0, 1))
      : new THREE.Vector3(0, 0, 1);
    const refDirection = placement.RefDirection
      ? getDirection3(api.GetLine(modelID, getRef(placement.RefDirection) ?? 0, false), new THREE.Vector3(1, 0, 0))
      : new THREE.Vector3(1, 0, 0);

    const xAxis = refDirection.clone().normalize();
    const zAxis = axisDirection.clone().normalize();
    const yAxis = zAxis.clone().cross(xAxis).normalize();

    // If RefDirection is near-collinear with Axis, fallback to a stable basis.
    if (!Number.isFinite(yAxis.x) || yAxis.lengthSq() < 1e-12) {
      const fallback = Math.abs(zAxis.z) < 0.99 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(0, 1, 0);
      yAxis.copy(fallback.cross(zAxis).normalize());
      xAxis.copy(yAxis.clone().cross(zAxis).normalize());
    } else {
      xAxis.copy(yAxis.clone().cross(zAxis).normalize());
    }

    const matrix = new THREE.Matrix4();
    matrix.set(
      xAxis.x, yAxis.x, zAxis.x, origin.x,
      xAxis.y, yAxis.y, zAxis.y, origin.y,
      xAxis.z, yAxis.z, zAxis.z, origin.z,
      0, 0, 0, 1
    );
    return matrix;
  }

  if (placement.type === IFCAXIS2PLACEMENT2D) {
    const location = api.GetLine(modelID, getRef(placement.Location) ?? 0, false);
    const coords = getCoordinates(location);
    const origin = new THREE.Vector3(coords[0] ?? 0, coords[1] ?? 0, 0);

    const refDirection = placement.RefDirection
      ? getDirection3(api.GetLine(modelID, getRef(placement.RefDirection) ?? 0, false), new THREE.Vector3(1, 0, 0))
      : new THREE.Vector3(1, 0, 0);

    const xAxis = new THREE.Vector3(refDirection.x, refDirection.y, 0).normalize();
    const yAxis = new THREE.Vector3(-xAxis.y, xAxis.x, 0).normalize();
    const zAxis = new THREE.Vector3(0, 0, 1);

    const matrix = new THREE.Matrix4();
    matrix.set(
      xAxis.x, yAxis.x, zAxis.x, origin.x,
      xAxis.y, yAxis.y, zAxis.y, origin.y,
      xAxis.z, yAxis.z, zAxis.z, origin.z,
      0, 0, 0, 1
    );
    return matrix;
  }

  return new THREE.Matrix4().identity();
}
