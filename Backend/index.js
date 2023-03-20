const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./server/database/connection');
const path = require('path');
var fileUpload = require('express-fileupload')
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(fileUpload());
app.use(cors());
dotenv.config({path:'config.env'})
app.use(morgan('tiny'));
connectDB();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.get('/', (req, res) => {
  res.send("Welcome to Employe management! ");
})
//API
app.use('/',require('./server/route/router'))
app.listen(PORT,()=>console.log(`Server is running on port ${PORT} ...`));

