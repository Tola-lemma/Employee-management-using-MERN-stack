const mongoose = require('mongoose');

var department = new mongoose.Schema({
    DepartmenId: {
          type: Number,
          required: true,
          unique: true
        },
        DeparmentName: {
          type: String,
          required: true
        }
      },{ collection: 'Department' });
const Departdb = mongoose.model('Departdb', department)
module.exports = Departdb;