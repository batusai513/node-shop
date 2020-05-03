import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import Form from './styles/Form';
import Error from './ErrorMessage';
import useForm from '../utils/useForm';
import REQUEST_RESET_MUTATION from '../graphql/user/requestReset.graphql';

function RequestReset() {
  const [state, onChangeHandler, { resetForm }] = useForm({
    email: '',
  });

  const [requestReset, { loading, error, called }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: state,
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
        {!error && !loading && called && (
          <p>Sucess, check your email for a reset link</p>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={state.email}
          onChange={onChangeHandler}
        />

        <button type="submit">Reset password</button>
      </fieldset>
    </Form>
  );
}

export default RequestReset;
