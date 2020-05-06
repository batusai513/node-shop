import React from 'react';
import CreateItem from '../components/CreateItem';
import { withApollo } from '../utils/create_client';
import Page from '../components/Page/Page';
import PleaseSignin from '../components/PleaseSignin';

function Sell() {
  return (
    <Page>
      <PleaseSignin>
        <CreateItem />
      </PleaseSignin>
    </Page>
  );
}

export default withApollo(Sell);
