const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const UserSchema = new Schema({
        user_id: {
            type:String,
            required:true
        },
        foodName: {
            type:String,
            required: true,
        },
        date: {
            type:String,
            required: true,
        },
        calories: {
            type:Number,
            required: true,
        }
})     

module.exports = Food = mongoose.model('foods', UserSchema)