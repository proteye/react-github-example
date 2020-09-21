import React from 'react';
import {Space, Spin} from 'antd';
import './Loader.scss';

function Loader() {
  return (
    <div className="Loader" data-testid="loader">
      <Space size="large">
        <Spin size="large"/>
      </Space>
    </div>
  );
}

export default Loader;
