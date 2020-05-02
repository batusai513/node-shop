import React from 'react';
import styled from 'styled-components';
import Signup from '../components/Signup';
import { withApollo } from '../utils/apollo';
import Page from '../components/Page/Page';


const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 10px;
`;

function SignupPage() {
  return (
    <Page>
      <Columns>
        <Signup />
        <Signup />
        <Signup />
      </Columns>
    </Page>
  );
}

export default withApollo()(SignupPage);
