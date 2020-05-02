import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import Form from './styles/Form';
import Error from './ErrorMessage';
import useForm from '../utils/useForm';
import SIGNUP_MUTATION from '../graphql/user/signup.graphql';

function Signup() {
  const [state, onChangeHandler, { resetForm }] = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [onSignup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: state,
  });

  return (
    <Form
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        onSignup().then(() => {
          resetForm();
        });
      }}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign up for an account</h2>
        <Error error={error} />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={state.email}
          onChange={onChangeHandler}
        />

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={state.name}
          onChange={onChangeHandler}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={state.password}
          onChange={onChangeHandler}
        />

        <button type="submit">Create User</button>
      </fieldset>
    </Form>
  );
}

export default Signup;
