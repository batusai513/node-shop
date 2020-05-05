const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./types/root.resolver');
const loadSchemas = require('./utils/load_schemas');

const db = new PrismaClient({
  log: ['info', 'query', 'warn'],
});
const app = express();

app.use(cookieparser());

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }),
);

app.use(authenticationMiddleware);
app.use(userMiddleware);

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

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: 'http://localhost:3000',
    },
  });

  app.listen(4000, function onInit() {
    console.log('listening');
  });
}

module.exports = createServer;

function authenticationMiddleware(req, res, next) {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
  }
  next();
}

function userMiddleware(req, res, next) {
  const userId = req.userId;
  if (userId) {
    return db.user
      .findOne({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          permissions: true,
        },
      })
      .then((user) => {
        req.user = user;
        next();
      });
  }

  next();
}
