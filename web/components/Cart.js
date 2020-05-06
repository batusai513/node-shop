import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import CloseButton from './styles/CloseButton';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import SickButton from './styles/SickButton';
import useUser from '../utils/useUser';
import CartItem from './CartItem';
import { formatMoney } from '../utils/format';
import TOGGLE_CART_MUTATION from '../graphql/client/toggleCart.graphql';
import CART_OPEN_QUERY from '../graphql/client/cartOpen.graphql';

function Cart() {
  const { data: user, loading } = useUser();
  const { data } = useQuery(CART_OPEN_QUERY);
  const [toggle] = useMutation(TOGGLE_CART_MUTATION);
  const cartOpen = data?.cartOpen ?? false;

  if (loading) {
    return null;
  }
  const me = user?.me ?? {};
  const cart = me.cart ?? [];
  return (
    <CartStyles open={cartOpen}>
      <header>
        <CloseButton title="close" onClick={toggle}>
          &times;
        </CloseButton>
        <Supreme>{me.name} Cart</Supreme>
        <p>You have {cart.length} items in your cart</p>
      </header>
      <ul>
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </ul>
      <footer>
        <p>{formatMoney({}, calcTotalPrice(cart))}</p>
        <SickButton>Checkout</SickButton>
      </footer>
    </CartStyles>
  );
}

export default Cart;

function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.item) return tally;
    return tally + cartItem.quantity * cartItem.item.price;
  }, 0);
}
