const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../database');

class User extends Model {};
User.init({
    username : DataTypes.STRING,
    password : DataTypes.STRING
}, {sequelize: db, modelName: 'users'});

module.exports = User;