const { validationResult } = require('express-validator');
const TeamModel=require('../models/Team');
const fs=require("fs");

module.exports={
    index:(req, res, next)=> {
        // team list
        TeamModel.find((err,docs)=>{
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
            // return res.json({teams:docs});
            res.render('backend/team/index', { title: 'Teams',layout:"backend/layout",data:data });
        });

    },
    create:(req, res, next)=> {
        // team list
        res.render('backend/team/create', { title: 'Teams',layout:'backend/layout' });
    },
    edit:(req, res, next)=> {
        //json
        // res.json({'id':req.params.id});
        TeamModel.findById(req.params.id)
        .then((team)=>{
            // team list
            const details={
                title:team.title,
                slug:team.slug,
                id:team._id,
                details:team.details,
                image:team.image
            }
            // console.log(details);
            res.render('backend/team/edit', { title: 'Team Edit',layout:"backend/layout",team:details });
        })
    },
    show:(req, res, next)=> {
        //json
        // res.json({'id':req.params.id});
        TeamModel.findById(req.params.id)
        .then((team)=>{
            
            // team list
            const details={
                title:team.title,
                slug:team.slug,
                details:team.details,
                image:team.image
            }
            // console.log(details);
            res.render('backend/team/show', { title: 'Team',layout:"backend/layout",team:details });
        })
        .catch((err)=>{
            res.json({"error":"Somethiong went wrong!"});
        })


    },
    delete:(req, res, next)=> {
        TeamModel.findByIdAndRemove(req.params.id,(err,team)=>{
            if(err){
                res.render("error",{errorStatus:500});
            }
            // /delete file
            try {
                fs.unlink("public/"+team.image,()=>{});
            } catch (error) {
                
            }
            res.redirect("/admin/teams");
        });
        
    },
    store:(req, res, next)=> {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.render("backend/team/create",{layout:"backend/layout",errors:errors.mapped()})
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
                res.redirect("/admin/team/create");
            });
        }



        // /

        const team=new TeamModel({
            title:req.body.title,
            slug:req.body.slug,
            details:req.body.details,
            image:filePath
        });

        team.save((err,newteam)=>{
            if(err){
                res.redirect("/admin/team/create");
            }
            res.redirect("/admin/teams");
        });



        // return res.json(req.body);
        // res.render('index', { title: 'Teams' });
    },
    update:(req, res, next)=> {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            // return res.redirect("/admin/team/"+req.params.id+"/edit");
            return res.render("backend/team/edit",{layout:"backend/layout",errors:errors.mapped()});
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
                    res.redirect("/admin/team/"+req.params.id+"/edit");
            });
        }
        const teamObj={
            title:req.body.title,
            slug:req.body.slug,
            details:req.body.details
        };

        if(filePath){
            teamObj.image=filePath;
        }

        // /
        TeamModel.findByIdAndUpdate(req.params.id,teamObj,(err,team)=>{
            if(err){
                res.redirect("/admin/team/"+req.params.id+"/edit");
            }
            res.redirect("/admin/teams");
        });

    }
}