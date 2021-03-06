const Sequelize = require('sequelize');

const Anime = require('./Anime')
const connection = require('../db/connection');

const Episodes = connection.define('episodes', {
    link: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    link_frame: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});


Anime.hasMany(Episodes)
Episodes.belongsTo(Anime)

//Episodes.sync({force: true})



module.exports = Episodes;