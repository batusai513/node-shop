import React from 'react';
import CreateItem from '../components/CreateItem';
import { withApollo } from '../utils/apollo';

function Sell() {
  return <CreateItem />;
}

export default withApollo()(Sell);
