import React from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    getItems {
      id
      title
    }
  }
`;

export default function Items() {
  const { loading, data, error } = useQuery(ALL_ITEMS_QUERY, {
    fetchPolicy: 'network-only',
  });
  if (loading) {
    return <h1>Loading</h1>;
  }
  if (data && data.getItems) {
    return (
      <div>
        {data.getItems.map((item) => {
          return <div key={item.id}>{item.title}</div>;
        })}
      </div>
    );
  }
}
