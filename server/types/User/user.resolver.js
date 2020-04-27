module.exports = {
  Query: {
    getUsers(_, __, { db }) {
      return db.user.findMany();
    },
  },

  Mutation: {
    createUser(_, { input }, { db }) {
      return db.user.create({
        data: input,
      });
    },
  },
};
