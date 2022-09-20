const Comment = require("../models/comment")

const add = async (req, res, next) => {
    try {
        const comment = await Comment.create({text: req.body.text, employee: req.params.employeeId, createdBy: req.userId})
        await comment.populate('createdBy')
        console.log('Employee created: ', comment)

        return res.status(200).json(comment)
    } catch (err) {
        console.log('Comment creation error', err)
        next({
            status: 400,
            message: err.message
        })
    }
}

const listEmployeeComments = async (req, res, next) => {
    const comments = await Comment.find({employee: req.params.employeeId}).populate({
        path: 'createdBy',
        options: {
            sort: {
                'createdAt': 'descending'
            }
        }
    })
    res.json(comments)
}

module.exports = {
    add,
    listEmployeeComments,
}