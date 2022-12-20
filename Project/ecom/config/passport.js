const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

var User=require('../models/User');
const {checkPassword} = require('../lib/passwordValid');

passport.serializeUser((user, done) =>{
  done(null, user.id);
});

passport.deserializeUser((id, done) =>{
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findByUsername(username, (err, user) => {
      // console.log(user.hash_salt())
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!checkPassword(password, user.password, user.salt)) {
        return done(null, false);
      } //bug
      return done(null, user);
    });
  }));