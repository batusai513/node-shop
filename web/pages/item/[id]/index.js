import React from 'react';
import SingleItem from '../../../components/SingleItem';
import { withApollo } from '../../../utils/apollo';
import Page from '../../../components/Page/Page';

function Item() {
  return (
    <Page>
      <SingleItem />
    </Page>
  );
}

export default withApollo({ ssr: true })(Item);
