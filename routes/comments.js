const express = require('express')
const {loginRequired} = require("../middlewares/auth");
const commentController = require("../controllers/comments")
const {validate} = require("express-validation");
const commentValidations = require("../validations/comments")

const router = express.Router({mergeParams: true})

router.post('/', loginRequired, validate(commentValidations.add), commentController.add)
router.get('/', loginRequired, commentController.listEmployeeComments)

module.exports = router