module.exports = {
  Query: {
    async cartItem(_, { itemId }, { db, req }) {
      const { userId } = req;
      if (!userId) {
        throw new Error('Not logged in');
      }
      const [cartItem] = await db.cartItem.findMany({
        where: {
          user: {
            id: parseInt(userId, 10),
          },
          item: {
            id: parseInt(itemId, 10),
          },
        },
      });
      return cartItem;
    },
  },
  Mutation: {
    async addToCart(_, { itemId }, { db, req }) {
      const { userId } = req;
      if (!userId) {
        throw new Error('Not logged in');
      }

      const [cartItem] = await db.cartItem.findMany({
        where: {
          user: {
            id: parseInt(userId, 10),
          },
          item: {
            id: parseInt(itemId, 10),
          },
        },
      });

      if (cartItem) {
        return db.cartItem.update({
          where: {
            id: parseInt(cartItem.id),
          },
          data: {
            quantity: cartItem.quantity + 1,
          },
        });
      }

      return db.cartItem.create({
        data: {
          user: {
            connect: {
              id: parseInt(userId, 10),
            },
          },
          item: {
            connect: {
              id: parseInt(itemId, 10),
            },
          },
        },
      });
    },
    async removeFromCart(_, { id }, { db, req }) {
      const { userId } = req;
      const cartItem = await db.cartItem.findOne({
        where: {
          id: parseInt(id, 10),
        },
        select: {
          id: true,
          user: {
            select: {
              id: true,
            },
          },
        },
      });
      if (!cartItem) {
        throw new Error('Cart Item not found');
      }
      if (cartItem.user.id !== userId) {
        throw new Error('Cart Item not found');
      }

      return db.cartItem.delete({
        where: {
          id: parseInt(id, 10),
        },
      });
    },
  },
  CartItem: {
    user({ userId }, __, { db }) {
      return db.user.findOne({
        where: {
          id: parseInt(userId, 10),
        },
      });
    },
    item({ itemId }, __, { db }) {
      return db.item.findOne({
        where: {
          id: parseInt(itemId, 10),
        },
      });
    },
  },
};
