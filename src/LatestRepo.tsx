import React from 'react';
import moment from 'moment';
import {useQuery} from '@apollo/client';
import {Row, Col, Empty} from 'antd';
import {Table} from 'antd';
import Loader from "./Loader";
import { GET_REPOSITORIES/*, GET_LICENSES*/ } from './query';

const DEFAULT_COUNT = 10;

interface Repository {
  key: string;
  id: string;
  name: string;
  owner: {login: string};
  licenseInfo: {name: string},
  stargazers: {totalCount: string},
  description: string;
}

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

// function licensesDropdown() {
// }

function LatestRepo() {
  // const { loading: licensesLoading, data: licensesData } = useQuery(GET_LICENSES);
  const {loading, error, data} = useQuery(GET_REPOSITORIES, {
    variables: {
      query: 'language: Javascript',
      first: DEFAULT_COUNT
    },
  });

  if (loading) {
    return <Loader/>;
  }

  const items = data?.search?.nodes || [];

  if (!error && !items.length) {
    return empty();
  }

  return (
    <Row>
      <Col span={24}>
        {!error && table(items)}
        {error && errorBlock(error)}
      </Col>
    </Row>
  );
}

export default LatestRepo;
