import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from '../Header/Header';
import Meta from '../Meta/Meta';
import { themeToRem } from '../../utils/styles';

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightGrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0,0,0,0.09)',
  baseFontSize: 16,
};

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: url('/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  html {
    font-family: radnika_next;
    box-sizing: border-box;
    font-size: ${props => props.theme.baseFontSize}px;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: ${themeToRem(15)};
    line-height: 2;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.black};
  }

`;

const StyledPage = styled.div`
  background-color: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

export default function Page(props) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledPage>
        <Meta />
        <Header />
        <Inner>{props.children}</Inner>
      </StyledPage>
    </ThemeProvider>
  );
}

