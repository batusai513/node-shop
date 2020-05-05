import styled from 'styled-components';
import { themeToRem } from '../../utils/styles';

const CloseButton = styled.button`
  background: black;
  color: white;
  font-size: ${themeToRem(30)};
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0;
`;

export default CloseButton;
