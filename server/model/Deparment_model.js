const mongoose = require('mongoose');

var department = new mongoose.Schema({
    DepartmentId: {
          type: String,
          required: true,
          unique: true
        },
        DepartmentName: {
          type: String,
          required: true
        }
      },{ collection: 'Department' });
      
const Departdb = mongoose.model('Departdb', department)
module.exports = Departdb;