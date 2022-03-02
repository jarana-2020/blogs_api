/* eslint-disable camelcase */
require('dotenv/config');

const { HOST, PASSWORD_POSTGRES, DATABASE, DB_USERNAME, DB_PORT, DATABASE_URL } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: PASSWORD_POSTGRES,
    database: DATABASE,
    host: HOST,
    port: DB_PORT,
    dialect: 'postgres',
  },
  test: {
    username: DB_USERNAME,
    password: PASSWORD_POSTGRES,
    database: DATABASE,
    host: HOST,
    port: DB_PORT,
    dialect: 'postgres',
  },
  production: {
    username: DB_USERNAME,
    password: PASSWORD_POSTGRES,
    database: DATABASE,
    host: HOST,
    port: DB_PORT,
    use_env_variable: DATABASE_URL,
    dialect: 'postgres',
  },
};