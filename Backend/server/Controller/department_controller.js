const Departdb = require('../model/Deparment_model')
const uuid = require('uuid')
exports.getAllDepartment=async(req,res)=>{
  try{
 const departement = await Departdb.find()
    res.json(departement);
  }
  catch(err){
    res.status(500).send({message:err.message||`Error while retrieving department information`})
   };
}
exports.createDepartment = async (req,res)=>{
    if(!req.body){
      res.status(400).send({message:'Content cannot be empty!'});
      return
  }
  try{
  const department = new Departdb({
        DepartmentId: uuid.v4().slice(0,4),
        DepartmentName:req.body.DepartmentName
      })
  const data = await department.save()
            res.status(201).json(data);
    }   
        catch(err){
        res.status(500).send('Error adding department to database');
        }
}

exports.UpdateDepartment = async (req,res)=>{
  if(!req.body){
    return res
         .status(404)
         .send({message:err.message ||`Error while updating the data cannot be empty`});
 }
 try{
  const id =req.params.id;
const data = await Departdb.findByIdAndUpdate(id,req.body)
  if(!data){
      res.status(404).send({message:err.message ||`cannot update Department with identified id ${id} or maybe user not found!`});
  } else{
      res.json(data);
  }
}
catch(err){
res.status(500).send({message: err.message || `error updating Department information`});
 }
}

exports.deleteDepartment = async (req,res)=>{
  try{
  const id = req.params.id
 const data= await Departdb.findByIdAndDelete(id)
    if(!data){
        res.status(404).send({message:`Cannot delete Department with id ${id} maybe id is wrong!`});
    }else{
        res.json({message:`Department was deleted successfully!`});
    }
  }
   catch(err){
    res.status(500).send({message:`Could not delete Department with id ${id}`});
   }
}