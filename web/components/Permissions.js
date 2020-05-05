import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Error from '../components/ErrorMessage';
import Table from './styles/Table';
import USERS_QUERY from '../graphql/user/users.graphql';
import UPDATE_USER_MUTATION from '../graphql/user/updateUser.graphql';

const permissionsList = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
];

export default function Permissions() {
  const { data, loading, error } = useQuery(USERS_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }

  const users = data?.users ?? [];
  return (
    <React.Fragment>
      <Error error={error} />
      <h2>Manage Permissions</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {permissionsList.map((i) => {
              return <th key={i}>{i}</th>;
            })}
            <th>👇🏼</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return <UserPermissions key={user.id} {...user} />;
          })}
        </tbody>
      </Table>
    </React.Fragment>
  );
}

function UserPermissions({ id, name, email, permissions }) {
  const [userPermissions, setUserPermissions] = React.useState(
    () => permissions,
  );
  React.useEffect(() => {
    setUserPermissions(permissions);
  }, [permissions]);

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
    variables: {
      id,
      permissions: userPermissions,
    },
  });

  function onChangePermission(e) {
    const { checked, value } = e.target;
    const newPermissions = checked
      ? userPermissions.concat([value])
      : userPermissions.filter((i) => i != value);
    setUserPermissions(newPermissions);
  }
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      {permissionsList.map((permission) => {
        const itemName = `${id}-permission`;
        const itemId = `${itemName}-${permission}`;
        const hasPermission = userPermissions.includes(permission);
        return (
          <td key={permission}>
            <label htmlFor={itemId}>
              <input
                type="checkbox"
                id={itemId}
                name={itemName}
                checked={hasPermission}
                onChange={onChangePermission}
                value={permission}
              />
            </label>
          </td>
        );
      })}
      <td>
        <button
          onClick={(e) => {
            e.preventDefault();
            updateUser();
          }}
        >
          Update Permissions
        </button>
      </td>
    </tr>
  );
}
