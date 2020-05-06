import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import REMOVE_FROM_CART_MUTATION from '../graphql/cart/removeFromCart.graphql';
import USER_QUERY from '../graphql/user/me.graphql';

const Button = styled.button`
  font-size: 30px;
  background: none;
  border: none;
  line-height: 1;
  &:hover {
    color: ${({ theme }) => theme.red};
    cursor: pointer;
  }
`;

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    // refetchQueries: [{ query: USER_QUERY }],
    optimisticResponse: {
      __typename: 'Mutation',
      removeFromCart: {
        __typename: 'CartItem',
        id,
      },
    },
    update(cache) {
      const user = cache.readQuery({ query: USER_QUERY });
      const newCart = user.me.cart.filter((item) => item.id !== id);
      cache.writeQuery({
        query: USER_QUERY,
        data: {
          me: {
            ...user.me,
            cart: newCart,
          },
        },
      });
    },
  });
  return (
    <Button
      onClick={() => {
        removeFromCart().catch((err) => {
          alert(err.message);
        });
      }}
      disabled={loading}
    >
      &times;
    </Button>
  );
}
