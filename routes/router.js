const express = require('express');
const router = express();

const upload = require("../middlewares/upload");


//Controllers
const HomeController = require('../controllers/HomeController.js')
/*Admin Controllers*/
const AdminController = require('../controllers/Admin/AdminController.js')
const AnimeController = require('../controllers/Admin/AnimeController.js')
const EpisodeController = require('../controllers/Admin/EpisodeController.js')



/*Animes*/
router.get('/', HomeController.showIndexAnimes)
router.get('/anime/:id', AnimeController.detailsAnime)
router.get('/episodio/:slug', EpisodeController.detailsEpisode)




/*Episodes routes*/


/*Admin Routes*/
/*Pages*/
router.get('/admin', AdminController.index)
router.get('/admin/new/anime', AnimeController.showCategory, AnimeController.renderPage)
router.get('/admin/new/category', AdminController.createCategory)
router.get('/admin/new/episode', AnimeController.show)


/*Post date*/
router.post('/admin/create', upload.single("file"), AnimeController.create)
router.post('/admin/create/episode', EpisodeController.createEpisode)
router.post('/admin/create/category', AnimeController.createCategory)



module.exports = router
