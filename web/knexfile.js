module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '12345678',
      database: 'myshop',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'mysql',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
