
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({path:'config.env'})
// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
// Database Name
const dbName = 'EMPLOYEE_MANAGEMENT_API';
 main = async()=> {
  await client.connect();
  console.log('Connected successfully to server');
  return 'done.';
}
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());


  module.exports= {client,dbName}