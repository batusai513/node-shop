import React from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import GET_SINGLE_ITEM_QUERY from '../graphql/item/getItem.graphql';

const SingleItemStyles = styled.article`
  max-width: 1200px;
  margin: 20px auto;
  box-shadow: ${(props) => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 30px;
    font-size: 20px;
  }
`;

export default function SingleItem() {
  const { query } = useRouter();
  const { data, loading, error } = useQuery(GET_SINGLE_ITEM_QUERY, {
    variables: { id: query.id },
  });
  const item = data?.getItem;

  if (loading) {
    return <h1>loading...</h1>;
  }

  if (!item && !loading) {
    return <h1>Item not found</h1>;
  }
  return (
    <SingleItemStyles>
      <Head>
        <title>Sick Fits | {item.title}</title>
      </Head>
      <img src={item.largeImage} alt={item.title} />
      <div className="details">
        <h2>Viewing {item.title}</h2>
        <p>{item.description}</p>
      </div>
    </SingleItemStyles>
  );
}
