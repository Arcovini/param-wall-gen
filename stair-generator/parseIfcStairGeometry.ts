import * as THREE from 'three';
import {
  IfcAPI,
  IFCRELAGGREGATES,
  IFCRELDEFINESBYPROPERTIES,
  IFCSTAIR,
  IFCSTAIRFLIGHT,
} from 'web-ifc';
import wasmUrl from 'web-ifc/web-ifc.wasm?url';
import { extractAxisAndFootprintPolylines } from './extractRepresentations';
import { resolveObjectPlacementMatrix } from './placement';
import type {
  Point3,
  StairBBox,
  StairFlightProperties,
  StairGeometryData,
  StairSummary,
} from './types';

let apiSingleton: IfcAPI | null = null;
let apiInitPromise: Promise<IfcAPI> | null = null;

function getRef(value: unknown): number | null {
  if (typeof value === 'number') return value;
  if (value && typeof value === 'object' && 'value' in value) {
    const raw = (value as { value: unknown }).value;
    return typeof raw === 'number' ? raw : null;
  }
  return null;
}

function applyMatrixToPoint(point: Point3, matrix: THREE.Matrix4): Point3 {
  const v = new THREE.Vector3(point[0], point[1], point[2]).applyMatrix4(matrix);
  return [v.x, v.y, v.z];
}

function readIfcLabel(value: unknown): string | null {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'value' in value) {
    const raw = (value as { value: unknown }).value;
    return typeof raw === 'string' ? raw : null;
  }
  return null;
}

function readIfcNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (value && typeof value === 'object' && 'value' in value) {
    const raw = (value as { value: unknown }).value;
    return typeof raw === 'number' && Number.isFinite(raw) ? raw : null;
  }
  return null;
}

function getOrCreateFlightProps(
  output: StairGeometryData,
  productId: number,
  fallbackName: string
): StairFlightProperties {
  const existing = output.flightProperties.get(productId);
  if (existing) return existing;
  const created: StairFlightProperties = {
    expressID: productId,
    name: fallbackName,
    numberOfRisers: null,
    numberOfTreads: null,
    riserHeight: null,
    treadLength: null,
    walkingLineOffset: null,
    nosingLength: null,
    flightHeight: null,
  };
  output.flightProperties.set(productId, created);
  return created;
}

async function getIfcApi(): Promise<IfcAPI> {
  if (apiSingleton) return apiSingleton;
  if (apiInitPromise) return apiInitPromise;

  apiInitPromise = (async () => {
    const api = new IfcAPI();
    const absoluteWasmUrl = new URL(wasmUrl, window.location.href).href;
    const lastSlashIndex = absoluteWasmUrl.lastIndexOf('/');
    const wasmFolderUrl = absoluteWasmUrl.slice(0, lastSlashIndex + 1);
    api.SetWasmPath(wasmFolderUrl, true);
    await api.Init();
    apiSingleton = api;
    return api;
  })();

  return apiInitPromise;
}

