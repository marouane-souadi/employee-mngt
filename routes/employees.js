const express = require('express')
const {getAll} = require("../controllers/employees");
const {loginRequired} = require("../middlewares/auth");

const router = express.Router()

router.get('/', loginRequired, getAll)

module.exports = router