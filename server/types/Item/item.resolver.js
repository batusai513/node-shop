module.exports = {
  Query: {
    getItems(_, { input }, { db }) {
      const { skip = 0, first } = input ?? {};
      const args = first ? { skip, first } : {};
      return Promise.all([db.item.findMany(args), db.item.count()]).then(
        ([items, count]) => {
          return { items, meta: { count } };
        }
      );
    },
    getItem(_, { id }, { db }) {
      return db.item.findOne({
        where: { id: parseInt(id, 10) },
      });
    },
  },
  Mutation: {
    createItem(_, { input }, { db }) {
      return db.item.create({
        data: input,
      });
    },
    updateItem(_, { id, input }, { db }) {
      return db.item.update({
        data: input,
        where: { id: parseInt(id, 10) },
      });
    },
    removeItem(_, { id }, { db }) {
      return db.item.delete({
        where: {
          id: parseInt(id, 10),
        },
      });
    },
  },
};
