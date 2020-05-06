import React from 'react';
import axios from 'axios';
import Page from '../components/Page/Page';
import { withApollo } from '../utils/create_client';
import useForm from '../utils/useForm';

function Me() {
  const [state, onChangeHandler, { resetForm }] = useForm({
    email: '',
    password: '',
  });

  React.useEffect(() => {
    axios
      .get(
        'https://api.getform.io/v1/forms/eb20b53a-50bf-4459-bea1-1d2cae88c70d?token=eWUOCSAwfIaG6u15C0wGhkzWQ39LMPtHe4nlVA0mtCVKvAoBq0M60Mdf1tc1',
      )
      .then((res) => {
        console.log(res);
      });
  }, []);

  function submit() {
    axios
      .post('https://getform.io/f/eb20b53a-50bf-4459-bea1-1d2cae88c70d', state)
      .then((res) => {
        console.log(res);
      });
  }
  return (
    <Page>
      <form
        action="https://getform.io/f/eb20b53a-50bf-4459-bea1-1d2cae88c70d"
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          type="text"
          name="email"
          onChange={onChangeHandler}
          value={state.email}
        />
        <input
          type="password"
          name="password"
          onChange={onChangeHandler}
          value={state.password}
        />
        <button type="submit">Submit</button>
      </form>
    </Page>
  );
}

export default withApollo(Me);
