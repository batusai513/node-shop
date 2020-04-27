import React from 'react';
import Page from '../components/Page/Page';

export default function App({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
