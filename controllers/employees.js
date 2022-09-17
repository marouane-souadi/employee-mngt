const Employee = require("../models/employee");

const getAll = async (req, res) => {
    const employees = await Employee.find({}).select('-password')
    res.json(employees)
}

const add = async (req, res, next) => {
    try {
        const employee = await Employee.create(req.body)
        console.log('Employee created: ', employee)
        const {id, email, username, firstname, lastname} = employee
        return res.status(200).json({
            id, email, username, firstname, lastname
        })
    } catch (err) {
        console.log('Employee creation error', err)
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
    getAll,
    add,
}