const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./types/root.resolver');
const loadSchemas = require('./utils/load_schemas');

const db = new PrismaClient();
const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

function createServer() {
  const server = new ApolloServer({
    typeDefs: [loadSchemas()],
    resolvers,
    context(req) {
      return {
        ...req,
        db,
      };
    },
  });

  server.applyMiddleware({ app, cors: false });

  app.listen(4000, function onInit() {
    console.log('listening');
  });
}

module.exports = createServer;
