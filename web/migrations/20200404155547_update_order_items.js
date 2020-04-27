exports.up = function (knex) {
  return knex.schema.alterTable('order_items', (table) => {
    table.integer('order_id').unsigned().notNullable().references('orders.id');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('order_items', (table) => {
    table.dropForeign('order_id').dropColumn('order_id');
  });
};
