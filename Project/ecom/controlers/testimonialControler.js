const { validationResult } = require('express-validator');
const TestimonialModel=require('../models/Testimonial');
const fs=require("fs");

module.exports={
    index:(req, res, next)=> {
        // testimonial list
        TestimonialModel.find((err,docs)=>{
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
            // return res.json({testimonials:docs});
            res.render('backend/testimonial/index', { title: 'Testimonials',layout:"backend/layout",data:data });
        });

    },
    create:(req, res, next)=> {
        // testimonial list
        res.render('backend/testimonial/create', { title: 'Testimonials',layout:'backend/layout' });
    },
    edit:(req, res, next)=> {
        //json
        // res.json({'id':req.params.id});
        TestimonialModel.findById(req.params.id)
        .then((testimonial)=>{
            // testimonial list
            const details={
                title:testimonial.title,
                slug:testimonial.slug,
                id:testimonial._id,
                details:testimonial.details,
                image:testimonial.image
            }
            // console.log(details);
            res.render('backend/testimonial/edit', { title: 'testimonial Edit',layout:"backend/layout",testimonial:details });
        })
    },
    show:(req, res, next)=> {
        //json
        // res.json({'id':req.params.id});
        TestimonialModel.findById(req.params.id)
        .then((testimonial)=>{
            
            // testimonial list
            const details={
                title:testimonial.title,
                slug:testimonial.slug,
                details:testimonial.details,
                image:testimonial.image
            }
            // console.log(details);
            res.render('backend/testimonial/show', { title: 'testimonial',layout:"backend/layout",testimonial:details });
        })
        .catch((err)=>{
            res.json({"error":"Somethiong went wrong!"});
        })


    },
    delete:(req, res, next)=> {
        TestimonialModel.findByIdAndRemove(req.params.id,(err,testimonial)=>{
            if(err){
                res.render("error",{errorStatus:500});
            }
            // /delete file
            try {
                fs.unlink("public/"+testimonial.image,()=>{});
            } catch (error) {
                
            }
            res.redirect("/admin/testimonials");
        });
        
    },
    store:(req, res, next)=> {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.render("backend/testimonial/create",{layout:"backend/layout",errors:errors.mapped()})
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
                res.redirect("/admin/testimonial/create");
            });
        }



        // /

        const testimonial=new TestimonialModel({
            title:req.body.title,
            slug:req.body.slug,
            details:req.body.details,
            image:filePath
        });

        testimonial.save((err,newtestimonial)=>{
            if(err){
                res.redirect("/admin/testimonial/create");
            }
            res.redirect("/admin/testimonials");
        });



        // return res.json(req.body);
        // res.render('index', { title: 'Testimonials' });
    },
    update:(req, res, next)=> {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            // return res.redirect("/admin/testimonial/"+req.params.id+"/edit");
            return res.render("backend/testimonial/edit",{layout:"backend/layout",errors:errors.mapped()});
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
                    res.redirect("/admin/testimonial/"+req.params.id+"/edit");
            });
        }
        const testimonialObj={
            title:req.body.title,
            slug:req.body.slug,
            details:req.body.details
        };

        if(filePath){
            testimonialObj.image=filePath;
        }

        // /
        TestimonialModel.findByIdAndUpdate(req.params.id,testimonialObj,(err,testimonial)=>{
            if(err){
                res.redirect("/admin/testimonial/"+req.params.id+"/edit");
            }
            res.redirect("/admin/testimonials");
        });

    }
}