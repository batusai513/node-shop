import styled from 'styled-components';
import { themeToRem } from '../../utils/styles';

const CartStyles = styled.div`
  padding: 20px;
  position: relative;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: grid;
  grid-template-rows: auto 1fr auto;
  ${(props) => props.open && `transform: translateX(0);`};
  header {
    border-bottom: 5px solid ${(props) => props.theme.black};
    margin-bottom: ${themeToRem(20)};
    padding-bottom: ${themeToRem(20)};
  }
  footer {
    border-top: 10px double ${(props) => props.theme.black};
    margin-top: ${themeToRem(20)};
    padding-top: ${themeToRem(20)};
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    font-size: ${themeToRem(30)};
    font-weight: 900;
    p {
      margin: 0;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: scroll;
  }
`;

export default CartStyles;
