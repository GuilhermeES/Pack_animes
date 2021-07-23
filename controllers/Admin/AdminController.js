class AdminController {
    index(req,res){
        res.render("admin/index", {title: "title"})
    }

    createCategory(req,res){
        res.render("admin/new_category")
    }
}

module.exports = new AdminController()