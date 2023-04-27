var express = require('express');
var router = express.Router();
const userController=require('../controlers/auth/UserController');

/* GET users listing. */
router.get('/login', userController.login);
router.post('/login', userController.post_login);
router.get('/register', userController.register);
router.post('/register', userController.post_register);
router.post('/logout', userController.logout);

module.exports = router;
