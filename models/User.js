const Sequelize = require('sequelize');
const connection = require('../db/connection');

const User = connection.define('user', {
    login: {
        type: Sequelize.STRING,
        allowNull:false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

//User.sync({force: true})

module.exports = User;