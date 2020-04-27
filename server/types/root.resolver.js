const merge = require('deepmerge');
const userResolver = require('./User/user.resolver');
const itemResolver = require('./Item/item.resolver');

const root = {
  Query: {
    ping() {
      return 'Pong';
    },
  },
  Mutation: {},
};

module.exports = merge.all([root, userResolver, itemResolver]);
