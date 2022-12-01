var express = require('express');
var router = express.Router();
const {menus}=require("../middleware/menuMiddleware");
router.use(menus);

var forntendController = require('../controlers/forntendController');

/* GET home page. */
router.get('/', forntendController.home);
router.get('/blogs', forntendController.blogs);
router.get('/testimonials', forntendController.testimonials);
router.get('/team', forntendController.team);
router.get('/contact-us', forntendController.contactUs);
router.get('/about', forntendController.about);

module.exports = router;
