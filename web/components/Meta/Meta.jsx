import React from 'react';
import Head from 'next/head';

export default function Meta() {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="/nprogress.css" />
      <title>Sick Fits!</title>
    </Head>
  );
}
