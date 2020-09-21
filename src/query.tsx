import {gql} from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query ($query: String!, $first: Int, $last: Int, $after: String, $before: String) {
        search(type: REPOSITORY, query: $query, after: $after, before: $before, first: $first, last: $last) {
            repositoryCount
            pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
            }
            nodes {
                ... on Repository {
                    id
                    name
                    owner {
                        login
                    }
                    stargazers {
                        totalCount
                    }
                    licenseInfo {
                        name
                    }
                    description
                    createdAt
                    updatedAt
                }
            }
        }
    }
`;

export const GET_LICENSES = gql`
    {
        licenses {
            id
            name
            key
        }
    }
`;
