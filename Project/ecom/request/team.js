const { check } = require('express-validator');

exports.store=[
    check('name','Invalid name').not().isEmpty().trim(),
    // check('slug','Slug Invalid').not().isEmpty().trim(),
    check('designation',"Invalid designation").not().isEmpty().trim(),
    check('image',"Invalid Image"),
    check('facebook',"Invalid facebook").trim(),
    check('twitter',"Invalid twitter").trim(),
    check('instagram',"Invalid instagram").trim(),
    check('linkedin',"Invalid linkedin").trim()
];


exports.update=[
    check('title',"Invalid title").not().isEmpty().trim(),
    check('designation',"Invalid designation").not().isEmpty().trim(),
    check('image',"Invalid image"),
    check('facebook',"Invalid facebook").trim(),
    check('twitter',"Invalid twitter").trim(),
    check('instagram',"Invalid instagram").trim(),
    check('linkedin',"Invalid linkedin").trim()
];