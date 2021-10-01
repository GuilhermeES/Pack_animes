const Anime = require('../models/Anime');
const Episodes = require('../models/Episodes');

const { Op } = require("sequelize");

module.exports = {

    showIndexAnimes(req,res){
        Anime.findAll()
        .then(animes => {
            res.render("index", {animes: animes, title: "Pack Animes", description: "Os melhores animes aqui"})
        })
    },

    detailsAnime(req,res){
        const id = req.params.id
        Anime.findByPk(id)
        .then(anime => {
            if(anime != undefined){
                Episodes.findAll({where: {animeId: id}}).then(episodes => {
                    res.render("animes/details", {  
                        episodes: episodes,
                        anime: anime,
                        title: anime.title,
                        description: anime.description
                    })
                })                
            }   
            else{
                res.redirect('/')
            }
        })
    },

    detailsEpisode(req,res){
        const slug = req.params.slug
        Episodes.findOne({
            where: {
                slug: slug
            }
        })
        .then(episode => {
           if(episode != undefined){
                res.render("animes/details_episode", {episode: episode, title: episode.name, description: `Assistir ${episode.name} online - Pack Animes`})
           }
           else{
            res.redirect('/')
           }
        })
    },

    searchAnime(req,res){
        const search = `%${req.query.search}`;
        Anime.findAll({ where:  { title: { [Op.startsWith]: search } } }).then(anime => {
            if (anime != undefined){
                res.render("index", {animes: anime, title:"Pack Animes"})
            }
            else{
                res.redirect('/')
            }
        })
    }

}