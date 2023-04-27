var mongoose  = require('mongoose');
var passport = require("passport");

const {genPassword}=require('../../lib/passwordValid');

var User=mongoose.model('User');
const { validationResult } = require('express-validator');

module.exports = {
    //login
    login (req,res,next){
        res.render('forntend/auth/login', {title: 'Blog | Login' });
    },
    //login post
    post_login (req,res,next){
        const errors=validationResult(req);
        var data=req.body;
        if(!errors.isEmpty()){
            res.send({errors:errors.mapped(),formdata:data});
        }else{
            passport.authenticate('local')(req, res, () => {

                User.findOne({
                  username: req.body.username
                }, (err, person) => {
                  if(err){
                    return res.json({
                      status: 'Login Failed!'
                    });
                  }
                  return res.json({
                    success: true,
                    status: 'Login Successful!',
                    user:person
                  });
                });
              })
        }
        
    },
    //register
    register (req,res,next){
        res.render('forntend/auth/register', {title: 'ecom | Registration' });
    },
    //register post
    async post_register (req,res,next){
        const errors=validationResult(req);
        var data=req.body;
        if(!errors.isEmpty()){
            res.send({errors:errors.mapped(),formdata:data});
        }else{
            var newUser=new User({
                username:req.body.username,
                // type:req.body.type,
                email:req.body.email,
                contact:req.body.contact,
                password:genPassword(req.body.password),
                // slug:slugify(req.body.username)
            });
            await User.register(newUser,req.body.password,function(err,user){
                if(err){
                    return res.status(500).json({message:"error during data insertion:",err});
                }
                console.log("data inserted");
                passport.authenticate('local')(req, res, (err) => {
                  if(err){
                    return res.json({message:"Authentication failed"});
                  }
                  return res.status(201).json({success: "Autheticated"});
                });
            });
        }

    },
    //logout
    logout (req,res,next){
        if(req.isAuthenticated()) {
          req.logout();
          req.session.destroy((err) => {
            if (err) {
              console.log(err);
            } else {
              res.clearCookie('session-id');
              res.json({
                message: 'You are successfully logged out!'
              });
            }
          });
        } else {
          var err = new Error('You are not logged in!');
          err.status = 403;
          next(err);
        }
        // req.logout();
        // res.status(200).send({message:'User Logged Out'})
    }
}