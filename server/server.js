const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./types/root.resolver');
const loadSchemas = require('./utils/load_schemas');

const db = new PrismaClient();
const app = express();

function createServer() {
  const server = new ApolloServer({
    typeDefs: [loadSchemas()],
    resolvers,
    context(req) {
      return {
        ...req,
        db
      };
    },
  });

  server.applyMiddleware({ app });

  app.listen(3000, function onInit() {
    console.log('listening');
  });
}

module.exports = createServer;
