const Anime = require('../models/Anime');


class HomeController {
    index(req,res){
        res.render("index")
    }
    showIndexAnimes(req,res){
        Anime.findAll()
        .then(animes => {
            res.render("index", {animes: animes})
        })
    }
}

module.exports = new HomeController()