const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// create, find, update, delete
router.get('/employee', employeeController.viewall);
router.post('/employee', employeeController.find);
router.get('/employee/add-employee', employeeController.form);
router.post('/employee/add-employee', employeeController.create);
router.get('/employee/edit-employee/:id', employeeController.edit);
router.post('/employee/edit-employee/:id', employeeController.update);
router.get('/employee/view-employee/:id', employeeController.view);
router.get('/employee/:id', employeeController.delete);

module.exports = router;