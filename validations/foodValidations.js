const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            user_id: Joi.string().min(3).max(500).required(),
            foodName: Joi.string().min(3).max(500).required(),
            date: Joi.string().min(3).max(100).required(),
            calories: Joi.number().min(50).max(3000),
        }

        return Joi.validate(request, createSchema)
    },
}