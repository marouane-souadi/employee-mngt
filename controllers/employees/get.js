const Employee = require("../../models/employee");
const get = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const employee = await Employee.findById(req.params.id)
        console.log(employee)
        return res.json(employee)
    } catch (err) {
        next({
            status: 400,
            message: err.message
        })
    }
}

module.exports = get