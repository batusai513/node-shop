import { useQuery } from '@apollo/react-hooks';
import USER_QUERY from '../graphql/user/me.graphql';

export default function useUser() {
  const { data, loading, error } = useQuery(USER_QUERY);

  return {
    data,
    loading,
    error,
  };
}
