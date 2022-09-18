const Employee = require("../../models/employee");

const edit = async (req, res, next) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body)
        console.log(employee)
        return res.json(employee)
    } catch (err) {
        next({
            status: 400,
            message: err.message
        })
    }
}

module.exports = edit