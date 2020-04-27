exports.up = function (knex) {
  return knex.schema
    .createTable('items', (table) => {
      table.increments('id');
      table.string('title', 255).notNullable();
      table.string('description', 255).notNullable();
      table.string('image', 255);
      table.string('large_image', 255);
      table.decimal('price').notNullable();
      table.integer('user_id').unsigned().references('users.id');
      table.timestamps();
    })
    .createTable('cart_items', (table) => {
      table.increments('id');
      table.integer('quantity').defaultTo(1);
      table.integer('item_id').unsigned().references('items.id');
      table.integer('user_id').unsigned().references('users.id');
      table.timestamps();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cart_items').dropTable('items');
};
