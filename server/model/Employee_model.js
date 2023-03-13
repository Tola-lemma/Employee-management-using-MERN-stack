const mongoose = require('mongoose');
var employee = new mongoose.Schema({

EmployeeId: {
    type: Number,
    required: true,
    unique: true
  },
  EmployeeName: {
    type: String,
    required: true
  },
  Deparment: {
    type: String,
    required: true
  },
  Date_of_Joining: {
    type: Date,
    required: true
  },
  PhotoFileName: {
    type: Buffer
  }
},{collection:'Employee'});
const employedb = mongoose.model('employedb',employee)
module.exports = employedb;

