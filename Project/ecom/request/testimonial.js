const { check } = require('express-validator');

exports.store=[
    check('name','Invalid name').not().isEmpty().trim(),
    // check('slug','Slug Invalid').not().isEmpty().trim(),
    check('details',"Invalid details").not().isEmpty().trim(),
    check('designation',"Invalid designation").not().isEmpty().trim(),
    check('image',"Invalid Image")
];


exports.update=[
    check('title',"Invalid title").not().isEmpty().trim(),
    check('details',"Invalid title").not().isEmpty().trim(),
    check('designation',"Invalid designation").not().isEmpty().trim(),
    check('image',"Invalid title")
];