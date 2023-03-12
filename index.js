const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to Employe management! ");
})
app.listen(PORT,()=>console.log(`Server is running on port ${PORT} ...`));