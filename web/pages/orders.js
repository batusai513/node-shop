import React from 'react';
import { withApollo } from '../utils/create_client';
import Page from '../components/Page/Page';

function Orders() {
  return <Page>'orders'</Page>;
}

export default withApollo(Orders);
