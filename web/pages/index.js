import React from 'react';
import Items from '../components/Items';
import { withApollo } from '../utils/create_client';
import Page from '../components/Page/Page';

function Home() {
  return (
    <Page>
      <Items />
    </Page>
  );
}

export default withApollo(Home);
