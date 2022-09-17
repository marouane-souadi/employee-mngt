const express = require('express')
const {getAll, add, importCSV} = require("../controllers/employees");
const {loginRequired} = require("../middlewares/auth");
const {validate} = require("express-validation");
const employeesValidation = require("../validations/employees");
const upload = require("../middlewares/upload");

const router = express.Router()

router.get('/', loginRequired, getAll)
router.post('/', loginRequired, validate(employeesValidation.add), add)
router.post('/import-csv', loginRequired, upload.single('csv'), importCSV)


module.exports = router