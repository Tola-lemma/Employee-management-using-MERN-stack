const mongoose = require('mongoose');
const validator = require('validator');
var User = new mongoose.Schema({
   email:{
    type:String,
    required:true,
    unique:true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: 'Invalid email address',
    },
   },
   password:{
    type:String,
    required:true,
    minlength: 4,
   }
},
{collection:'Userdbs'})

const Userdb=mongoose.model('Userdb',User)
module.exports = Userdb;