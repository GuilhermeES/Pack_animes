const Anime = require('../../models/Anime');
const Episodes = require('../../models/Episodes');
const Category = require('../../models/Genres');

const fs = require("fs");
const slugify = require('slugify')

module.exports = {

     /*Render views ----------------------------------*/
     createCategoryView(req,res){
        res.render("admin/new_category", {title: "Admin", description: "Os melhores animes aqui"})
    },

    createEpisodeView(req,res){
        Anime.findAll()
        .then(animes => {
            res.render("admin/new_episode", {animes: animes, title: "Admin", description: "Os melhores animes aqui"})
        });
    },

    createAnimeView(req,res){
        Category.findAll()
        .then (category => {
            res.render("admin/new_anime", {categories: category, title: "Admin", description: "Os melhores animes aqui"})
        })
    },

    /*Create Anime, category and episode------------*/
    create(req,res){
        const title = req.body.title 
        const description = req.body.description
        const genre = req.body.category
        const type = req.file.mimetype
        const name = req.file.originalname

        if(title != undefined){
            Anime.create({
                title: title,
                description: description,
                type: type,
                name: name,
                genres: genre,
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
    },

    createEpisode(req,res){
        const name = req.body.name
        const link = req.body.link
        const status = req.body.status
        const link_frame = req.body.link_frame
        const anime = req.body.anime

        Episodes.create({
            name: name,
            link: link,
            link_frame: link_frame,
            status: status,
            animeId: anime,
            slug: slugify(name),
        })
        .then(() => {
            res.redirect('/admin/new/episode')
        })
    },

    createCategory(req,res){
        const name = req.body.name
        console.log(name)

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
    },
    
    /*GET ANIME DETAILS AND EDIT-------------------------------------*/
    list(req,res){
        Anime.findAll()
        .then(animes => {
            res.render("admin/anime_list", {animes: animes, title: "Admin", description: "Os melhores animes aqui"})
        })
    },

    detailsAnimeAdmin(req,res){
        const id = req.params.id
        Anime.findByPk(id)
        .then(anime => {
            if(anime != undefined){
                Episodes.findAll({where: {animeId: id}}).then(episodes => {
                    res.render("admin/edit_anime", {
                        episodes: episodes,
                        anime: anime,
                        title: "Admin",
                        description: "Os melhores animes aqui"
                    })
                })                
            }   
            else{
                res.redirect('/')
            }
        })
    },

    editEpisode(req,res){
        const slug = req.params.slug
        Episodes.findOne({
            where: {
                slug: slug
            }
        })
        .then(episode => {
            if(episode != undefined){
                res.render("admin/edit_episode", {episode: episode,  title: "Admin", description: "Os melhores animes aqui"})
               }
               else{
                   res.redirect("/admin/list")
               }
        })
    },

    updateEpisode(req,res){
        const slug = req.params.slug
        const link = req.body.link
        const link_frame = req.body.link_frame
        Episodes.update({link : link, link_frame: link_frame }, {where:  {slug:slug} })
        .then(episode => {
            if(episode != undefined){
                res.redirect("/admin/edit-episode/" + `${slug}`)
            }
        })

    } 
}