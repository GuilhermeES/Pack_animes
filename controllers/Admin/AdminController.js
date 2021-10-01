const User = require('../../models/User');
const Episodes = require('../../models/Episodes');
const Report = require('../../models/ReportBug');
const bcrypt = require('bcryptjs')

module.exports = {
    index(req,res){
        Report.findAll()
        .then(report => {
            res.render("admin", {report: report, title: "Admin", description: "Os melhores animes aqui"})
        })
    },

    login(req,res){
        res.render("admin/login", {title: "Login", description: "Os melhores animes aqui"})
    },

    auth(req,res){
        const login = req.body.login    
        const password = req.body.password

        User.findOne({where:{login: login}}).then(user => { 
            if(user != undefined){
               let passwordCorrect =  bcrypt.compare(password, user.password)
                if(passwordCorrect){
                    req.session.user = {
                        id: user.id,
                        login: user.login
                    }
                    res.redirect("/admin")
                
                }
                else{
                    res.redirect("/login")
                }
            }
            else{
                res.redirect("/login")
            }
        })
    },

    reportBug(req,res){
        const {name, description, episode_id, anime_id} = req.body
        Episodes.findByPk(episode_id)
        .then((episode) => {
            if(episode != undefined){
                Report.create({
                    name,
                    description,
                    episode_id,
                    anime_id
                })
                .then(() => {
                    res.redirect("/episodio/" + `${episode.slug}`)
                })
            }
        })    
    },

}

