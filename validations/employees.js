const Joi = require('joi')

const add = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string(),
        address: Joi.string(),
        role: Joi.string(),
    })
}

const edit = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string(),
        email: Joi.string().email(),
        firstname: Joi.string(),
        lastname: Joi.string(),
        address: Joi.string(),
        role: Joi.string(),
    })
}

module.exports = {
    add,
    edit,
}