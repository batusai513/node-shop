import React from 'react';
import Items from '../components/Items';
import { withApollo } from '../utils/apollo';
import Page from '../components/Page/Page';

function Home() {
  return (
    <Page>
      <Items />
    </Page>
  );
}

export default withApollo({ ssr: true })(Home);
