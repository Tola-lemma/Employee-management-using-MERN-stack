const Userdb = require("../model/user");

exports.CreateUser = (req,res)=>{
  if(!req.body){
    res.status(404).send({message:"Fields cannot be Empty!"});
    return
  }
  const newUser = new Userdb({
    email:req.body.email,
    password:req.body.password
  })
  newUser.save()
       .then((data)=>{
        res.status(201).json(data)
       })
       .catch((err)=>{
        res.status(500).json({ message: 'while creating User' });
    });
}
exports.UserLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const foundUser = await Userdb.findOne({ email: email });
      if (foundUser && foundUser.password === password) {
        res.status(200).send('Successfully login!');
      } else {
        res.status(401).send('Invalid email or password.');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error.');
    }
  };
  