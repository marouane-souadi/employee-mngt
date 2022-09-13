const Employee = require("../models/employee")
const config = require("../config");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    try {
        const employee = await Employee.create(req.body)
        console.log('Employee created: ', employee)
        const {id, email, username, firstname, lastname} = employee
        const token = await jwt.sign({
            id,
            username
        }, config.SECRET_KEY)
        return res.status(200).json({
            id, email, username, firstname, lastname, token
        })
    } catch (err) {
        console.log('Signup route error', err)
        if (err.code === 11000) {
            err.message = 'Sorry, that username is already taken'
        }
        next({
            status: 400,
            message: err.message
        })
    }
}

module.exports = {
    register,
}