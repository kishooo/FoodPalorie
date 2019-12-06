
const BaseJoi = require('joi')
const {StringExtensions} = require('@joi-extensions/joi-extensions')
const Joi = BaseJoi.extend(StringExtensions)

module.exports = {
    registerValidation: request => {
        const createSchema = {
            email:Joi.string().email().required(),
            password:Joi.string().min(3).max(500).required(),
            userName:Joi.string().min(3).max(500).required(),
            inputCalories:Joi.number().min(3).max(50000).required()
        }
        return Joi.validate(request, createSchema)
    }
}