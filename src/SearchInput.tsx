import React from 'react';
import {Input} from 'antd';

const {Search} = Input;

type Props = {
  onSearch: (value: string) => void;
  loading?: boolean;
};

function SearchInput(props: Props) {
  return (
    <Search
      placeholder="Search repositories by name..."
      enterButton="Search"
      size="large"
      loading={props.loading}
      disabled={props.loading}
      onSearch={props.onSearch}
    />
  );
}

export default SearchInput;
