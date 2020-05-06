import React from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import ItemStyles from './styles/Item';
import TitleStyles from './styles/Title';
import PriceTag from './styles/PriceTag';
import AddToCart from './AddToCart';
import { formatMoney } from '../utils/format';
import REMOVE_ITEM_MUTATION from '../graphql/item/removeItem.graphql';

export default function Item({ id, title, price, description, image }) {
  const [removeItem] = useMutation(REMOVE_ITEM_MUTATION, {
    variables: { id },
    update(cache, { data: { removeItem } }) {
      cache.modify('ROOT_QUERY', {
        getItems({ items, ...rest }, { readField }) {
          return {
            ...rest,
            items: (items ?? []).filter((item) => {
              return id !== readField('id', item);
            }),
          };
        },
      });
      cache.evict(`Item:${id}`);
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
        <AddToCart itemId={id} />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (confirm('Do you wish to delete this item')) {
              removeItem();
            }
          }}
        >
          Delete{' '}
        </button>
      </div>
    </ItemStyles>
  );
}
