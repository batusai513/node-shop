import React from 'react';
import UpdateItem from '../../../components/UpdateItem';
import { withApollo } from '../../../utils/apollo';

function ItemUpdate() {
  return <UpdateItem />;
}

export default withApollo({ ssr: true })(ItemUpdate);
