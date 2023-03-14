exports.EmployeeProfile = (req,res)=>{
    if(req.files){
    //    console.log(req.files);
       var file = req.files.file
       var filename = file.name
    //    console.log(filename);
       file.mv('./assets/uploads/'+filename,(err)=>{
         if(err){
           res.send(err)
         }else{
           res.status(200).send('File Uploaded!')
         }
       })
     }
   }