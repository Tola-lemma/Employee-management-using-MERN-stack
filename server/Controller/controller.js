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

// router.post('/', async(req,res)=>{
//     try {
//         await client.connect();
//         const db = client.db(dbName);
//         const numOfDocs = await db.collection('Department').countDocuments();
//         const result = await db.collection('Department').insertOne({
//           DepartmentId: numOfDocs + 1,
//           DepartmentName: req.body
//         });
//         client.close();
//         res.status(201).send('Added department successfully!');
//       } catch (error) {
//         console.error(error);
//         res.status(500).send('Error adding department to database');
//       }
//   })
// module.exports = router;