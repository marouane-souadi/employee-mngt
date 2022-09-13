const express = require('express')
const {validate} = require('express-validation')
const authController = require('../controllers/auth')
const authValidation = require('../validations/auth')

const router = express.Router()


router.post('/register', validate(authValidation.register), authController.register)

module.exports = router