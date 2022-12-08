const { check } = require('express-validator');

exports.store=[
    check('title','Title Invalid').not().isEmpty().trim(),
    // check('slug','Slug Invalid').not().isEmpty().trim(),
    check('details',"Invalid details").not().isEmpty().trim(),
    check('icon',"Invalid icon")
];


exports.update=[
    check('title',"Invalid title").not().isEmpty().trim(),
    check('details',"Invalid details").not().isEmpty().trim(),
    check('icon',"Invalid icon")
];