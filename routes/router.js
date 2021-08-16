const express = require('express');
const router = express();

/*Middlewares*/
const upload = require("../middlewares/upload");
const admin = require("../middlewares/auth");

//Controllers
const indexController = require('../controllers/indexController.js')
/*Admin Controllers*/
const adminController = require('../controllers/Admin/adminController.js')
const animeController = require('../controllers/Admin/animeController.js')

/*Page initial - Usuario - */
router.get('/', indexController.showIndexAnimes)
router.get('/anime/:id', indexController.detailsAnime)
router.get('/episodio/:slug', indexController.detailsEpisode)
router.get('/pesquisa', indexController.searchAnime)

/*Admin Routes*/
/*Pages*/
router.get('/admin', admin, adminController.index)
router.get('/admin/list', admin, animeController.list)
router.get('/admin/edit-anime/:id', admin, animeController.detailsAnimeAdmin)
router.get('/admin/edit-episode/:slug', admin, animeController.editEpisode)
router.get('/login', adminController.login)
router.get('/admin/new/anime', admin,  animeController.createAnimeView)
router.get('/admin/new/category', admin, animeController.createCategoryView)
router.get('/admin/new/episode', admin, animeController.createEpisodeView)

/*Post date*/
router.post('/admin/create', upload.single("file"), animeController.create)
router.post('/admin/create/episode', animeController.createEpisode)
router.post('/admin/create/category', animeController.createCategory)
router.post('/auth', adminController.auth)

router.post('/admin/update/episode/:slug', animeController.updateEpisode)

module.exports = router
