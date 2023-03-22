const employedb = require('../model/Employee_model')
const uuid = require('uuid')
exports.getAllEmployee= async (req,res)=>{
  try{  
  const employee = await employedb.find()
     res.json(employee);
  }catch(err){
     res.status(500).send({message:err.message||`Error while retrieving Employee information`})
    }
 }
 exports.createEmployee = async (req, res) => {
   const {EmployeeName,Department,Date_of_Joining,PhotoFileName} = req.body
   if (!EmployeeName&& !Department && !Date_of_Joining && !PhotoFileName) {
     return res.status(400).json({ message: 'Content cannot be empty!' });
   }
try{
  const employee = new employedb({
    EmployeeId: uuid.v4().slice(0, 4),
    EmployeeName,
    Department,
    Date_of_Joining,
    PhotoFileName,
  });

  const data = await employee.save()
      res.status(201).json(data);

  }catch(err)  {
      res.status(500).json({ message: 'Error adding Employee to database' });
    }
}

exports.UpdateEmployee = async (req,res)=>{
  if(!req.body){
      return res
           .status(404)
           .send({message:err.message ||`Error while updating the data cannot be empty`});
   }
  try{  
    const id =req.params.id;
  const data = await employedb.findByIdAndUpdate(id,req.body)
    if(data){
      res.json(data);
    } else{
      res.status(404).send({message:err.message ||`cannot update Employee with identified id ${id} or maybe user not found!`});
    }
  }catch(err){
  res.status(500).send({message: err.message || `error updating Employee information`});
   }
  }
  
  exports.deleteEmployee = async (req,res)=>{
  try{  
    const id = req.params.id
   const data = await employedb.findByIdAndDelete(id)
      if(!data){
          res.status(404).send({message:`Cannot delete Employee with id ${id} maybe id is wrong!`});
      }else{
          res.json({message:`Employee was deleted successfully!`});
      }
    }catch(err){
      res.status(500).send({message:`Could not delete Employee with id ${id}`});
     }
  }