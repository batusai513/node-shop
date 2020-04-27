import { ApolloServer } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import Mutation from '../../src/graphql/resolvers/mutation';
import Query from '../../src/graphql/resolvers/query';
import typeDefs from '../../src/graphql/schema.graphql';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  const db = new PrismaClient();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: {
      Mutation,
      Query,
    },
    context: (req) => {
      return {
        ...req,
        db,
      };
    },
  });

  const handler = apolloServer.createHandler({ path: '/api/graphql' });

  return handler(req, res);
}
