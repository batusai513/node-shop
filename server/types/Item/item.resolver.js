module.exports = {
  Query: {
    getItems(_, __, { db }) {
      return db.item.findMany();
    },
  },
  Mutation: {
    createItem(_, { input }, { db }) {
      console.warn(input)
      return db.item.create({
        data: input,
      });
    },
  },
};
