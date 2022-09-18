const express = require('express')
const employeesController = require("../controllers/employees");
const {loginRequired} = require("../middlewares/auth");
const {validate} = require("express-validation");
const employeesValidation = require("../validations/employees");
const upload = require("../middlewares/upload");

const router = express.Router()

router.get('/', loginRequired, employeesController.getAll)
router.post('/', loginRequired, validate(employeesValidation.add), employeesController.add)
router.post('/import-csv', loginRequired, upload.single('csv'), employeesController.importCSV)
router.delete('/:id', loginRequired, employeesController.deleteItem)
router.get('/:id', employeesController.get)
router.post('/:id', employeesController.edit)


module.exports = router