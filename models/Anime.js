const Sequelize = require('sequelize');

const connection = require('../db/connection');
const Genres = require('./Genres')

const Anime = connection.define('animes', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image:{
        type: Sequelize.BLOB("long"),
        allowNull: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
      },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    genres: {
        type: Sequelize.STRING,
        allowNull: false
    },
});


//Anime.belongsTo(Genres)
//Genres.hasMany(Anime)

//Genres.hasMany(Anime)

//Anime.sync({force: true})

module.exports = Anime;