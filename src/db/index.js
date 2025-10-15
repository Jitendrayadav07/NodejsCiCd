'use strict';

const { Sequelize } = require('sequelize');

const dialect = process.env.DB_DIALECT;
const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT);
const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect,
    logging: process.env.NODE_ENV === 'development' ? console.log : false
});

module.exports = { sequelize };


