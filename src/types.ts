import { DataQuery, DataSourceJsonData } from '@grafana/data';

/**
 * These are options configured for each DataSource instance
 */
export interface NavitiaOptions extends DataSourceJsonData {
  apiUrl?: string;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface NavitiaSecureJsonData {
  apiKey: string;
}

export enum NavitiaQueryFormat {
  TimeSeries = 'time_series',
  Table = 'table',
  WorldMap = 'worldmap',
}

export enum NavitiaQueryType {
  PlacesNearby = 'places_nearby',
}

export enum NavitiaObjectTypes {
  POI = 'poi',
  StopArea = 'stop_area',
  StopPoint = 'stop_point',
  AdministrativeRegion = 'administrative_region'
}

export interface NavitiaQuery extends DataQuery {
  type?: NavitiaQueryType;
  format?: NavitiaQueryFormat;
  distance?: number;
  count?: number;
  filterObjectType?: NavitiaObjectTypes;
}

export const defaultQuery: Partial<NavitiaQuery> = {
  type: NavitiaQueryType.PlacesNearby,
  format: NavitiaQueryFormat.WorldMap,
  distance: 1000,
  count: 100,
}
