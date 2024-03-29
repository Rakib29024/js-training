
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {engine}=require('express-handlebars');
const fileUpload = require('express-fileupload');
const helpers=require('./lib/helper');
var passport = require("passport"),
    session = require('express-session');
require('./config/passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
require('./config/database');

const {SECRATE} =require('./config/index');

var app = express();
//file upload
app.use(fileUpload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('.hbs', engine(
  {
    extname: '.hbs',
    defaultView:'frontend/index',
    layoutsDir:__dirname+'/views/layouts',
    defaultLayout:'frontend/layout',
    partialsDir:__dirname+'/views/partials',
    helpers:helpers
  }
));


// / passport setup
//set passport session
app.use(session({
  name: 'secrate-session',
  secret: SECRATE,
  saveUninitialized: true,
  resave: true,
  cookie:{
    maxAge:1000*60*60*24
  }
}));


//passport initialize
app.use(passport.initialize()); 
app.use(passport.session()); 



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.get("*",(rea,res)=>{
  res.json({error:"Page not found"});
})

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port`)
})
 
module.exports = app;
