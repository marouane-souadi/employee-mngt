const express = require('express')
const {getAll, add} = require("../controllers/employees");
const {loginRequired} = require("../middlewares/auth");
const {validate} = require("express-validation");
const employeesValidation = require("../validations/employees");

const router = express.Router()

router.get('/', loginRequired, getAll)
router.post('/', loginRequired, validate(employeesValidation.add), add)


module.exports = router