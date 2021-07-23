const Sequelize = require('sequelize');

const connection = new Sequelize('animes', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;