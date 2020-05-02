const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  Query: {
    getUsers(_, __, { db, res }) {
      return db.user.findMany();
    },
    me(_, __, { db, req }) {
      const { userId } = req;
      if (userId) {
        return db.user.findOne({ where: { id: userId } });
      }

      return null;
    },
  },

  Mutation: {
    signup(_, { input }, { db, res }) {
      input.email = input.email.toLowerCase();
      return bcrypt.hash(input.password, 10).then((hashed) => {
        input.password = hashed;
        return db.user
          .create({
            data: {
              ...input,
              permissions: {
                set: ['USER'],
              },
            },
          })
          .then((user) => {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
            res.cookie('token', token, {
              httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24,
            });
            return user;
          })
          .catch((err) => {
            console.warn(err);
            throw err;
          });
      });
    },
  },
};
