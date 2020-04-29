import styled from 'styled-components';
import { themeToRem } from '../../utils/styles';

const PriceTag = styled.span`
  background: ${(props) => props.theme.red};
  transform: rotate(3deg);
  color: white;
  font-weight: 600;
  padding: ${themeToRem(5)};
  line-height: 1;
  font-size: ${themeToRem(30)};
  display: inline-block;
  position: absolute;
  top: -3px;
  right: -3px;
`;

export default PriceTag;
