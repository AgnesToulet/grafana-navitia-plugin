import defaults from 'lodash/defaults';

import React, { ChangeEvent, PureComponent } from 'react';
import { FormLabel, FormField, Select } from '@grafana/ui';
import { SelectableValue, QueryEditorProps } from '@grafana/data';
import { DataSource } from './DataSource';
import { NavitiaQuery, NavitiaObjectTypes, NavitiaQueryFormat, NavitiaQueryType, NavitiaOptions, defaultQuery } from './types';

const TYPE_OPTIONS: Array<SelectableValue<NavitiaQueryType>> = [
  { label: 'Places Nearby', value: NavitiaQueryType.PlacesNearby },
];

const FORMAT_OPTIONS: Array<SelectableValue<NavitiaQueryFormat>> = [
  { label: 'Time series', value: NavitiaQueryFormat.TimeSeries },
  { label: 'Table', value: NavitiaQueryFormat.Table },
  { label: 'World Map', value: NavitiaQueryFormat.WorldMap },
];

const FILTER_OBJECT_TYPE_OPTIONS: Array<SelectableValue<NavitiaObjectTypes>> = [
  { label: 'Points of Interest', value: NavitiaObjectTypes.POI },
  { label: 'Stop Areas', value: NavitiaObjectTypes.StopArea },
  { label: 'Stop Points', value: NavitiaObjectTypes.StopPoint },
  { label: 'Administrative Regions', value: NavitiaObjectTypes.AdministrativeRegion },
];

type Props = QueryEditorProps<DataSource, NavitiaQuery, NavitiaOptions>;

interface State {}

export class QueryEditor extends PureComponent<Props, State> {
  getSelectedType = () => {
    return TYPE_OPTIONS.find(v => v.value === this.props.query.type)
  }

  getSelectedFormat = () => {
    return FORMAT_OPTIONS.find(v => v.value === this.props.query.format)
  }

  getSelectedObjectTypeFilter = () => {
    return FILTER_OBJECT_TYPE_OPTIONS.find(v => v.value === this.props.query.filterObjectType)
  }

  onChange(query: NavitiaQuery) {
    const { onChange, onRunQuery } = this.props;
    onChange(query);
    onRunQuery();
  }

  onTypeChanged = (option: SelectableValue<NavitiaQueryType>) => {
    const { query } = this.props;
    this.onChange({ ...query, type: option.value || defaultQuery.type });
  }

  onFormatChanged = (option: SelectableValue<NavitiaQueryFormat>) => {
    const { query } = this.props;
    this.onChange({ ...query, format: option.value });
  }

  onObjectTypeFilterChanged = (option: SelectableValue<NavitiaObjectTypes>) => {
    const { query } = this.props;
    this.onChange({ ...query, filterObjectType: option.value });
  }

  onDistanceChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const { query } = this.props;
    this.onChange({ ...query, distance: parseInt(event.target.value) });
  }

  onCountChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const { query } = this.props;
    this.onChange({ ...query, count: parseInt(event.target.value) });
  }

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { distance, count } = query;
    // let options;
    // const selectedType = this.getSelectedType()
    // if (selectedType) {
    //   switch (selectedType.value) {
    //     case NavitiaQueryType.PlacesNearby:
    //       options = (
    //         <FormField width={4} value={distance} onChange={this.onDistanceChanged} label="Distance" type="select" step="100"></FormField>
    //         <FormField width={4} value={count} onChange={this.onCountChanged} label="Count" type="select" step="10"></FormField>
    //       )
    //       break;
    //   }
    // }

    return (
      <div className="gf-form">
        <FormLabel width={5}>Type</FormLabel>
        <Select
          isSearchable={false}
          width={10}
          value={this.getSelectedType()}
          options={TYPE_OPTIONS}
          onChange={this.onTypeChanged}
          className="gf-form-select"
        />
        <FormLabel width={5}>Format</FormLabel>
        <Select
          isSearchable={false}
          width={10}
          value={this.getSelectedFormat()}
          options={FORMAT_OPTIONS}
          onChange={this.onFormatChanged}
          className="gf-form-select"
        />
        <FormField width={4} value={distance} onChange={this.onDistanceChanged} label="Distance" type="select" step="100"></FormField>
        <FormField width={4} value={count} onChange={this.onCountChanged} label="Count" type="select" step="10"></FormField>
        <FormLabel width={5}>Object Types Filter</FormLabel>
        <Select
          isSearchable={false}
          width={10}
          value={this.getSelectedObjectTypeFilter()}
          options={FILTER_OBJECT_TYPE_OPTIONS}
          onChange={this.onObjectTypeFilterChanged}
          className="gf-form-select"
        />
        {/* <FormField width={4} value={itemsPerSchedule} onChange={this.onItemsPerScheduleChange} label="Constant" type="select" step="1"></FormField> */}
      </div>
    );
  }
}
