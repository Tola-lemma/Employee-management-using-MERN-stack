const express = require('express');
const router = express.Router();
const {client,dbName} = require('../server/connection')
router.get('/',async (req,res)=>{
    await client.connect();
    const db = client.db(dbName);
  const collection = db.collection('Department');
  const findResult = await collection.find({}).toArray();
      res.send(findResult);
  })

module.exports = router;