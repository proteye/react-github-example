import React from 'react';
import { Select } from 'antd';
import {SelectOption} from "./types";

const { Option } = Select;

type Props = {
  items?: Array<SelectOption>;
  loading?: boolean;
  onChange: (value: string) => void;
};

function DropdownSelect(props: Props) {
  return (
    <Select onChange={props.onChange} loading={props.loading} placeholder="Filter by license" size="large" style={{ width: '100%' }} allowClear>
      {props.items?.map((item) => <Option key={item.id} value={item.key}>{item.name}</Option>)}
    </Select>
  );
}

export default DropdownSelect;
