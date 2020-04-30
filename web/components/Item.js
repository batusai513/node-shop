import React from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import { gql } from '@apollo/client';
import ItemStyles from './styles/Item';
import TitleStyles from './styles/Title';
import PriceTag from './styles/PriceTag';
import { formatMoney } from '../utils/format';

const REMOVE_ITEM_MUTATION = gql`
  mutation removeItem($id: ID!) {
    removeItem(id: $id) {
      id
    }
  }
`;

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

export default function Item({ id, title, price, description, image }) {
  const [removeItem, {}] = useMutation(REMOVE_ITEM_MUTATION, {
    variables: { id },
    update(store, { data: { removeItem } }) {
      debugger;
      const data = store.readQuery({ query: ALL_ITEMS_QUERY });
      const getItems = data.getItems.filter(
        (item) => item.id !== removeItem.id
      );
      store.writeQuery({ query: ALL_ITEMS_QUERY, data: { getItems } });
    },
    // refetchQueries: [
    //   {
    //     query: ALL_ITEMS_QUERY,
    //   },
    // ],
  });
  return (
    <ItemStyles>
      {image ? <img src={image} alt={title} /> : null}
      <TitleStyles>
        <Link href="/item/[id]" as={`/item/${id}`}>
          <a>{title}</a>
        </Link>
      </TitleStyles>
      <PriceTag>{formatMoney({}, price)}</PriceTag>
      <p>{description}</p>
      <div className="buttonList">
        <Link href="/item/[id]/update" as={`/item/${id}/update`}>
          <a>Edit ✏️</a>
        </Link>
        <button>Add to Cart</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (confirm('Do you wish to delete this item')) {
              removeItem();
            }
          }}>
          Delete{' '}
        </button>
      </div>
    </ItemStyles>
  );
}
