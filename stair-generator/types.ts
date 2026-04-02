export type Point3 = [number, number, number];

/**
 * Axis-aligned bounding box in IFC coordinates (before Y-up conversion).
 * Values are in meters.
 */
export interface StairBBox {
  name: string;
  expressID: number;
  source: 'IfcStair' | 'IfcStairFlight';
  min: Point3;
  max: Point3;
}

/**
 * Properties extracted from `Pset_StairFlightCommon` (or entity fallback).
 * All dimensions are expressed in meters.
 */
export interface StairFlightProperties {
  /** Express ID of the `IfcStairFlight`. */
  expressID: number;
  /** Human-readable element label from IFC `Name`. */
  name: string;
  /** `NumberOfRiser` from property sets. */
  numberOfRisers: number | null;
  /** `NumberOfTreads` from property sets. */
  numberOfTreads: number | null;
  /** `RiserHeight` from property sets. */
  riserHeight: number | null;
  /** `TreadLength` from property sets. */
  treadLength: number | null;
  /** `WalkingLineOffset` from property sets. */
  walkingLineOffset: number | null;
  /** `NosingLength` from property sets. */
  nosingLength: number | null;
  /** Derived flight rise (`riserHeight * numberOfRisers`). */
  flightHeight: number | null;
}

/**
 * Aggregated dimensions for one `IfcStair` and its child flights.
 */
export interface StairSummary {
  /** Express ID of the `IfcStair`. */
  expressID: number;
  /** Human-readable stair label from IFC `Name`. */
  name: string;
  /** Child `IfcStairFlight` express IDs linked through `IfcRelAggregates`. */
  flights: number[];
  /** Derived stair rise in meters from grouped flights. */
  totalHeight: number | null;
  /** Plan extents in meters from grouped flight bounding boxes. */
  planExtent: { width: number; depth: number } | null;
}

export interface StairGeometryData {
  axisPolylines: Point3[][];
  footprintPolylines: Point3[][];
  boundingBoxes: StairBBox[];
  /** Key: `IfcStairFlight` express ID. */
  flightProperties: Map<number, StairFlightProperties>;
  /** One summary per `IfcStair`. */
  stairSummaries: StairSummary[];
  warnings: string[];
}
