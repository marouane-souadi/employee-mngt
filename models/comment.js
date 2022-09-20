const mongoose = require('mongoose')

const {Schema} = mongoose

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.ObjectId,
        required: true,
        ref: 'employee'
    },
    employee: {
        type: Schema.ObjectId,
        required: true,
        ref: 'employee'
    },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
})


commentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {   delete ret._id  }
})

module.exports = mongoose.model('comment', commentSchema, 'comment')