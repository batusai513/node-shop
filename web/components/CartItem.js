import React from 'react';
import RemoveFromCart from './RemoveFromCart';
import { formatMoney } from '../utils/format';

import styled from 'styled-components';

const CartItemStyles = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid ${(props) => props.theme.lightGrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

export default function CartItem({ id, quantity, item }) {
  if (!item) {
    return (
      <CartItemStyles>
        <p>Item gas been removed</p>
        <RemoveFromCart id={id} />
      </CartItemStyles>
    );
  }
  return (
    <CartItemStyles>
      <img width="100" src={item.image} alt={item.title} />
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p>
          {formatMoney({}, item.price * quantity)}
          {' - '}
          <em>
            {quantity} &times; {formatMoney({}, item.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={id} />
    </CartItemStyles>
  );
}
