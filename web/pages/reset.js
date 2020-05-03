import React from 'react';
import { withApollo } from '../utils/apollo';
import Page from '../components/Page/Page';
import ResetPassword from '../components/ResetPassword';

function ResetPage() {
  return (
    <Page>
      <ResetPassword />
    </Page>
  );
}

export default withApollo({ ssr: true })(ResetPage);
