const Episodes = require('../../models/Episodes');
const slugify = require('slugify')


class EpisodeController {
    createEpisode(req,res){
        const name = req.body.name
        const link = req.body.link
        const anime = req.body.anime

        Episodes.create({
            name: name,
            link: link,
            animeId: anime,
            slug: slugify(name),
        })
        .then(() => {
            res.redirect('/admin/new/episode')
        })
    }
    detailsEpisode(req,res){
        const slug = req.params.slug
        Episodes.findOne({
            where: {
                slug: slug
            }
        })
        .then(episode => {
            res.render("animes/details_episode", {episode: episode})
        })
    }

}

module.exports = new EpisodeController()