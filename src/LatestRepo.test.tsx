import React from 'react';
import moment from 'moment';
import {render, waitForElement} from '@testing-library/react';
import {act} from "react-dom/test-utils";
import {MockedProvider} from '@apollo/client/testing';
import LatestRepo, {DEFAULT_COUNT} from './LatestRepo';
import {GET_REPOSITORIES, GET_LICENSES} from './query';

const mocks = [
  {
    request: {
      query: GET_LICENSES,
    },
    result: {
      "data": {
        "licenses": [{
          "id": "MDc6TGljZW5zZTI=",
          "name": "Apache License 2.0",
          "key": "apache-2.0",
          "__typename": "License"
        }, {
          "id": "MDc6TGljZW5zZTQ=",
          "name": "BSD 2-Clause \"Simplified\" License",
          "key": "bsd-2-clause",
          "__typename": "License"
        }, {
          "id": "MDc6TGljZW5zZTEz",
          "name": "MIT License",
          "key": "mit",
          "__typename": "License"
        }, {
          "id": "MDc6TGljZW5zZTE1",
          "name": "The Unlicense",
          "key": "unlicense",
          "__typename": "License"
        }]
      }
    }
    ,
  },
  {
    request: {
      query: GET_REPOSITORIES,
      variables: {
        query: `language:javascript sort:stars-desc created:>${moment().subtract(1, 'month').format('YYYY-MM-DD')}`,
        first: DEFAULT_COUNT,
      },
    },
    result: {
      "data": {
        "search": {
          "repositoryCount": 347116,
          "pageInfo": {
            "endCursor": "Y3Vyc29yOjEw",
            "hasNextPage": true,
            "hasPreviousPage": false,
            "startCursor": "Y3Vyc29yOjE=",
            "__typename": "PageInfo"
          },
          "nodes": [{
            "id": "MDEwOlJlcG9zaXRvcnkyOTI3OTA4Mjk=",
            "name": "eleventy-high-performance-blog",
            "owner": {"login": "google", "__typename": "Organization"},
            "stargazers": {"totalCount": 2346, "__typename": "StargazerConnection"},
            "licenseInfo": {"name": "MIT License", "__typename": "License"},
            "description": "A high performance blog template for the 11ty static site generator.",
            "createdAt": "2020-09-04T08:16:00Z",
            "updatedAt": "2020-09-21T05:18:18Z",
            "__typename": "Repository"
          }, {
            "id": "MDEwOlJlcG9zaXRvcnkyOTM1NzAwMzQ=",
            "name": "react-portfolio",
            "owner": {"login": "CleverProgrammers", "__typename": "Organization"},
            "stargazers": {"totalCount": 922, "__typename": "StargazerConnection"},
            "licenseInfo": {"name": "MIT License", "__typename": "License"},
            "description": null,
            "createdAt": "2020-09-07T15:50:24Z",
            "updatedAt": "2020-09-21T04:38:32Z",
            "__typename": "Repository"
          }, {
            "id": "MDEwOlJlcG9zaXRvcnkyOTYxNjgyMDQ=",
            "name": "vue-lit",
            "owner": {"login": "yyx990803", "__typename": "User"},
            "stargazers": {"totalCount": 584, "__typename": "StargazerConnection"},
            "licenseInfo": null,
            "description": "Proof of concept custom elements \"framework\"",
            "createdAt": "2020-09-16T23:20:07Z",
            "updatedAt": "2020-09-21T05:44:36Z",
            "__typename": "Repository"
          }, {
            "id": "MDEwOlJlcG9zaXRvcnkyOTIwNTUyOTE=",
            "name": "10-projects-10-hours",
            "owner": {"login": "florinpop17", "__typename": "User"},
            "stargazers": {"totalCount": 421, "__typename": "StargazerConnection"},
            "licenseInfo": null,
            "description": null,
            "createdAt": "2020-09-01T16:50:40Z",
            "updatedAt": "2020-09-21T05:41:15Z",
            "__typename": "Repository"
          }, {
            "id": "MDEwOlJlcG9zaXRvcnkyOTQxOTE3NDI=",
            "name": "react-challenge-amazon-clone",
            "owner": {"login": "CleverProgrammers", "__typename": "Organization"},
            "stargazers": {"totalCount": 406, "__typename": "StargazerConnection"},
            "licenseInfo": null,
            "description": null,
            "createdAt": "2020-09-09T18:09:46Z",
            "updatedAt": "2020-09-21T05:03:58Z",
            "__typename": "Repository"
          }, {
            "id": "MDEwOlJlcG9zaXRvcnkyOTI2ODYzMzU=",
            "name": "minecraft-react",
            "owner": {"login": "satansdeer", "__typename": "User"},
            "stargazers": {"totalCount": 372, "__typename": "StargazerConnection"},
            "licenseInfo": null,
            "description": null,
            "createdAt": "2020-09-03T21:45:08Z",
            "updatedAt": "2020-09-21T06:04:48Z",
            "__typename": "Repository"
          }, {
            "id": "MDEwOlJlcG9zaXRvcnkyOTU4MzQ2MTc=",
            "name": "react-nil",
            "owner": {"login": "pmndrs", "__typename": "Organization"},
            "stargazers": {"totalCount": 341, "__typename": "StargazerConnection"},
            "licenseInfo": null,
            "description": "⃝ A react null renderer",
            "createdAt": "2020-09-15T19:53:38Z",
            "updatedAt": "2020-09-21T02:21:34Z",
            "__typename": "Repository"
          }, {
            "id": "MDEwOlJlcG9zaXRvcnkyOTUxMzg1MTM=",
            "name": "rumin-web-clipper",
            "owner": {"login": "jhlyeung", "__typename": "User"},
            "stargazers": {"totalCount": 339, "__typename": "StargazerConnection"},
            "licenseInfo": {"name": "MIT License", "__typename": "License"},
            "description": "Web clipper browser extension for saving highlights, screenshots, and automatically extracting content from web pages. ",
            "createdAt": "2020-09-13T11:38:13Z",
            "updatedAt": "2020-09-20T17:30:28Z",
            "__typename": "Repository"
          }, {
            "id": "MDEwOlJlcG9zaXRvcnkyOTAwMjgyOTQ=",
            "name": "lofi-player",
            "owner": {"login": "magenta", "__typename": "Organization"},
            "stargazers": {"totalCount": 289, "__typename": "StargazerConnection"},
            "licenseInfo": {"name": "Apache License 2.0", "__typename": "License"},
            "description": "🔥 Virtual room in your browser that lets you play with the Lo-Fi VIBE and relax",
            "createdAt": "2020-08-24T20:05:03Z",
            "updatedAt": "2020-09-20T21:26:42Z",
            "__typename": "Repository"
          }, {
            "id": "MDEwOlJlcG9zaXRvcnkyOTIwNzQ2MTc=",
            "name": "github-profile-summary-cards",
            "owner": {"login": "vn7n24fzkq", "__typename": "User"},
            "stargazers": {"totalCount": 269, "__typename": "StargazerConnection"},
            "licenseInfo": {"name": "MIT License", "__typename": "License"},
            "description": "A tool to generate your github summary card for profile README",
            "createdAt": "2020-09-01T18:19:20Z",
            "updatedAt": "2020-09-21T00:52:23Z",
            "__typename": "Repository"
          }],
          "__typename": "SearchResultItemConnection"
        }
      }
    },
  },
];

test('should render loading state initially', async () => {
  const {getByTestId} = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LatestRepo/>
    </MockedProvider>,
  );

  const loader = await waitForElement(() => getByTestId('loader'));
  expect(loader).toBeInTheDocument();
});

test('should render the table of repositories', async () => {
  const {getByText} = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LatestRepo/>
    </MockedProvider>,
  );

  await act(() => {
    // wait for response
    return new Promise(resolve => setTimeout(resolve, 0));
  });

  const firstRecord = getByText(/eleventy-high-performance-blog/i);
  const lastRecord = getByText(/github-profile-summary-cards/i);

  expect(firstRecord).toBeInTheDocument();
  expect(lastRecord).toBeInTheDocument();
});
