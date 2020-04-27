exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('password', 255).notNullable();
    table.timestamps();
    table.enu('permissions', [
      'ADMIN',
      'USER',
      'ITEMCREATE',
      'ITEMUPDATE',
      'ITEMDELETE',
      'PERMISSIONUPDATE',
    ]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
