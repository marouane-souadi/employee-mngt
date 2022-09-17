const Joi = require('joi')

const register = {
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

const login = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })
}

module.exports = {
    register,
    login,
}