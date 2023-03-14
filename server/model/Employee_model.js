const mongoose = require('mongoose');
var employee = new mongoose.Schema({

EmployeeId: {
    type: String,
    required: true,
    unique: true
  },
  EmployeeName: {
    type: String,
    required: true
  },
  Department: {
    type: String,
    required: true
  },
  Date_of_Joining: {
    type: Date,
    required: true
  },
  PhotoFileName: {
    type: String,
    required:true
  }
},{collection:'Employee'});
const employedb = mongoose.model('employedb',employee)
module.exports = employedb;

