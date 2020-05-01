import styled from 'styled-components';
import { themeToRem } from '../../utils/styles';

const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: ${themeToRem(20)} 0;
  border: 1px solid ${props => props.theme.lightGrey};
  border-radius: 10px;
  font-size: ${themeToRem(10)};
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid ${props => props.theme.lightGrey};
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
`;

export default PaginationStyles;