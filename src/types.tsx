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
