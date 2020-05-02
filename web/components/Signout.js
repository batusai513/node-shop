import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import SIGN_OUT_MUTATION from '../graphql/user/signout.graphql';
import USER_QUERY from '../graphql/user/me.graphql';

export default function Signout() {
  const [signout, { loading }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: USER_QUERY }],
  });
  return (
    <button onClick={signout} disabled={loading}>
      Sign Out
    </button>
  );
}
