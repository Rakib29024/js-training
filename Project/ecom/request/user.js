const { check } = require('express-validator');

exports.store=[
    check('username','Invalid username').not().isEmpty().trim(),
    // check('slug','Slug Invalid').not().isEmpty().trim(),
    check('email',"Invalid email").not().isEmpty().trim(),
    check('contact',"Invalid contact").not().isEmpty().trim(),
    check('password',"Invalid password").not().isEmpty()
];


exports.update=[
    check('username','Invalid username').not().isEmpty().trim(),
    // check('slug','Slug Invalid').not().isEmpty().trim(),
    check('email',"Invalid email").not().isEmpty().trim(),
    check('contact',"Invalid contact").not().isEmpty().trim(),
    check('password',"Invalid password").not().isEmpty()
];