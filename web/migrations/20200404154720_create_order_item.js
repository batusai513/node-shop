
exports.up = function(knex) {
  return knex.schema.createTable('order_items', (table) => {
    table.increments('id');
    table.string('title', 255).notNullable();
    table.string('description', 255).notNullable();
    table.string('image', 255).notNullable();
    table.string('large_image', 255).notNullable();    
    table.decimal('price').notNullable();
    table.integer('quantity').unsigned().notNullable().defaultTo(1);

    table.integer('user_id').unsigned().references('users.id');
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('order_items');
};
