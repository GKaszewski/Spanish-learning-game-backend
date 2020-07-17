const { Sequelize, Model, DataTypes } = require('sequelize');
var env = process.env.NODE_ENV || 'dev';
const config = require('./environment')[env];
module.exports = new Sequelize(config.database.name, config.database.user, config.database.password, {
  host: config.database.host,
  dialect: 'postgres'
});