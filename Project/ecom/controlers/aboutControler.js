const { validationResult } = require('express-validator');
const aboutModel=require('../models/About');
const fs=require("fs");

module.exports={
    index:(req, res, next)=> {
        // about list
        aboutModel.find((err,docs)=>{
            if(err){
                res.render("error",{errorStatus:500});
            }
            const data=[];
            docs.forEach(element => {
                data.push({
                    title:element.title,
                    details:element.details,
                    map:element.map,
                    image:element.image,
                    id:element._id
                });
            });
            // return res.json({abouts:docs});
            res.render('backend/about_us/index', { title: 'Abouts',layout:"backend/layout",data:data });
        });

    },
    create:(req, res, next)=> {
        // about list
        res.render('backend/about_us/create', { title: 'Abouts',layout:'backend/layout' });
    },
    edit:(req, res, next)=> {
        //json
        // res.json({'id':req.params.id});
        aboutModel.findById(req.params.id)
        .then((about)=>{
            // about list
            const details={
                title:about.title,
                map:about.map,
                id:about._id,
                details:about.details,
                image:about.image
            }
            // console.log(details);
            res.render('backend/about_us/edit', { title: 'About Edit',layout:"backend/layout",about_us:details });
        })
    },
    show:(req, res, next)=> {
        //json
        // res.json({'id':req.params.id});
        aboutModel.findById(req.params.id)
        .then((about)=>{
            
            // about list
            const details={
                title:about.title,
                map:about.map,
                details:about.details,
                image:about.image
            }
            // console.log(details);
            res.render('backend/about_us/show', { title: 'About',layout:"backend/layout",about_us:details });
        })
        .catch((err)=>{
            res.json({"error":"Somethiong went wrong!"});
        })


    },
    delete:(req, res, next)=> {
        aboutModel.findByIdAndRemove(req.params.id,(err,about)=>{
            if(err){
                res.render("error",{errorStatus:500});
            }
            // /delete file
            try {
                fs.unlink("public/"+about.image,()=>{});
            } catch (error) {
                
            }
            res.redirect("/admin/about-us");
        });
        
    },
    store:(req, res, next)=> {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.render("backend/about-us/create",{layout:"backend/layout",errors:errors.mapped()})
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
                res.redirect("/admin/about-us/create");
            });
        }



        // /

        const about=new aboutModel({
            title:req.body.title,
            map:req.body.map,
            details:req.body.details,
            image:filePath
        });

        about.save((err,newabout)=>{
            if(err){
                res.redirect("/admin/about-us/create");
            }
            res.redirect("/admin/about-us");
        });



        // return res.json(req.body);
        // res.render('index', { title: 'Abouts' });
    },
    update:(req, res, next)=> {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            // return res.redirect("/admin/about-us/"+req.params.id+"/edit");
            return res.render("backend/about-us/edit",{layout:"backend/layout",errors:errors.mapped()});
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
                    res.redirect("/admin/about-us/"+req.params.id+"/edit");
            });
        }
        const aboutObj={
            title:req.body.title,
            map:req.body.map,
            details:req.body.details
        };

        if(filePath){
            aboutObj.image=filePath;
        }

        // /
        aboutModel.findByIdAndUpdate(req.params.id,aboutObj,(err,about)=>{
            if(err){
                res.redirect("/admin/about-us/"+req.params.id+"/edit");
            }
            res.redirect("/admin/about-us");
        });

    }
}