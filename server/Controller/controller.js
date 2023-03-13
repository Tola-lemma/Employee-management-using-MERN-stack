const Departdb = require('./../model/Deparment_model')
const uuid = require('uuid')
exports.getAllDepartment=(req,res)=>{
  Departdb.find()
   .then(departement=>{
    res.send(departement);
   })
   .catch(err=>{
    res.status(500).send({message:err.message||`Error while retrieving department information`})
   });
}
exports.createDepartment = (req,res)=>{
    if(!req.body){
      res.status(400).send({message:'Content cannot be empty!'});
      return
  }
  const department = new Departdb({
        DepartmentId: uuid.v4().slice(0,4),
        DepartmentName:req.body.DepartmentName
      })
  department.save(department)
            .then(data=>{
            res.send(data);
            res.status(201).send('Added department successfully!');
           })
        .catch(err =>{
        res.status(500).send('Error adding department to database');
        })
}

exports.UpdateDepartment = (req,res)=>{
  if(!req.body){
    return res
         .status(404)
         .send({message:err.message ||`Error while updating the data cannot be empty`});
 }
  const id =req.params.id;
Departdb.findByIdAndUpdate(id,req.body)
     .then(data=>{
  if(!data){
      res.status(404).send({message:err.message ||`cannot update user with identified id ${id} or maybe user not found!`});
  } else{
      res.send(data);
  }
 })
 .catch(err =>{
res.status(500).send({message: err.message || `error updating user information`});
 })
}