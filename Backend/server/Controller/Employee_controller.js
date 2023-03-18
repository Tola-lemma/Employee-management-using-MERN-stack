const employedb = require('../model/Employee_model')
const uuid = require('uuid')
exports.getAllEmployee=(req,res)=>{
    employedb.find()
    .then(employee=>{
     res.json(employee);
    })
    .catch(err=>{
     res.status(500).send({message:err.message||`Error while retrieving Employee information`})
    });
 }
 exports.createEmployee = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Content cannot be empty!' });
  }

  const employee = new employedb({
    EmployeeId: uuid.v4().slice(0, 4),
    EmployeeName: req.body.EmployeeName,
    Department: req.body.Department,
    Date_of_Joining: req.body.Date_of_Joining,
    PhotoFileName: req.body.PhotoFileName,
  });

  employee.save()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error adding Employee to database' });
    });
}

exports.UpdateEmployee = (req,res)=>{
    if(!req.body){
      return res
           .status(404)
           .send({message:err.message ||`Error while updating the data cannot be empty`});
   }
    const id =req.params.id;
  employedb.findByIdAndUpdate(id,req.body)
       .then(data=>{
    if(data){
      res.json(data);
    } else{
      res.status(404).send({message:err.message ||`cannot update Employee with identified id ${id} or maybe user not found!`});
    }
   })
   .catch(err =>{
  res.status(500).send({message: err.message || `error updating Employee information`});
   })
  }
  
  exports.deleteEmployee = (req,res)=>{
    const id = req.params.id
    employedb.findByIdAndDelete(id)
    .then(data=>{
      if(!data){
          res.status(404).send({message:`Cannot delete Employee with id ${id} maybe id is wrong!`});
      }else{
          res.json({message:`Employee was deleted successfully!`});
      }
     })
     .catch(err=>{
      res.status(500).send({message:`Could not delete Employee with id ${id}`});
     })
  }