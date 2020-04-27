import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import Nav from '../Nav/Nav';
import { themeToRem } from '../../utils/styles';

const Logo = styled.h1`
  font-size: ${themeToRem(40)};
  margin-left: ${themeToRem(20)};
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: ${themeToRem(5)} ${themeToRem(10)};
    background-color: ${props => props.theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media screen and (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media screen and (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 10px solid ${props => props.theme.lightGrey};
  }
`;

export default function Header() {
  React.useEffect(() => {
    Router.events.on('routeChangeStart', showProgress);
    Router.events.on('routeChangeComplete', hideProgress);
    Router.events.on('routeChangeError', hideProgress);

    function showProgress() {
      NProgress.start();
    }

    function hideProgress() {
      NProgress.done();
    }

    return () => {
      Router.events.off('routeChangeStart', showProgress);
      Router.events.off('routeChangeComplete', hideProgress);
      Router.events.off('routeChangeError', hideProgress);
    };
  }, []);
  return (
    <StyledHeader>
      <div className="bar">
        <Logo>
          <Link href="/">
            <a>Sick fits</a>
          </Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>cart</div>
    </StyledHeader>
  );
}
