import React from 'react';
import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: '',
    },
  });

  return forward(operation);
});

export function createClient(initialState, ctx) {
  const headers = ctx?.req?.headers ?? {};
  const client = new ApolloClient({
    ssrMode: Boolean(true),
    cache: new InMemoryCache().restore(initialState),
    link: concat(
      authMiddleware,
      new HttpLink({
        uri: 'http://localhost:4000/graphql',
        credentials: 'include',
        headers,
      }),
    ),
  });

  return client;
}

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      cache: new InMemoryCache().restore(initialState),
      link: concat(authMiddleware, httpLink),
    });
  },
  {
    render({ Page, props }) {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  },
);
// export default withApollo(createClient);
