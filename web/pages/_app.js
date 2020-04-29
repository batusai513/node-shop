import React from 'react';
import Page from '../components/Page/Page';
import withData from '../utils/create_client';
// import { ApolloProvider } from '@apollo/react-hooks';

export default function App({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

// export default withData(App);
