const { AuthenticationError } = require('apollo-server-express');

module.exports = {
  Query: {
    getItems(_, { input }, { db }) {
      const { skip = 0, first } = input ?? {};
      const args = first ? { skip, first } : {};
      return Promise.all([
        db.item.findMany(args),
        db.item.count(),
      ]).then(([items, count]) => {
        return { items, meta: { count } };
      });
    },
    getItem(_, { id }, { db }) {
      return db.item.findOne({
        where: { id: parseInt(id, 10) },
      });
    },
    searchItems(_, { searchTerm }, { db }) {
      return db.item.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm } },
            { description: { contains: searchTerm } },
          ],
        },
      });
    },
  },
  Mutation: {
    createItem(_, { input }, { db, req }) {
      const { userId } = req;
      if (!userId) {
        throw new AuthenticationError('You need to be sign in');
      }
      return db.item.create({
        data: {
          ...input,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    },
    updateItem(_, { id, input }, { db }) {
      return db.item.update({
        data: input,
        where: { id: parseInt(id, 10) },
      });
    },
    async removeItem(_, { id }, { db, req }) {
      const item = await db.item.findOne({
        where: {
          id: parseInt(id, 10),
        },
        include: {
          user: {
            select: {
              id: true,
            },
          },
        },
      });

      // check if the current user created the item or if he/she has permissions to delete

      const ownsItem = req.userId === item.user.id;
      const hasPermissions = req.user.permissions.some((permission) =>
        ['ADMIN', 'ITEMDELETE'].includes(permission),
      );

      if (!ownsItem && !hasPermissions) {
        throw new Error("Doesn't have permissions");
      }

      return db.item.delete({
        where: {
          id: parseInt(id, 10),
        },
        include: {
          user: {
            select: {
              id: true,
            },
          },
        },
      });
    },
  },
};
