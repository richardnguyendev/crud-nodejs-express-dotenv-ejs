const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// create, find, update, delete
router.get('/department', departmentController.viewall);
router.get('/department/add-department', departmentController.form);
router.post('/department/add-department', departmentController.create);
router.get('/department/edit-department/:id', departmentController.edit);
router.post('/department/edit-department/:id', departmentController.update);
router.get('/department/view-department/:id', departmentController.view);
router.get('/department/:id', departmentController.delete);

module.exports = router;