const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../database');

class User extends Model {};
User.init({
    username : DataTypes.STRING,
    password : DataTypes.STRING,
    token: DataTypes.TEXT
}, {sequelize: db, modelName: 'Users'});

module.exports = User;