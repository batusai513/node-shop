import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import CloseButton from './styles/CloseButton';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import SickButton from './styles/SickButton';
import TOGGLE_CART_MUTATION from '../graphql/client/toggleCart.graphql';
import CART_OPEN_QUERY from '../graphql/client/cartOpen.graphql';

function Cart() {
  const { data } = useQuery(CART_OPEN_QUERY);
  const [toggle] = useMutation(TOGGLE_CART_MUTATION);
  const cartOpen = data?.cartOpen ?? false;
  return (
    <CartStyles open={cartOpen}>
      <header>
        <CloseButton title="close" onClick={toggle}>
          &times;
        </CloseButton>
        <Supreme>Your Cart</Supreme>
        <p>You have __ items in your cart</p>
      </header>
      <footer>
        <p>$10.10</p>
        <SickButton>Checkout</SickButton>
      </footer>
    </CartStyles>
  );
}

export default Cart;
