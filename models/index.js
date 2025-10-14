'use strict';

const fs = require('fs');
const path = require('path');
const { sequelize } = require('../src/db');

const db = {};

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      // allow models without extension (like current users)
      (file.slice(-3) === '.js' || !file.includes('.'))
    );
  })
  .forEach((file) => {
    const modelFactory = require(path.join(__dirname, file));
    if (typeof modelFactory === 'function') {
      const model = modelFactory(sequelize, require('sequelize').DataTypes);
      db[model.name] = model;
    }
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;


