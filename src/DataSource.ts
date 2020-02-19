import { DataQueryRequest, DataQueryResponse, DataSourceApi, DataSourceInstanceSettings, TableData } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';

import { NavitiaQuery, NavitiaOptions } from './types';

export class DataSource extends DataSourceApi<NavitiaQuery, NavitiaOptions> {

  apiUrl: string;

  constructor(instanceSettings: DataSourceInstanceSettings<NavitiaOptions>) {
    super(instanceSettings);

    this.apiUrl = instanceSettings.url || 'https://api.navitia.io/v1';
  }

  async query(options: DataQueryRequest<NavitiaQuery>): Promise<DataQueryResponse> {
    const data: TableData[] = [];
    
    for (let i = 0; i < options.targets.length; i++) {
      const target = options.targets[i]
      let urlOptions = `?distance=${target.distance}&count=${target.count}`
      if (target.filterObjectType) {
        urlOptions += `&type[]=${target.filterObjectType}`
      }
      const response = await getBackendSrv().datasourceRequest({
        url: `${this.apiUrl}/navitia/coverage/fr-idf/places/admin:fr:75056/places_nearby${urlOptions}`,
        method: 'GET'
      });
      console.log('response', response)

      const table: TableData = {
        type: 'table',
        columns: [
          { text: 'value' },
          { text: 'name' },
          { text: 'latitude' },
          { text: 'longitude' },
        ],
        rows: []
      };

      if (response.data && response.data.places_nearby) {
        response.data.places_nearby.map((place: any) => {
          const row = [
            10,
            place[place.embedded_type].name,
            place[place.embedded_type].coord.lat,
            place[place.embedded_type].coord.lon,
          ];
          table.rows.push(row);
        });
      }

      data.push(table);
    }

    console.log('data', data)

    return { data };
  }

  async testDatasource() {
    try {
      const response = await getBackendSrv().datasourceRequest({
        url: `${this.apiUrl}/navitia/coord/2.377310;48.847002`,
        method: 'GET'
      });
      console.log('response', response)
      return { status: 'success', message: 'API Connection OK' };
    } catch (error) {
      console.log(error);
      if (error.data && error.data.message) {
        return { status: 'error', message: error.data.message };
      } else {
        return { status: 'error', message: error.status };
      }
    }
  }
}
