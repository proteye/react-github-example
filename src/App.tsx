import React from 'react';
import {ApolloProvider} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import config from './config';
import './App.scss';

import BaseLayout from "./BaseLayout";
import LatestRepo from "./LatestRepo";

const client = new ApolloClient({
  uri: config.serverUri,
  cache: new InMemoryCache(),
  headers: {
    'Authorization': `Bearer ${config.token}`,
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BaseLayout>
          <LatestRepo/>
        </BaseLayout>
      </div>
    </ApolloProvider>
  );
}

export default App;
