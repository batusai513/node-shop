import React from 'react';
import CreateItem from '../components/CreateItem';
import { withApollo } from '../utils/apollo';
import Page from '../components/Page/Page';

function Sell() {
  return (
    <Page>
      <CreateItem />
    </Page>
  );
}

export default withApollo()(Sell);
