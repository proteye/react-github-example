import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import {useQuery} from '@apollo/client';
import {Row, Col, Empty} from 'antd';
import {Table} from 'antd';
import {Breakpoint} from "antd/es/_util/responsiveObserve";
import {TablePaginationConfig} from "antd/es/table";
import Loader from "./Loader";
import SearchInput from "./SearchInput";
import DropdownSelect from "./DropdownSelect";
import {Repository, QueryVariables, PaginationValue} from './types';
import {GET_REPOSITORIES, GET_LICENSES} from './query';

const DEFAULT_COUNT = 10;

interface TableProps {
  items: Array<Repository>;
  total?: Number;
  currentPage?: Number;
  onPaginationChange?: (page: Number, pageSize: Number) => void;
}

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

function table(props: TableProps) {
  const paginationParams = {
    current: props.currentPage,
    position: ['topLeft', 'bottomRight'],
    defaultPageSize: 10,
    total: props.total || 0,
    responsive: true,
    simple: true,
    onChange: props.onPaginationChange,
  } as TablePaginationConfig;

  return <Table columns={columns} dataSource={convertNodes(props.items)} pagination={paginationParams}/>;
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
  const [pagination, setPagination] = useState<PaginationValue>({current: 1, previous: 1});
  const [query, setQuery] = useState(getQueryBy({}));

  const {loading: licensesLoading, data: licensesData} = useQuery(GET_LICENSES);
  const {loading, error, data, refetch} = useQuery<any, QueryVariables>(GET_REPOSITORIES, {
    variables: {
      query,
      first: DEFAULT_COUNT,
    },
    notifyOnNetworkStatusChange: true,
  });
  const repoItems = data?.search?.nodes || [];
  const repositoryCount = data?.search?.repositoryCount || 0;
  const pageInfo = data?.search?.pageInfo || {};

  useEffect(() => setQuery(getQueryBy({search, license})), [search, license]);
  useEffect(() => {
    refetch({query, first: DEFAULT_COUNT, last: undefined, after: undefined, before: undefined});
    setPagination({current: 1, previous: 1});
  }, [query, refetch]);

  const handleSearch = useCallback((value: string) => setSearch(value), []);
  const handleSelect = useCallback((value: string) => setLicense(value), []);
  const handlePaginationChange = useCallback((page: Number, pageSize: Number) => {
    const variables: QueryVariables = {query, first: undefined, last: undefined, after: undefined, before: undefined};
    if (page > pagination.current) {
      variables.first = DEFAULT_COUNT;
      variables.after = pageInfo.endCursor;
    } else {
      variables.last = DEFAULT_COUNT;
      variables.before = pageInfo.startCursor;
    }
    refetch(variables);
    setPagination({current: page, previous: pagination.current});
  }, [pagination, query, pageInfo, refetch]);

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
          {!error && repoItems.length > 0 && table({items: repoItems, total: repositoryCount, currentPage: pagination.current, onPaginationChange: handlePaginationChange})}
          {!error && !loading && repoItems.length === 0 && empty()}
          {error && errorBlock(error)}
          {loading && <Loader/>}
        </Col>
      </Row>
    </>
  );
}

export default LatestRepo;
