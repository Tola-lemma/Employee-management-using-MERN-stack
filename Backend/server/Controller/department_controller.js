const Departdb = require('../model/Deparment_model')
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
      res.status(404).send({message:err.message ||`cannot update Department with identified id ${id} or maybe user not found!`});
  } else{
      res.send(data);
  }
 })
 .catch(err =>{
res.status(500).send({message: err.message || `error updating Department information`});
 })
}

exports.deleteDepartment = (req,res)=>{
  const id = req.params.id
  Departdb.findByIdAndDelete(id)
  .then(data=>{
    if(!data){
        res.status(404).send({message:`Cannot delete Department with id ${id} maybe id is wrong!`});
    }else{
        res.send({message:`Department was deleted successfully!`});
    }
   })
   .catch(err=>{
    res.status(500).send({message:`Could not delete Department with id ${id}`});
   })
}