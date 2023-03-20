const mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');
var User = new mongoose.Schema({
   email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true
   }
},
{collection:'Userdbs'})

User.plugin(encrypt, { secret: process.env.SECRET,encryptedFields: ['password'] });

const Userdb=mongoose.model('Userdb',User)
module.exports = Userdb;