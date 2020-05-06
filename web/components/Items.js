import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Item from './Item';
import ALL_ITEMS_QUERY from '../graphql/item/getItems.graphql';
import Pagination from '../components/Pagination';

export default function Items() {
  const pageCount = 4;
  const { query } = useRouter();
  const page = query.page ?? 1;
  const { loading, data: { getItems = {} } = {}, error } = useQuery(
    ALL_ITEMS_QUERY,
    {
      variables: {
        skip: page * pageCount - pageCount,
        first: pageCount,
      },
      fetchPolicy: 'network-only',
    },
  );

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (getItems.items) {
    const count = getItems.meta.count;
    return (
      <React.Fragment>
        {/*<Pagination
          count={count}
          pageCount={pageCount}
          page={parseInt(page, 10)}
        ></Pagination>*/}
        <ItemList>
          {getItems.items.map((item) => {
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
        <Pagination
          count={count}
          pageCount={pageCount}
          page={parseInt(page, 10)}
        />
      </React.Fragment>
    );
  }

  return null;
}

const ItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
`;
