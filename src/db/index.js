'use strict';

const { Sequelize } = require('sequelize');

const dialect = process.env.DB_DIALECT || 'mysql';
const host = process.env.DB_HOST || 'localhost';
const port = Number(process.env.DB_PORT || 3306);
const database = process.env.DB_NAME || 'auth_db';
const username = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || '';

const sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect,
    logging: process.env.NODE_ENV === 'development' ? console.log : false
});

module.exports = { sequelize };


