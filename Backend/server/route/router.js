const express = require('express');
const router = express.Router();
const Authent = require('../middleware/auth')
//department
const departmentController = require('../Controller/department_controller')
router.get('/api/department',Authent,departmentController.getAllDepartment)
router.post('/api/department',Authent,departmentController.createDepartment)
router.put('/api/department/:id',Authent,departmentController.UpdateDepartment)
router.delete('/api/department/:id',Authent,departmentController.deleteDepartment)
//employee
const employeeController = require('../Controller/Employee_controller')
router.get('/api/employee',Authent,employeeController.getAllEmployee)
router.post('/api/employee',Authent,employeeController.createEmployee)
router.put('/api/employee/:id',Authent,employeeController.UpdateEmployee)
router.delete('/api/employee/:id',Authent,employeeController.deleteEmployee)
//fileuploads
const fileUploading = require('../Controller/fileupload')
router.post('/api/fileupload',fileUploading.EmployeeProfile)
//user
const user = require('../Controller/user_controller');
router.post('/api/register',user.CreateUser)
router.post('/api/login',user.UserLogin);
router.get('/api/user',Authent,user.getUser)
module.exports = router