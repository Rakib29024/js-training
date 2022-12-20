const { validationResult } = require('express-validator');
const ContactUsModel=require('../models/ContactUs');
const fs=require("fs");

module.exports={
    index:(req, res, next)=> {
        // contact_us list
        ContactUsModel.find((err,docs)=>{
            if(err){
                res.render("error",{errorStatus:500});
            }
            const data=[];
            docs.forEach(element => {
                data.push({
                    title:element.title,
                    details:element.details,
                    icon:element.icon,
                    id:element._id
                });
            });
            // return res.json({contact_us:docs});
            res.render('backend/contact_us/index', { title: 'contact_us',layout:"backend/layout",data:data });
        });

    },
    create:(req, res, next)=> {
        // contact_us list
        res.render('backend/contact_us/create', { title: 'contact_us',layout:'backend/layout' });
    },
    edit:(req, res, next)=> {
        //json
        // res.json({'id':req.params.id});
        ContactUsModel.findById(req.params.id)
        .then((contact_us)=>{
            // contact_us list
            const details={
                title:contact_us.title,
                
                id:contact_us._id,
                details:contact_us.details,
                icon:contact_us.icon
            }
            // console.log(details);
            res.render('backend/contact_us/edit', { title: 'contact_us Edit',layout:"backend/layout",contact_us:details });
        })
    },
    show:(req, res, next)=> {
        //json
        // res.json({'id':req.params.id});
        ContactUsModel.findById(req.params.id)
        .then((contact_us)=>{
            
            // contact_us list
            const details={
                title:contact_us.title,
                
                details:contact_us.details,
                icon:contact_us.icon
            }
            // console.log(details);
            res.render('backend/contact_us/show', { title: 'contact_us',layout:"backend/layout",contact_us:details });
        })
        .catch((err)=>{
            res.json({"error":"Somethiong went wrong!"});
        })


    },
    delete:(req, res, next)=> {
        ContactUsModel.findByIdAndRemove(req.params.id,(err,contact_us)=>{
            if(err){
                res.render("error",{errorStatus:500});
            }
            // /delete file
            try {
                fs.unlink("public/"+contact_us.icon,()=>{});
            } catch (error) {
                
            }
            res.redirect("/admin/contact-us");
        });
        
    },
    store:(req, res, next)=> {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.render("backend/contact_us/create",{layout:"backend/layout",errors:errors.mapped()})
            // return res.json({errors:errors.mapped()});
        }

        let sampleFile,filePath;
        if (req.files || Object.keys(req.files).length !== 0) {
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            sampleFile = req.files.icon;
            let rnd=new Date().valueOf();
            filePath='upload/' +rnd+sampleFile.name;
        
            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv('public/'+filePath, function(err) {
            if (err)
                res.redirect("/admin/contact-us/create");
            });
        }



        // /

        const contact_us=new ContactUsModel({
            title:req.body.title,
            
            details:req.body.details,
            icon:filePath
        });

        contact_us.save((err,newcontact_us)=>{
            if(err){
                res.redirect("/admin/contact-us/create");
            }
            res.redirect("/admin/contact-us");
        });



        // return res.json(req.body);
        // res.render('index', { title: 'contact_us' });
    },
    update:(req, res, next)=> {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            // return res.redirect("/admin/contact-us/"+req.params.id+"/edit");
            return res.render("backend/contact_us/edit",{layout:"backend/layout",errors:errors.mapped()});
        }
        let sampleFile,filePath;

        if (req.files) {
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            sampleFile = req.files.icon;
            let rnd=new Date().valueOf();
            filePath='upload/' +rnd+sampleFile.name;
            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv('public/'+filePath, function(err) {
                if (err)
                    res.redirect("/admin/contact-us/"+req.params.id+"/edit");
            });
        }
        const contact_usObj={
            title:req.body.title,
            
            details:req.body.details
        };

        if(filePath){
            contact_usObj.icon=filePath;
        }

        // /
        ContactUsModel.findByIdAndUpdate(req.params.id,contact_usObj,(err,contact_us)=>{
            if(err){
                res.redirect("/admin/contact-us/"+req.params.id+"/edit");
            }
            res.redirect("/admin/contact-us");
        });

    }
}