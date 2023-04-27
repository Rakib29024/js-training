var express = require('express');
var router = express.Router();
const blogRequest=require("../request/blog")
const BlogController=require('../controlers/blogControler.js');
const DashboardController=require('../controlers/dashboardController.js');
const aboutController=require('../controlers/aboutControler');
const contactUsController=require('../controlers/contactUsControler');
const sliderController=require('../controlers/sliderControler');
const teamController=require('../controlers/teamControler');
const testimonialController=require('../controlers/testimonialControler');
const aboutRequest=require('../request/about');
const teamRequest=require('../request/team');
const testimonialRequest=require('../request/testimonial');
const contactUsRequest=require('../request/contactUs');
const sliderRequest=require('../request/slider');
/* GET home page. */

// /middlewares
const {menus}=require("../middleware/menuMiddleware");
router.use(menus);



router.get('/',DashboardController.index);

//blog
router.get('/blogs',BlogController.index);
router.get('/blog/create', BlogController.create);
router.get('/blog/:id/edit', BlogController.edit);
router.post('/blog/:id/delete', BlogController.delete);
router.get('/blog/:id/show', BlogController.show);
router.post('/blog/store',blogRequest.store, BlogController.store);
router.post('/blog/:id/update',blogRequest.update,BlogController.update);

//about
router.get('/about-us',aboutController.index);
router.get('/about-us/create', aboutController.create);
router.get('/about-us/:id/edit', aboutController.edit);
router.post('/about-us/:id/delete', aboutController.delete);
router.get('/about-us/:id/show', aboutController.show);
router.post('/about-us/store',aboutRequest.store, aboutController.store);
router.post('/about-us/:id/update',aboutRequest.update,aboutController.update);

//team
router.get('/teams',teamController.index);
router.get('/team/create', teamController.create);
router.get('/team/:id/edit', teamController.edit);
router.post('/team/:id/delete', teamController.delete);
router.get('/team/:id/show', teamController.show);
router.post('/team/store',teamRequest.store, teamController.store);
router.post('/team/:id/update',teamRequest.update,teamController.update);

//contactUs
router.get('/contact-us',contactUsController.index);
router.get('/contact-us/create', contactUsController.create);
router.get('/contact-us/:id/edit', contactUsController.edit);
router.post('/contact-us/:id/delete', contactUsController.delete);
router.get('/contact-us/:id/show', contactUsController.show);
router.post('/contact-us/store',contactUsRequest.store, contactUsController.store);
router.post('/contact-us/:id/update',contactUsRequest.update,contactUsController.update);

//testimonial
router.get('/testimonials',testimonialController.index);
router.get('/testimonial/create', testimonialController.create);
router.get('/testimonial/:id/edit', testimonialController.edit);
router.post('/testimonial/:id/delete', testimonialController.delete);
router.get('/testimonial/:id/show', testimonialController.show);
router.post('/testimonial/store',testimonialRequest.store, testimonialController.store);
router.post('/testimonial/:id/update',testimonialRequest.update,testimonialController.update);

//slider
router.get('/sliders',sliderController.index);
router.get('/slider/create', sliderController.create);
router.get('/slider/:id/edit', sliderController.edit);
router.post('/slider/:id/delete', sliderController.delete);
router.get('/slider/:id/show', sliderController.show);
router.post('/slider/store',sliderRequest.store, sliderController.store);
router.post('/slider/:id/update',sliderRequest.update,sliderController.update);


module.exports = router;
