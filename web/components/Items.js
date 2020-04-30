import React from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Item from './Item';


const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    getItems {
      id
      title
      price
      description
      image
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
      <ItemList>
        {data.getItems.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          );
        })}
      </ItemList>
    );
  }
}

const ItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
`;
