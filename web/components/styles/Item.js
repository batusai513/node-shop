import styled from 'styled-components';
import { themeToRem } from '../../utils/styles';

const Item = styled.div`
  background: white;
  border: 1px solid ${(props) => props.theme.offWhite};
  box-shadow: ${(props) => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  p {
    font-size: ${themeToRem(12)};
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 ${themeToRem(30)};
    font-size: ${themeToRem(15)};
  }
  .buttonList {
    background-color: ${(props) => props.theme.lightGrey};
    display: grid;
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.lightGrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    & > * {
      background: white;
      text-align: center;
      border: 0;
      font-family: 'radnika_next';
      font-size: ${themeToRem(10)};
      padding: ${themeToRem(10)};
    }
  }
`;

export default Item;
