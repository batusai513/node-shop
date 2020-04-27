import React from 'react';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const Home = ({ users }) => (
  <div>
    {users.map((user) => {
      return <div key={user.id}>{user.name}</div>;
    })}
  </div>
);

export function getServerSideProps() {
  return prisma.users.findMany().then((response) => {
    const users = response.map((user) => ({
      ...user,
      created_at: new Date(user.created_at).toISOString(),
      updated_at: new Date(user.updated_at).toISOString(),
    }));

    return {
      props: {
        users,
      },
    };
  });
}

export default Home;
