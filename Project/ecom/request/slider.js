const { check } = require('express-validator');

exports.store=[
    check('title','Invalid title').not().isEmpty().trim(),
    check('image',"Invalid image")
];


exports.update=[
    check('title',"Invalid title").not().isEmpty().trim(),
    check('image',"Invalid image")
];