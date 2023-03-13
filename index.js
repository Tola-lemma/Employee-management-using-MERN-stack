const express = require('express');
const bodyparser = require('body-parser');
const client = require('./server/connection')
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:true}))


app.get('/', (req, res) => {
  res.send("Welcome to Employe management! ");
})
app.use('/api/department',require('./Controller/controller'))
app.listen(PORT,()=>console.log(`Server is running on port ${PORT} ...`));

