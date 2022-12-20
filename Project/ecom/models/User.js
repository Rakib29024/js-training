//Require Mongoose
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose'); 

//Define a schema
var Schema = mongoose.Schema;

var UserModelSchema = new Schema(
  {
    username: {type: String, required: true},
    // type: {type: String, required: true,default: 'user'},
    email: {type: String, required: true},
    contact: {type: String, required: true},
    // hash:{type:String},
    password:{type:String},
    // salt:{type:String}
  },
  { 
    timestamps:true 
  }
);
//methods
// UserModelSchema.methods.hash_salt = ()=> {
//   return this.password;
// };
// plugin for passport-local-mongoose 
UserModelSchema.plugin(passportLocalMongoose); 
// export schema
module.exports = mongoose.model('User', UserModelSchema);