

const { validationResult } = require('express-validator');

module.exports={
    index:(req, res, next)=> {
        // blog list
        res.render('index', { title: 'blogs' });
    },
    create:(req, res, next)=> {
        // blog list
        res.render('backend/blog/create', { title: 'blogs',layout:'backend/layout' });
    },
    edit:(req, res, next)=> {
        // blog list
        res.render('index', { title: 'blogs' });
    },
    show:(req, res, next)=> {
        // blog list
        res.render('index', { title: 'blogs' });
    },
    delete:(req, res, next)=> {
        // blog list
        res.render('index', { title: 'blogs' });
    },
    update:(req, res, next)=> {
        // blog list
        res.render('index', { title: 'blogs' });
    },
    store:(req, res, next)=> {

        const errors=validationResult(req);

        if(!errors.isEmpty()){
            return res.json({errors:errors.mapped()});
        }
        return res.json(req.body);
        // res.render('index', { title: 'blogs' });
    }
}