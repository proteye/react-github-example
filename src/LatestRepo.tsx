import React from 'react';
import moment from 'moment';
import {useQuery} from '@apollo/client';
import {Row, Col, Empty} from 'antd';
import {Table} from 'antd';
import Loader from "./Loader";
import SearchInput from "./SearchInput";
import DropdownSelect from "./DropdownSelect";
import {Repository} from './types';
import {GET_REPOSITORIES, GET_LICENSES} from './query';

const DEFAULT_COUNT = 10;

const columns = [
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  //   key: 'id',
  // },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
    key: 'owner',
  },
  {
    title: 'License',
    dataIndex: 'license',
    key: 'license',
  },
  {
    title: 'Last update',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (date: string) => moment(date).format('DD.MM.YYYY'),
  },
  {
    title: 'Created',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: string) => moment(date).format('DD.MM.YYYY'),
  },
  {
    title: 'Stars',
    dataIndex: 'stars',
    key: 'stars',
    render: (text: string) => <span>{text}&nbsp;★</span>,
  },
];

function convertNodes(items: Array<Repository> = []) {
  return items.map((item) => {
    return Object.assign({}, item, {
      key: item.id,
      owner: item.owner.login,
      license: item.licenseInfo?.name,
      stars: item.stargazers?.totalCount,
    });
  });
}

function errorBlock(err: Object) {
  return <p style={{color: 'red'}}>{err.toString()}</p>;
}

function empty() {
  return <div className="Loader"><Empty/></div>;
}

function table(items: Array<Repository> = []) {
  return <Table columns={columns} dataSource={convertNodes(items)}
                pagination={{position: ['topLeft', 'bottomRight']}}/>;
}

function LatestRepo() {
  const { loading: licensesLoading, data: licensesData } = useQuery(GET_LICENSES);
  const {loading, error, data} = useQuery(GET_REPOSITORIES, {
    variables: {
      query: 'language: Javascript',
      first: DEFAULT_COUNT
    },
  });

  const items = data?.search?.nodes || [];

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={12} xs={24} sm={12}>
          <SearchInput loading={loading} onSearch={(v) => console.log('v', v)}/>
        </Col>
        <Col span={6} xs={{ span: 24, offset: 0 }} sm={{ span: 6, offset: 6 }} offset={6}>
          <DropdownSelect loading={licensesLoading} items={licensesData?.licenses} onChange={(v) => console.log('v', v)}/>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {!error && items.length > 0 && table(items)}
          {!error && items.length === 0 && empty()}
          {error && errorBlock(error)}
          {loading && <Loader/>}
        </Col>
      </Row>
    </>
  );
}

export default LatestRepo;
