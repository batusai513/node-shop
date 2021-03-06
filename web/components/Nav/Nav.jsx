import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import Signout from '../Signout';
import CartCount from '../CartCount';
import useUser from '../../utils/useUser';
import { themeToRem } from '../../utils/styles';
import TOGGLE_CART_MUTATION from '../../graphql/client/toggleCart.graphql';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: ${themeToRem(20)};
  list-style: none;
  li {
    display: flex;
  }
  a,
  button {
    padding: ${themeToRem(10)} ${themeToRem(30)};
    color: ${(props) => props.theme.black};
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: ${themeToRem(10)};
    background: none;
    border: 0;
    cursor: pointer;
    font-weight: 800;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }
    &:before {
      content: '';
      background-color: ${(props) => props.theme.lightGrey};
      width: 2px;
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 2px;
      background: red;
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: ${themeToRem(20)};
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
    }
  }
  @media (max-width: 1300px) {
    border-top: 1px solid ${(props) => props.theme.lightgrey};
    width: 100%;
    justify-content: center;
    font-size: ${themeToRem(15)};
  }
`;

function Nav() {
  const { data } = useUser();
  const { me } = data ?? {};
  const [toggle] = useMutation(TOGGLE_CART_MUTATION);
  return (
    <NavStyles>
      <li>
        <Link href="/items">
          <a>Shop</a>
        </Link>
      </li>
      {me ? (
        <React.Fragment>
          <li>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
          </li>
          <li>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
          </li>
          <li>
            <Link href="/me">
              <a>Account</a>
            </Link>
          </li>
          <li>
            <Signout />
          </li>
          <li>
            <button onClick={toggle}>
              My Cart <CartCount count={getItemCount(me.cart ?? [])} />
            </button>
          </li>
        </React.Fragment>
      ) : (
        <li>
          <Link href="/signup">
            <a>Sign In</a>
          </Link>
        </li>
      )}
    </NavStyles>
  );
}

function getItemCount(cart) {
  return cart.reduce((tally, cartItem) => {
    return tally + cartItem.quantity;
  }, 0);
}

export default Nav;
