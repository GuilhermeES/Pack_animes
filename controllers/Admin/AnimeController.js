const Anime = require('../../models/Anime');
const Episodes = require('../../models/Episodes');
const Category = require('../../models/Genres');

const { Op } = require("sequelize");

const fs = require("fs");
const slugify = require('slugify')

class AnimeController {
    create(req,res){
        const title = req.body.title 
        const genre = req.body.category   
        console.log(genre)

        if(title != undefined){
            Anime.create({
                title: title,
                description: req.body.description,
                type: req.file.mimetype,
                name: req.file.originalname,
                genreId: genre,
                slug: slugify(title),
                image: fs.readFileSync(
                    __basedir + "/resources/static/assets/uploads/" + req.file.filename
                ),
            })
            .then((anime) => {
                fs.writeFileSync(
                    __basedir + "/resources/static/assets/tmp/" + anime.name,
                    anime.image
                );
                res.redirect('/admin/new/anime')
            })
        }
        else{
            res.redirect('/admin')
        }
    }

    createCategory(req,res){
        const name = req.body.name

        if(name != undefined){
            Category.create({
                name: name,
                slug: slugify(name)
            })
            .then(() => {
                res.redirect('/admin/new/category')
            })
        }
        else{
            res.redirect('/admin/new/category')
        }
    }

    show(req,res){
        Anime.findAll()
        .then(animes => {
            res.render("admin/new_episode", {animes: animes})
        });
    }

    showCategory(req,res){
        Category.findAll()
        .then(category => {
            res.render("admin/new_anime", {category: category})
        })
    }
    
    detailsAnime(req,res){
        const id = req.params.id
        Anime.findByPk(id)
        .then(anime => {
            if(anime != undefined){
                Episodes.findAll({where: {animeId: id}}).then(episodes => {
                    res.render("animes/details", {
                        episodes: episodes,
                        anime: anime
                    })
                })                
            }   
            else{
                res.redirect('/')
            }
        })
    }
}

module.exports = new AnimeController()