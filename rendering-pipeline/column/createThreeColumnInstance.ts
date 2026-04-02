/**
 * Three-column integration factory.
 * Composes: column domain instance + domain geometry -> descriptor -> Three adapter.
 */

import {
  createInstance as createDomainColumnInstance,
  type CreateColumnInstanceParams,
  type IFCColumnElement
} from '../../column-generator';
import type { BuildColumnParams, ColumnParams, SolidColumnInstance, SolidColumnUserData } from '../../column-generator/types';
import { buildColumn } from '../../column-generator/buildColumn';
import { create as createFromDescriptor } from '../../engine-adapter/three-js-adapter';
import { columnDomainToGeometryDescriptor } from './columnDomainToGeometryDescriptor';

function hasBuildableColumn(column: ColumnParams | undefined): column is ColumnParams {
  if (!column || !column.placement || !column.size) return false;
  return column.size.w > 0 && column.size.h > 0 && column.size.l > 0;
}

function toBuildParams(instance: SolidColumnInstance): BuildColumnParams | null {
  const userData = instance.userData as SolidColumnUserData;
  if (!hasBuildableColumn(userData.column)) return null;
  return {
    column: userData.column,
    task: userData.task
  };
}

function createEmptyVisualInstance(userData: SolidColumnUserData) {
  const group = createFromDescriptor(
    { meshes: [] },
    { position: { x: 0, y: 0, z: 0 }, rotation: { yaw: 0 } }
  );
  group.name = 'SolidColumn_Empty';
  group.userData = userData as unknown as Record<string, unknown>;
  return group;
}

export function createThreeColumnInstance(
  ifcElement?: IFCColumnElement,
  params?: CreateColumnInstanceParams
) {
  const domainInstance = createDomainColumnInstance(ifcElement, params);
  const buildParams = toBuildParams(domainInstance);
  if (!buildParams) {
    return createEmptyVisualInstance(domainInstance.userData);
  }

  const domainBuild = buildColumn(buildParams);
  const descriptor = columnDomainToGeometryDescriptor(domainBuild.geometry);
  const group = createFromDescriptor(descriptor, domainBuild.pose);
  group.name = 'Column';
  group.userData = domainInstance.userData as unknown as Record<string, unknown>;
  return group;
}
