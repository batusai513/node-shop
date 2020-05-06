const merge = require('deepmerge');
const userResolver = require('./User/user.resolver');
const itemResolver = require('./Item/item.resolver');
const cartItemResolver = require('./CartItem/cartItem.resolver');

const root = {
  Query: {
    ping() {
      return 'Pong';
    },
  },
  Mutation: {},
};

module.exports = merge.all([
  root,
  userResolver,
  itemResolver,
  cartItemResolver,
]);
