const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            userName: Joi.string().min(3).max(500).required(),
            password: Joi.string().min(3).max(100).required(),
            caloriesNeeded: Joi.number().min(50).max(3000),
            food: Joi.array().items(Joi.object().keys({
                foodName: Joi.string().min(3).max(500),
                date: Joi.string().min(3).max(500),
                calories: Joi.number().min(50).max(3000)
            }))
        }

        return Joi.validate(request, createSchema)
    },

    loginValidation: request => {
        const createSchema = {
            userName: Joi.string().min(3).max(500).required(),
            password: Joi.string().min(3).max(100).required(),
            caloriesNeeded: Joi.number().min(50).max(3000),
            food: Joi.array().items(Joi.object().keys({
                foodName: Joi.string().min(3).max(500),
                date: Joi.string().min(3).max(500),
                calories: Joi.number().min(50).max(3000)
            }))
        }

        return Joi.validate(request, createSchema)
    },
    addFoodValidation: request => {
        const createSchema = {
            userName: Joi.string().min(3).max(500),
            password: Joi.string().min(3).max(100),
            caloriesNeeded: Joi.number().min(50).max(3000),
            food: Joi.array().items(Joi.object().keys({
                foodName: Joi.string().min(3).max(500),
                date: Joi.string().min(3).max(500),
                calories: Joi.number().min(50).max(3000)
            }))
        }

        return Joi.validate(request, createSchema)
    },

}