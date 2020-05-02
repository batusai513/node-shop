import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import Form from './styles/Form';
import Error from './ErrorMessage';
import useForm from '../utils/useForm';
import SIGNIN_MUTATION from '../graphql/user/signin.graphql';
import USER_QUERY from '../graphql/user/me.graphql';

function Signin() {
  const [state, onChangeHandler, { resetForm }] = useForm({
    email: '',
    password: '',
  });

  const [signin, { loading, error }] = useMutation(SIGNIN_MUTATION, {
    variables: state,
    refetchQueries: [{ query: USER_QUERY }],
  });

  return (
    <Form
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        signin().then(() => {
          resetForm();
        });
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign up for an account</h2>
        <Error error={error} />
        <label htmlFor="signin-email">Email</label>
        <input
          type="email"
          id="signin-email"
          name="email"
          value={state.email}
          onChange={onChangeHandler}
        />

        <label htmlFor="signin-password">Password</label>
        <input
          type="password"
          id="signin-password"
          name="password"
          value={state.password}
          onChange={onChangeHandler}
        />

        <button type="submit">Sign in</button>
      </fieldset>
    </Form>
  );
}

export default Signin;
