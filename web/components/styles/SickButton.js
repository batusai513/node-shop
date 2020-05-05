import styled from 'styled-components';
import { themeToRem } from '../../utils/styles';

const SickButton = styled.button`
  background: red;
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 0;
  text-transform: uppercase;
  font-size: ${themeToRem(20)};
  padding: ${themeToRem(8)} ${themeToRem(15)};
  transform: skew(-2deg);
  display: inline-block;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }
`;

export default SickButton;
