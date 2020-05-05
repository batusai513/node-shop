import React from 'react';
import useUser from '../utils/useUser';
import Signin from './Signin';

export default function PleaseSignin({ children }) {
  const { data, loading } = useUser();
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data?.me) {
    return (
      <div>
        <p>Please Sign in before continuing!</p>
        <Signin />
      </div>
    );
  }
  return children;
}
