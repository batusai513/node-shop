import React from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import Form from './styles/Form';
import Error from './ErrorMessage';
import useForm from '../utils/useForm';
import RESET_PASSWORD_MUTATION from '../graphql/user/resetPassword.graphql';
import USER_QUERY from '../graphql/user/me.graphql';

function RequestReset() {
  const { query } = useRouter();
  const [state, onChangeHandler, { resetForm }] = useForm({
    resetToken: query.resetToken ?? '',
    password: '',
    confirmPassword: '',
  });

  const [requestReset, { loading, error, called }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      variables: state,
      refetchQueries: [{ query: USER_QUERY }],
    },
  );

  return (
    <Form
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        requestReset().then(() => {
          resetForm();
        });
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Reset a password reset</h2>
        <Error error={error} />
        {!error && !loading && called && <p>Password changed succesfuly</p>}

        <input name="resetToken" type="hidden" value={state.resetToken} />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={state.password}
          onChange={onChangeHandler}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={onChangeHandler}
        />

        <button type="submit">Reset password</button>
      </fieldset>
    </Form>
  );
}

export default RequestReset;
