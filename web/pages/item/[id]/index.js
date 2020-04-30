import React from 'react';
import SingleItem from '../../../components/SingleItem';
import { withApollo } from '../../../utils/apollo';

function Item() {
  return <SingleItem />;
}

export default withApollo({ ssr: true })(Item);
