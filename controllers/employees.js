const Employee = require("../models/employee");

const getAll = async (req, res) => {
    const employees = await Employee.find({}).select('-password')
    res.json(employees)
}

module.exports = {
    getAll,
}