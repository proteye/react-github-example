export interface Repository {
  key: string;
  id: string;
  name: string;
  owner: { login: string };
  licenseInfo: { name: string },
  stargazers: { totalCount: string },
  description: string;
}

export interface SelectOption {
  id?: string;
  key: string;
  name: string;
}

export interface PageInfo {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface QueryVariables {
  query?: String;
  first?: Number;
  last?: Number;
  after?: String;
  before?: String;
}

export interface PaginationValue {
  current: Number;
  previous: Number;
}
