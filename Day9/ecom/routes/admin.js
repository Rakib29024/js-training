var express = require('express');
var router = express.Router();
const BlogController=require('../controlers/blogControler.js');
/* GET home page. */

//blog
router.get('/blogs', BlogController.index);
router.get('/blog/create', BlogController.create);
router.get('/blog/:id/edit', BlogController.edit);
router.delete('/blog/:id/delete', BlogController.delete);
router.get('/blog/:id/show', BlogController.show);
router.post('/blog/store', BlogController.store);
router.put('/blog/:id/update',BlogController.update);

// team


module.exports = router;
