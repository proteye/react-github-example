import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import {useQuery} from '@apollo/client';
import {Row, Col, Empty} from 'antd';
import {Table} from 'antd';
import Loader from "./Loader";
import SearchInput from "./SearchInput";
import DropdownSelect from "./DropdownSelect";
import {Repository} from './types';
import {GET_REPOSITORIES, GET_LICENSES} from './query';
import {Breakpoint} from "antd/es/_util/responsiveObserve";

const DEFAULT_COUNT = 10;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <div className="App-shrink-text">{text}</div>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    responsive: ['lg'] as Breakpoint[],
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
    key: 'owner',
    responsive: ['md'] as Breakpoint[],
  },
  {
    title: 'License',
    dataIndex: 'license',
    key: 'license',
    responsive: ['md'] as Breakpoint[],
  },
  {
    title: 'Last update',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (date: string) => moment(date).format('DD.MM.YYYY'),
    responsive: ['lg'] as Breakpoint[],
  },
  {
    title: 'Created',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: string) => moment(date).format('DD.MM.YYYY'),
    responsive: ['lg'] as Breakpoint[],
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

function getQueryBy(params: { search?: string, license?: string }) {
  const query = [
    'language:javascript',
    'sort:stars-desc',
    `created:>${moment().subtract(1, 'month').format('YYYY-MM-DD')}`,
  ];
  if (params.license) {
    query.push(`license:${params.license}`);
  }
  if (params.search) {
    query.push(params.search);
  }
  return query.join(' ');
}

function LatestRepo() {
  const [search, setSearch] = useState('');
  const [license, setLicense] = useState('');
  const [query, setQuery] = useState(getQueryBy({}));

  const {loading: licensesLoading, data: licensesData} = useQuery(GET_LICENSES);
  const {loading, error, data, refetch} = useQuery(GET_REPOSITORIES, {
    variables: {
      query,
      first: DEFAULT_COUNT,
    },
  });
  const repoItems = data?.search?.nodes || [];

  useEffect(() => setQuery(getQueryBy({search, license})), [search, license]);
  useEffect(() => {
    refetch({query, first: DEFAULT_COUNT});
  }, [query, refetch]);

  const handleSearch = useCallback((value: string) => setSearch(value), []);
  const handleSelect = useCallback((value: string) => setLicense(value), []);

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={12} xs={24} sm={12}>
          <SearchInput loading={loading} onSearch={handleSearch}/>
        </Col>
        <Col span={6} xs={{span: 24, offset: 0}} sm={{span: 6, offset: 6}} offset={6}>
          <DropdownSelect loading={licensesLoading} items={licensesData?.licenses} onChange={handleSelect}/>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {!error && repoItems.length > 0 && table(repoItems)}
          {!error && !loading && repoItems.length === 0 && empty()}
          {error && errorBlock(error)}
          {loading && <Loader/>}
        </Col>
      </Row>
    </>
  );
}

export default LatestRepo;
