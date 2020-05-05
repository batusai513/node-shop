import styled from 'styled-components';
import { themeToRem } from '../../utils/styles';

const Supreme = styled.h3`
  background: ${(props) => props.theme.red};
  color: white;
  display: inline-block;
  padding: 4px 5px;
  transform: skew(-3deg);
  margin: 0;
  font-size: ${themeToRem(40)};
`;

export default Supreme;
