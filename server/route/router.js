const express = require('express');
const router = express.Router();
const controller = require('../Controller/controller')
router.get('/api/department',controller.getAllDepartment)
router.post('/api/department',controller.createDepartment)
router.put('/api/department/:id',controller.UpdateDepartment)
module.exports = router