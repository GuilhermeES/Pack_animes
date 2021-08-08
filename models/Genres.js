const Sequelize = require('sequelize');
const connection = require('../db/connection');

const Anime = require('./Anime')

const Genres = connection.define('genres', {
    name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },

});

//Genres.sync({force: true})

module.exports = Genres;