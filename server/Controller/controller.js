const Departdb = require('./../model/Deparment_model')

exports.getAllDepartment=(req,res)=>{
  Departdb.find()
   .then(departement=>{
    res.send(departement);
   })
   .catch(err=>{
    res.status(500).send({message:err.message||`Error while retrieving department information`})
   });
}


