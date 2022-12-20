const { validationResult } = require('express-validator');
const SliderModel=require('../models/Slider');
const fs=require("fs");

module.exports={
    index:(req, res, next)=> {
        // slider list
        SliderModel.find((err,docs)=>{
            if(err){
                res.render("error",{errorStatus:500});
            }
            const data=[];
            docs.forEach(element => {
                data.push({
                    title:element.title,
                    
                    image:element.image,
                    id:element._id
                });
            });
            // return res.json({sliders:docs});
            res.render('backend/slider/index', { title: 'sliders',layout:"backend/layout",data:data });
        });

    },
    create:(req, res, next)=> {
        // slider list
        res.render('backend/slider/create', { title: 'sliders',layout:'backend/layout' });
    },
    edit:(req, res, next)=> {
        //json
        // res.json({'id':req.params.id});
        SliderModel.findById(req.params.id)
        .then((slider)=>{
            // slider list
            const details={
                title:slider.title,
                
                id:slider._id,
                image:slider.image
            }
            // console.log(details);
            res.render('backend/slider/edit', { title: 'slider Edit',layout:"backend/layout",slider:details });
        })
    },
    show:(req, res, next)=> {
        //json
        // res.json({'id':req.params.id});
        SliderModel.findById(req.params.id)
        .then((slider)=>{
            
            // slider list
            const details={
                title:slider.title,
                
                details:slider.details,
                image:slider.image
            }
            // console.log(details);
            res.render('backend/slider/show', { title: 'slider',layout:"backend/layout",slider:details });
        })
        .catch((err)=>{
            res.json({"error":"Somethiong went wrong!"});
        })


    },
    delete:(req, res, next)=> {
        SliderModel.findByIdAndRemove(req.params.id,(err,slider)=>{
            if(err){
                res.render("error",{errorStatus:500});
            }
            // /delete file
            try {
                fs.unlink("public/"+slider.image,()=>{});
            } catch (error) {
                
            }
            res.redirect("/admin/sliders");
        });
        
    },
    store:(req, res, next)=> {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.render("backend/slider/create",{layout:"backend/layout",errors:errors.mapped()})
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
                res.redirect("/admin/slider/create");
            });
        }



        // /

        const slider=new SliderModel({
            title:req.body.title,

            image:filePath
        });

        slider.save((err,newslider)=>{
            if(err){
                res.redirect("/admin/slider/create");
            }
            res.redirect("/admin/sliders");
        });



        // return res.json(req.body);
        // res.render('index', { title: 'sliders' });
    },
    update:(req, res, next)=> {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            // return res.redirect("/admin/slider/"+req.params.id+"/edit");
            return res.render("backend/slider/edit",{layout:"backend/layout",errors:errors.mapped()});
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
                    res.redirect("/admin/slider/"+req.params.id+"/edit");
            });
        }
        const sliderObj={
            title:req.body.title,
        };

        if(filePath){
            sliderObj.image=filePath;
        }

        // /
        SliderModel.findByIdAndUpdate(req.params.id,sliderObj,(err,slider)=>{
            if(err){
                res.redirect("/admin/slider/"+req.params.id+"/edit");
            }
            res.redirect("/admin/sliders");
        });

    }
}