import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { themeToRem } from '../../utils/styles';

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
    color: ${props => props.theme.black};
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
      background-color: ${props => props.theme.lightGrey};
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
    border-top: 1px solid ${props => props.theme.lightgrey};
    width: 100%;
    justify-content: center;
    font-size: ${themeToRem(15)};
  }
`;

function Nav() {
  return (
    <NavStyles>
      <li>
        <Link href="/items">
          <a>items</a>
        </Link>
      </li>
      <li>
        <Link href="/sell">
          <a>sell</a>
        </Link>
      </li>
      <li>
        <Link href="/signup">
          <a>signup</a>
        </Link>
      </li>
      <li>
        <Link href="/orders">
          <a>orders</a>
        </Link>
      </li>
      <li>
        <Link href="/me">
          <a>me</a>
        </Link>
      </li>
    </NavStyles>
  );
}

export default Nav;