function collectFlightProperties(
  api: IfcAPI,
  modelID: number,
  output: StairGeometryData
): void {
  // IFC exporter behavior varies: many files leave direct IfcStairFlight attributes null and
  // only populate values in property sets. We seed values from direct attributes first, then
  // override with `Pset_StairFlightCommon` when present.
  const flightIds = api.GetLineIDsWithType(modelID, IFCSTAIRFLIGHT, true);
  const flightIdSet = new Set<number>();
  for (let i = 0; i < flightIds.size(); i += 1) {
    const flightId = flightIds.get(i);
    flightIdSet.add(flightId);
    const line = api.GetLine(modelID, flightId, false);
    if (!line) continue;

    const fallbackName = readIfcLabel(line.Name) ?? `StairFlight ${flightId}`;
    const props = getOrCreateFlightProps(output, flightId, fallbackName);
    props.numberOfRisers = readIfcNumber(line.NumberOfRisers);
    props.numberOfTreads = readIfcNumber(line.NumberOfTreads);
    props.riserHeight = readIfcNumber(line.RiserHeight);
    props.treadLength = readIfcNumber(line.TreadLength);
  }

  // IFC relationship chain:
  // IfcRelDefinesByProperties -> RelatingPropertyDefinition (IfcPropertySet)
  // -> HasProperties (IfcPropertySingleValue) -> NominalValue.value.
  const relIds = api.GetLineIDsWithType(modelID, IFCRELDEFINESBYPROPERTIES, true);
  for (let i = 0; i < relIds.size(); i += 1) {
    const relLine = api.GetLine(modelID, relIds.get(i), false);
    if (!relLine?.RelatedObjects || !relLine.RelatingPropertyDefinition) continue;

    const relatedIds = relLine.RelatedObjects
      .map((item: unknown) => getRef(item))
      .filter((id: number | null): id is number => id !== null && flightIdSet.has(id));
    if (relatedIds.length === 0) continue;

    const propertyDefId = getRef(relLine.RelatingPropertyDefinition);
    if (propertyDefId === null) continue;
    const propertyDefLine = api.GetLine(modelID, propertyDefId, false);
    if (!propertyDefLine) continue;

    const psetName = readIfcLabel(propertyDefLine.Name);
    if (psetName !== 'Pset_StairFlightCommon' || !propertyDefLine.HasProperties) continue;

    for (const relatedId of relatedIds) {
      const flightProps = output.flightProperties.get(relatedId);
      if (!flightProps) continue;

      for (const hasPropertyRef of propertyDefLine.HasProperties as unknown[]) {
        const propertyId = getRef(hasPropertyRef);
        if (propertyId === null) continue;
        const propertyLine = api.GetLine(modelID, propertyId, false);
        if (!propertyLine) continue;

        const propName = readIfcLabel(propertyLine.Name);
        const propValue = readIfcNumber(propertyLine.NominalValue);
        if (propName === null || propValue === null) continue;

        if (propName === 'NumberOfRiser' || propName === 'NumberOfRisers') {
          flightProps.numberOfRisers = propValue;
        } else if (propName === 'NumberOfTreads' || propName === 'NumberOfTread') {
          flightProps.numberOfTreads = propValue;
        } else if (propName === 'RiserHeight') {
          flightProps.riserHeight = propValue;
        } else if (propName === 'TreadLength') {
          flightProps.treadLength = propValue;
        } else if (propName === 'WalkingLineOffset') {
          flightProps.walkingLineOffset = propValue;
        } else if (propName === 'NosingLength') {
          flightProps.nosingLength = propValue;
        }
      }
    }
  }

  for (const props of output.flightProperties.values()) {
    if (
      props.riserHeight !== null
      && props.numberOfRisers !== null
      && props.riserHeight > 0
      && props.numberOfRisers > 0
    ) {
      props.flightHeight = props.riserHeight * props.numberOfRisers;
    } else {
      props.flightHeight = null;
    }
  }
}

function collectProductTypeData(
  api: IfcAPI,
  modelID: number,
  productType: number,
  source: StairBBox['source'],
  output: StairGeometryData
): void {
  const expressIds = api.GetLineIDsWithType(modelID, productType, true);
  for (let i = 0; i < expressIds.size(); i += 1) {
    const productId = expressIds.get(i);
    const productLine = api.GetLine(modelID, productId, false);
    if (!productLine) continue;

    const objectPlacementId = getRef(productLine.ObjectPlacement);
    const placementMatrix = resolveObjectPlacementMatrix(api, modelID, objectPlacementId);
    const extracted = extractAxisAndFootprintPolylines(api, modelID, productLine);

    const transformedAxis = extracted.axis.map((polyline) =>
      polyline.map((point) => applyMatrixToPoint(point, placementMatrix))
    );
    const transformedFootprint = extracted.footprint.map((polyline) =>
      polyline.map((point) => applyMatrixToPoint(point, placementMatrix))
    );

    output.axisPolylines.push(...transformedAxis);
    output.footprintPolylines.push(...transformedFootprint);

    const allPoints = [...transformedAxis, ...transformedFootprint].flat();
    if (allPoints.length === 0) continue;

    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
    for (const [x, y, z] of allPoints) {
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
      if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
    }

    // Axis/FootPrint are 2D IFC representations for many stair exporters (all local Z=0).
    // For IfcStairFlight we recover the third dimension from Pset_StairFlightCommon:
    // `flightHeight = RiserHeight * NumberOfRiser`.
    if (source === 'IfcStairFlight') {
      const flightHeight = output.flightProperties.get(productId)?.flightHeight;
      if (flightHeight !== null && flightHeight !== undefined && flightHeight > 0) {
        maxZ = Math.max(maxZ, minZ + flightHeight);
      }
    }

    const name = readIfcLabel(productLine.Name)
      ?? (source === 'IfcStairFlight' ? `StairFlight ${productId}` : `Stair ${productId}`);
    output.boundingBoxes.push({
      name,
      expressID: productId,
      source,
      min: [minX, minY, minZ],
      max: [maxX, maxY, maxZ],
    });
  }
}

