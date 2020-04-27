exports.up = function (knex) {
  return knex.schema.createTable('orders', (table) => {
    table.increments('id');
    table.decimal('total').notNullable();
    table.integer('user_id').unsigned().references('users.id');
    table.string('charge', 255);
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('orders');
};
