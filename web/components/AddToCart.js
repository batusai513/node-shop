import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import ADD_TO_CART_MUTATION from '../graphql/cart/addToCart.graphql';
import USER_QUERY from '../graphql/user/me.graphql';

export default function AddToCart({ itemId }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { itemId },
    refetchQueries: [{ query: USER_QUERY }],
  });
  return (
    <button onClick={addToCart} disabled={loading}>
      Add to Cart{' '}
      <span role="img" aria-label="cart">
        🛒
      </span>
    </button>
  );
}
