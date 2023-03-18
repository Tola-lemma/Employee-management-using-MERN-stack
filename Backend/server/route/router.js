const express = require('express');
const router = express.Router();
//department
const departmentController = require('../Controller/department_controller')
router.get('/api/department',departmentController.getAllDepartment)
router.post('/api/department',departmentController.createDepartment)
router.put('/api/department/:id',departmentController.UpdateDepartment)
router.delete('/api/department/:id',departmentController.deleteDepartment)
//employee
const employeeController = require('../Controller/Employee_controller')
router.get('/api/employee',employeeController.getAllEmployee)
router.post('/api/employee',employeeController.createEmployee)
router.put('/api/employee/:id',employeeController.UpdateEmployee)
router.delete('/api/employee/:id',employeeController.deleteEmployee)
//fileuploads
const fileUploading = require('../Controller/fileupload')
router.post('/api/fileupload',fileUploading.EmployeeProfile)


module.exports = router