function collectStairSummaries(
  api: IfcAPI,
  modelID: number,
  output: StairGeometryData
): void {
  const flightBoxes = new Map<number, StairBBox>();
  for (const box of output.boundingBoxes) {
    if (box.source === 'IfcStairFlight') {
      flightBoxes.set(box.expressID, box);
    }
  }

  // IfcRelAggregates provides parent-child structure.
  // Here we map IfcStair -> child IfcStairFlight[] and aggregate overall dimensions.
  const stairIds = api.GetLineIDsWithType(modelID, IFCSTAIR, true);
  const stairIdSet = new Set<number>();
  for (let i = 0; i < stairIds.size(); i += 1) {
    stairIdSet.add(stairIds.get(i));
  }

  const relAggIds = api.GetLineIDsWithType(modelID, IFCRELAGGREGATES, true);
  for (let i = 0; i < relAggIds.size(); i += 1) {
    const relLine = api.GetLine(modelID, relAggIds.get(i), false);
    if (!relLine?.RelatingObject || !relLine.RelatedObjects) continue;

    const stairId = getRef(relLine.RelatingObject);
    if (stairId === null || !stairIdSet.has(stairId)) continue;

    const stairLine = api.GetLine(modelID, stairId, false);
    const stairName = readIfcLabel(stairLine?.Name) ?? `Stair ${stairId}`;
    const flightIds = relLine.RelatedObjects
      .map((item: unknown) => getRef(item))
      .filter((id: number | null): id is number => id !== null && flightBoxes.has(id));

    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;

    for (const flightId of flightIds) {
      const box = flightBoxes.get(flightId);
      if (!box) continue;
      minX = Math.min(minX, box.min[0]);
      minY = Math.min(minY, box.min[1]);
      minZ = Math.min(minZ, box.min[2]);
      maxX = Math.max(maxX, box.max[0]);
      maxY = Math.max(maxY, box.max[1]);
      maxZ = Math.max(maxZ, box.max[2]);
    }

    const hasPlanExtent = Number.isFinite(minX) && Number.isFinite(maxX)
      && Number.isFinite(minY) && Number.isFinite(maxY);
    const hasHeight = Number.isFinite(minZ) && Number.isFinite(maxZ);
    const summary: StairSummary = {
      expressID: stairId,
      name: stairName,
      flights: flightIds,
      totalHeight: hasHeight ? maxZ - minZ : null,
      planExtent: hasPlanExtent
        ? { width: maxX - minX, depth: maxY - minY }
        : null,
    };
    output.stairSummaries.push(summary);
  }
}

function centerAllCoordinates(result: StairGeometryData): void {
  // Placement chains can include georeferenced site coordinates with very large values.
  // Keeping geometry far from origin causes float32 precision jitter in the renderer.
  // We center all IFC points around their centroid to keep camera interaction stable.
  const allPoints: Point3[] = [
    ...result.axisPolylines.flat(),
    ...result.footprintPolylines.flat(),
  ];
  if (allPoints.length === 0) return;

  let sumX = 0, sumY = 0, sumZ = 0;
  for (const [x, y, z] of allPoints) {
    sumX += x; sumY += y; sumZ += z;
  }
  const cx = sumX / allPoints.length;
  const cy = sumY / allPoints.length;
  const cz = sumZ / allPoints.length;

  for (const polyline of result.axisPolylines) {
    for (let i = 0; i < polyline.length; i++) {
      polyline[i] = [polyline[i][0] - cx, polyline[i][1] - cy, polyline[i][2] - cz];
    }
  }
  for (const polyline of result.footprintPolylines) {
    for (let i = 0; i < polyline.length; i++) {
      polyline[i] = [polyline[i][0] - cx, polyline[i][1] - cy, polyline[i][2] - cz];
    }
  }
  for (const bbox of result.boundingBoxes) {
    bbox.min = [bbox.min[0] - cx, bbox.min[1] - cy, bbox.min[2] - cz];
    bbox.max = [bbox.max[0] - cx, bbox.max[1] - cy, bbox.max[2] - cz];
  }
}

export async function parseIfcStairGeometry(fileData: ArrayBuffer): Promise<StairGeometryData> {
  const result: StairGeometryData = {
    axisPolylines: [],
    footprintPolylines: [],
    boundingBoxes: [],
    flightProperties: new Map<number, StairFlightProperties>(),
    stairSummaries: [],
    warnings: [],
  };

  const api = await getIfcApi();
  const modelID = api.OpenModel(new Uint8Array(fileData));

  try {
    collectFlightProperties(api, modelID, result);
    collectProductTypeData(api, modelID, IFCSTAIR, 'IfcStair', result);
    collectProductTypeData(api, modelID, IFCSTAIRFLIGHT, 'IfcStairFlight', result);
    collectStairSummaries(api, modelID, result);

    centerAllCoordinates(result);

    if (result.axisPolylines.length === 0) {
      result.warnings.push('No Axis representation was found on IfcStair/IfcStairFlight.');
    }
    if (result.footprintPolylines.length === 0) {
      result.warnings.push('No FootPrint representation was found; returning only Axis data.');
    }
    if (result.boundingBoxes.length === 0) {
      result.warnings.push('No bounding boxes could be computed from polylines.');
    }
    if (result.flightProperties.size === 0) {
      result.warnings.push('No stair-flight dimensional properties were found.');
    }
    return result;
  } finally {
    api.CloseModel(modelID);
  }
}
