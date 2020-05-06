import React from 'react';
import _withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import CART_OPEN_QUERY from '../graphql/client/cartOpen.graphql';

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: '',
    },
  });

  return forward(operation);
});

function _createClient(initialState, headers) {
  const cache = new InMemoryCache().restore(initialState);
  cache.writeQuery({
    query: CART_OPEN_QUERY,
    data: {
      cartOpen: false,
    },
  });
  const client = new ApolloClient({
    cache,
    ssrMode: Boolean(true),
    link: concat(
      authMiddleware,
      new HttpLink({
        uri: 'http://localhost:4000/graphql',
        credentials: 'include',
        headers,
      }),
    ),
    resolvers: {
      Query: {
        cartOpen(_, __, { cache }) {
          const { cartOpen } = cache.readQuery({ query: CART_OPEN_QUERY });
          return cartOpen;
        },
      },
      Mutation: {
        toggleCart(_, __, { cache }) {
          const { cartOpen } = cache.readQuery({ query: CART_OPEN_QUERY });
          const resolved = {
            cartOpen: !cartOpen,
          };
          cache.writeQuery({ query: CART_OPEN_QUERY, data: resolved });
          return resolved;
        },
      },
    },
  });

  return client;
}

export function createClient(initialState, ctx) {
  const headers = ctx?.req?.headers ?? {};
  const client = _createClient(initialState, headers);

  return client;
}

export const withApollo = _withApollo(
  ({ initialState, headers, ctx }) => {
    return _createClient(initialState, headers);
  },
  {
    getDataFromTree,
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
