const { validationResult } = require('express-validator');
const BlogModel=require('../models/Blog');
const fs=require("fs");

module.exports={
    index:(req, res, next)=> {
        // blog list
        BlogModel.find((err,docs)=>{
            if(err){
                res.render("error",{errorStatus:500});
            }
            const data=[];
            docs.forEach(element => {
                data.push({
                    title:element.title,
                    details:element.details,
                    image:element.image,
                    id:element._id
                });
            });
            // return res.json({blogs:docs});
            res.render('backend/blog/index', { title: 'Blogs',layout:"backend/layout",data:data });
        });

    },
    create:(req, res, next)=> {
        // blog list
        res.render('backend/blog/create', { title: 'blogs',layout:'backend/layout' });
    },
    edit:(req, res, next)=> {
        //json
        // res.json({'id':req.params.id});
        BlogModel.findById(req.params.id)
        .then((blog)=>{
            // blog list
            const details={
                title:blog.title,
                slug:blog.slug,
                id:blog._id,
                details:blog.details,
                image:blog.image
            }
            // console.log(details);
            res.render('backend/blog/edit', { title: 'Blog Edit',layout:"backend/layout",blog:details });
        })
    },
    show:(req, res, next)=> {
        //json
        // res.json({'id':req.params.id});
        BlogModel.findById(req.params.id)
        .then((blog)=>{
            
            // blog list
            const details={
                title:blog.title,
                slug:blog.slug,
                details:blog.details,
                image:blog.image
            }
            // console.log(details);
            res.render('backend/blog/show', { title: 'Blog',layout:"backend/layout",blog:details });
        })
        .catch((err)=>{
            res.json({"error":"Somethiong went wrong!"});
        })


    },
    delete:(req, res, next)=> {
        BlogModel.findByIdAndRemove(req.params.id,(err,blog)=>{
            if(err){
                res.render("error",{errorStatus:500});
            }
            // /delete file
            try {
                fs.unlink("public/"+blog.image,()=>{});
            } catch (error) {
                
            }
            res.redirect("/admin/blogs");
        });
        
    },
    store:(req, res, next)=> {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.render("backend/blog/create",{layout:"backend/layout",errors:errors.mapped()})
            // return res.json({errors:errors.mapped()});
        }

        let sampleFile,filePath;
        if (req.files || Object.keys(req.files).length !== 0) {
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            sampleFile = req.files.image;
            let rnd=new Date().valueOf();
            filePath='upload/' +rnd+sampleFile.name;
        
            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv('public/'+filePath, function(err) {
            if (err)
                res.redirect("/admin/blog/create");
            });
        }



        // /

        const blog=new BlogModel({
            title:req.body.title,
            slug:req.body.slug,
            details:req.body.details,
            image:filePath
        });

        blog.save((err,newBlog)=>{
            if(err){
                res.redirect("/admin/blog/create");
            }
            res.redirect("/admin/blogs");
        });



        // return res.json(req.body);
        // res.render('index', { title: 'blogs' });
    },
    update:(req, res, next)=> {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            // return res.redirect("/admin/blog/"+req.params.id+"/edit");
            return res.render("backend/blog/edit",{layout:"backend/layout",errors:errors.mapped()});
        }
        let sampleFile,filePath;

        if (req.files) {
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            sampleFile = req.files.image;
            let rnd=new Date().valueOf();
            filePath='upload/' +rnd+sampleFile.name;
            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv('public/'+filePath, function(err) {
                if (err)
                    res.redirect("/admin/blog/"+req.params.id+"/edit");
            });
        }
        const blogObj={
            title:req.body.title,
            slug:req.body.slug,
            details:req.body.details
        };

        if(filePath){
            blogObj.image=filePath;
        }

        // /
        BlogModel.findByIdAndUpdate(req.params.id,blogObj,(err,blog)=>{
            if(err){
                res.redirect("/admin/blog/"+req.params.id+"/edit");
            }
            res.redirect("/admin/blogs");
        });

    }
}