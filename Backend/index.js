const express = require('express');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./server/database/connection');
var fileUpload = require('express-fileupload')
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(fileUpload());
app.use(cors());
dotenv.config({path:'config.env'})
app.use(morgan('tiny'));
connectDB();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:true}))
app.get('/', (req, res) => {
  res.send("Welcome to Employe management! ");
})
//API
app.use('/',require('./server/route/router'))
app.listen(PORT,()=>console.log(`Server is running on port ${PORT} ...`));

