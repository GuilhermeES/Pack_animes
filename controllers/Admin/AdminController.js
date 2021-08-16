const User = require('../../models/User');
const bcrypt = require('bcryptjs')

module.exports = {
    index(req,res){
        res.render("admin/index", {title: "Admin"})
    },

    login(req,res){
        res.render("admin/login", {title: "Login"})
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
    }
}

