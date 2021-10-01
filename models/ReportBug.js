const Sequelize = require('sequelize');
const connection = require('../db/connection');

const Report = connection.define('report', {
    name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    episode_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    anime_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
});

//Report.sync({force: true})

module.exports = Report