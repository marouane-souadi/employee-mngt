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

const login = async (req, res, next) => {
    try {
        const employee = await Employee.findOne({username: req.body.username})
        const {id, username, firstname, email, lastname} = employee
        const isMatch = await employee.comparePassword(req.body.password)
        if (isMatch) {
            const token = jwt.sign({
                id,
                username,
            }, config.SECRET_KEY)
            res.status(200).json({
                id,
                username,
                email,
                firstname,
                lastname,
                token
            })
        } else {
            return next({
                status : 400,
                message : 'Invalid Email/Password'
            })
        }
    } catch (err) {
        return next({
            status : 400,
            message : 'Invalid Email/Password error'
        })
    }
}

module.exports = {
    register,
    login,
}