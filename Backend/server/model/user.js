const mongoose = require('mongoose');
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

const Userdb=mongoose.model('Userdb',User)
module.exports = Userdb;