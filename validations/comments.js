const Joi = require('joi')

const add = {
    body: Joi.object({
        text: Joi.string().required(),
    })
}
module.exports = {
    add,
}