import styled, { keyframes } from 'styled-components';
import { themeToRem } from '../../utils/styles';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }
  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: ${themeToRem(20)};
  font-size: ${themeToRem(15)};
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: ${themeToRem(10)};
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: ${themeToRem(5)};
    font-size: ${themeToRem(10)};
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: ${(props) => props.theme.red};
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: red;
    color: white;
    border: 0;
    font-size: ${themeToRem(20)};
    font-weight: 600;
    padding: ${themeToRem(5)} ${themeToRem(12)};
  }
  fieldset {
    border: 0;
    padding: 0;
    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(
        to right,
        #ff3019 0%,
        #e2b04a 50%,
        #ff3019 100%
      );
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export default Form;
