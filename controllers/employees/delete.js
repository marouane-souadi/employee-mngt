const Employee = require("../../models/employee");

const deleteItem = async (req, res, next) => {
    try {
        const userId = req.params.id
        if (req.userId === userId) {
            console.log(userId)
            return next({ message: "Logged in employee can't be deleted" })
        }
        Employee.findOneAndDelete(req.params.id, (err, item) => {
            if (err) {
                next(err)
            } else {
                return res.json({id: req.params.id})
            }
        })
    } catch (err) {
        next({
            status: 400,
            message: err.message
        })
    }
}
module.exports = deleteItem