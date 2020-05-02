import React from 'react';
import withData from '../utils/create_client';
// import { ApolloProvider } from '@apollo/react-hooks';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// export default withData(App);
