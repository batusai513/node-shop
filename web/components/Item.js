import React from 'react';
import Link from 'next/link';
import ItemStyles from './styles/Item';
import TitleStyles from './styles/Title';
import PriceTag from './styles/PriceTag';
import { formatMoney } from '../utils/format';

export default function Item({ id, title, price, description, image }) {
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
        <button>Delete </button>
      </div>
    </ItemStyles>
  );
}
