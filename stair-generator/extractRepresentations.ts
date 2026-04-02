import {
  IFCCOMPOSITECURVE,
  IFCGEOMETRICSET,
  IFCPOLYLINE,
} from 'web-ifc';
import type { Point3 } from './types';

interface WebIfcApiLike {
  GetLine: (modelID: number, expressID: number, flatten?: boolean) => any;
}

function getRef(value: unknown): number | null {
  if (typeof value === 'number') return value;
  if (value && typeof value === 'object' && 'value' in value) {
    const raw = (value as { value: unknown }).value;
    return typeof raw === 'number' ? raw : null;
  }
  return null;
}

function getText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'value' in value) {
    const raw = (value as { value: unknown }).value;
    return typeof raw === 'string' ? raw : '';
  }
  return '';
}

function getNumericArray(values: unknown): number[] {
  if (!Array.isArray(values)) return [];
  return values.map((entry: unknown) => {
    if (typeof entry === 'number') return entry;
    if (entry && typeof entry === 'object' && 'value' in entry) {
      const value = (entry as { value: unknown }).value;
      return typeof value === 'number' ? value : 0;
    }
    return 0;
  });
}

function readPolyline(
  api: WebIfcApiLike,
  modelID: number,
  polylineId: number
): Point3[] {
  const polyline = api.GetLine(modelID, polylineId, false);
  if (!polyline || !Array.isArray(polyline.Points)) return [];

  const result: Point3[] = [];
  for (const pointRef of polyline.Points) {
    const pointId = getRef(pointRef);
    if (!pointId) continue;
    const point = api.GetLine(modelID, pointId, false);
    const coords = getNumericArray(point?.Coordinates);
    if (coords.length === 0) continue;
    result.push([coords[0] ?? 0, coords[1] ?? 0, coords[2] ?? 0]);
  }
  return result;
}

function readCurveItem(
  api: WebIfcApiLike,
  modelID: number,
  itemId: number
): Point3[][] {
  const item = api.GetLine(modelID, itemId, false);
  if (!item) return [];

  if (item.type === IFCPOLYLINE) {
    const polyline = readPolyline(api, modelID, itemId);
    return polyline.length > 1 ? [polyline] : [];
  }

  if (item.type === IFCCOMPOSITECURVE) {
    const polylines: Point3[][] = [];
    const segments = Array.isArray(item.Segments) ? item.Segments : [];
    for (const segmentRef of segments) {
      const segmentId = getRef(segmentRef);
      if (!segmentId) continue;
      const segment = api.GetLine(modelID, segmentId, false);
      const parentCurveId = getRef(segment?.ParentCurve);
      if (!parentCurveId) continue;
      polylines.push(...readCurveItem(api, modelID, parentCurveId));
    }
    return polylines;
  }

  if (item.type === IFCGEOMETRICSET) {
    const polylines: Point3[][] = [];
    const elements = Array.isArray(item.Elements) ? item.Elements : [];
    for (const elementRef of elements) {
      const elementId = getRef(elementRef);
      if (!elementId) continue;
      polylines.push(...readCurveItem(api, modelID, elementId));
    }
    return polylines;
  }

  return [];
}

export interface ExtractedRepresentationPolylines {
  axis: Point3[][];
  footprint: Point3[][];
}

export function extractAxisAndFootprintPolylines(
  api: WebIfcApiLike,
  modelID: number,
  productLine: any
): ExtractedRepresentationPolylines {
  const output: ExtractedRepresentationPolylines = {
    axis: [],
    footprint: [],
  };

  const representationId = getRef(productLine?.Representation);
  if (!representationId) return output;

  const productDefinitionShape = api.GetLine(modelID, representationId, false);
  const representations = Array.isArray(productDefinitionShape?.Representations)
    ? productDefinitionShape.Representations
    : [];

  for (const representationRef of representations) {
    const shapeRepId = getRef(representationRef);
    if (!shapeRepId) continue;

    const shapeRep = api.GetLine(modelID, shapeRepId, false);
    const identifier = getText(shapeRep?.RepresentationIdentifier).toLowerCase();
    const items = Array.isArray(shapeRep?.Items) ? shapeRep.Items : [];

    for (const itemRef of items) {
      const itemId = getRef(itemRef);
      if (!itemId) continue;
      const polylines = readCurveItem(api, modelID, itemId);

      if (identifier === 'axis') {
        output.axis.push(...polylines);
      } else if (identifier === 'footprint') {
        output.footprint.push(...polylines);
      }
    }
  }

  return output;
}
