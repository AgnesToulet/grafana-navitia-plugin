import { DataSourcePlugin } from '@grafana/data';
import { DataSource } from './DataSource';
import { ConfigEditor } from './ConfigEditor';
import { QueryEditor } from './QueryEditor';
import { NavitiaQuery, NavitiaOptions } from './types';

export const plugin = new DataSourcePlugin<DataSource, NavitiaQuery, NavitiaOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);
