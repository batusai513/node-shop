import React from 'react';
import { withApollo } from '../utils/create_client';
import Page from '../components/Page/Page';
import PleaseSignin from '../components/PleaseSignin';
import Permissions from '../components/Permissions';

function PermissionsPage() {
  return (
    <Page>
      <PleaseSignin>
        <Permissions />
      </PleaseSignin>
    </Page>
  );
}

export default withApollo(PermissionsPage);
