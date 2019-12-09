const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            userName: Joi.string().min(3).max(500).required(),
            password: Joi.string().min(3).max(100).required(),
            caloriesNeeded: Joi.number(),
        }

        return Joi.validate(request, createSchema)
    },

    loginValidation: request => {
        const createSchema = {
            userName: Joi.string().min(3).max(500).required(),
            password: Joi.string().min(3).max(100).required(),
            caloriesNeeded: Joi.number(),
        }

        return Joi.validate(request, createSchema)
    },
    addFoodValidation: request => {
        const createSchema = {
            userName: Joi.string().min(3).max(500),
            password: Joi.string().min(3).max(100),
            caloriesNeeded: Joi.number(),

        }

        return Joi.validate(request, createSchema)
    },

}
