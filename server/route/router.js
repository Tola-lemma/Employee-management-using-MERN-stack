const express = require('express');
const router = express.Router();
const controller = require('../Controller/controller')
router.get('/api/department',controller.getAllDepartment)


module.exports = router