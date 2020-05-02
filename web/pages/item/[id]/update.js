import React from 'react';
import UpdateItem from '../../../components/UpdateItem';
import { withApollo } from '../../../utils/apollo';
import Page from '../../../components/Page/Page';

function ItemUpdate() {
  return (
    <Page>
      <UpdateItem />
    </Page>
  );
}

export default withApollo({ ssr: true })(ItemUpdate);
