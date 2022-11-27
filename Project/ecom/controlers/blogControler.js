

const { validationResult } = require('express-validator');
const BlogModel=require('../models/Blog');
module.exports={
    index:(req, res, next)=> {
        // blog list

        BlogModel.find((err,docs)=>{
            if(err){
                return res.json({error:"Something went wrong!"+err});
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
            res.json({"blog":blog});
        })
        .catch((err)=>{
            res.json({"error":"Somethiong went wrong!"});
        })
        
        // blog list
        res.render('index', { title: 'blogs' });
    },
    show:(req, res, next)=> {
        //json
        // res.json({'id':req.params.id});
        BlogModel.findById(req.params.id)
        .then((blog)=>{
            // blog list
            const details={
                title:blog.title,
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

        BlogModel.findByIdAndRemove(req.params.id).then(()=>{
            console.log("deleted");
        }).catch((error)=>{
            console.log("could not deleted due to " +error);
        })
        res.redirect("/admin/blogs");
        // blog list
        // res.render('index', { title: 'blogs' });
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
        let sampleFile;
        if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).send('No files were uploaded.');
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.image;
        let rnd=new Date().valueOf();
        let filePath='upload/' +rnd+sampleFile.name;
      
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv('public/'+filePath, function(err) {
          if (err)
            return res.status(500).send(err);
      
          res.send('File uploaded!');
        });

        // /

        const blog=new BlogModel({
            title:req.body.title,
            slug:req.body.slug,
            details:req.body.details,
            image:filePath
        });

        blog.save((err,newBlog)=>{
            if(err){
              return res.json({error:"Something went wrong!"+err});
            }
            return res.json({blog:newBlog});
        });



        // return res.json(req.body);
        // res.render('index', { title: 'blogs' });
    }
}