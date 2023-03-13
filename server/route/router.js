const express = require('express');
const router = express.Router();
const controller = require('../Controller/controller')
router.get('/api/department',controller.getAllDepartment)
router.post('/api/department',controller.createDepartment)

module.exports = router