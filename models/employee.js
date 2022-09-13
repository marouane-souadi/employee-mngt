const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const employeeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
})

employeeSchema.pre('save', async function(next) {
    try {
        const employee = this
        if (!employee.isModified('password')) {
            return next()
        }
        const hashedPassword = await bcrypt.hash(employee.password, 10)
        employee.password = hashedPassword
        return next()
    } catch (e) {
        return next(e)
    }
})

employeeSchema.methods.comparePassword = async  function(candidatePassword, next) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (e) {
        return next(e)
    }
}

employeeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {   delete ret._id  }
})

module.exports = mongoose.model('employee', employeeSchema, 'employee')