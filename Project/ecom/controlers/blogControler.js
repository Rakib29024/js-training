

const { validationResult } = require('express-validator');
const BlogModel=require('../models/Blog');
module.exports={
    index:(req, res, next)=> {
        // blog list

        BlogModel.find((err,docs)=>{
            if(err){
                return res.json({error:"Something went wrong!"+err})
            }
            return res.json({blogs:docs});
        });
        res.render('backend/blog/index', { title: 'Blogs',layout:"backend/layout" });
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

        const blog=new BlogModel({
            title:req.body.title,
            slug:req.body.slug,
            details:req.body.details,
            image:req.body.image
        });

        blog.save((err,newBlog)=>{
            if(err){
              return res.json({error:"Something went wrong!"+err})
            }
            return res.json({blog:newBlog});
        });



        // return res.json(req.body);
        // res.render('index', { title: 'blogs' });
    }
}