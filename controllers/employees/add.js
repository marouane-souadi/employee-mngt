const Employee = require("../../models/employee");

const add = async (req, res, next) => {
    try {
        const employee = await Employee.create(req.body)
        console.log('Employee created: ', employee)
        const {id, email, username, firstname, lastname, address, role} = employee
        return res.status(200).json({
            id, email, username, firstname, lastname, address, role
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
module.exports = add