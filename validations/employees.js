const Joi = require('joi')

const add = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string(),
    })
}

module.exports = {
    add,
}