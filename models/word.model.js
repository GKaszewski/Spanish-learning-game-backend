const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../database');

class Word extends Model {};
Word.init({
    spanish : DataTypes.STRING,
    english : DataTypes.STRING,
}, {sequelize: db, modelName: 'Word'});

module.exports = Word;