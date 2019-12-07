const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    caloriesNeeded: {
        type: Number,
        required: false
    },
    food:[
        {
            foodName: String,
            date: String,
            calories: Number
    }      ]
})

module.exports = User = mongoose.model('users', UserSchema)