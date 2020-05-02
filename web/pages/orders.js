import React from 'react';
import { withApollo } from '../utils/apollo';
import Page from '../components/Page/Page';

function Orders() {
  return <Page>'orders'</Page>;
}

export default withApollo({ ssr: true })(Orders);
