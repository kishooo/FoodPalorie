const mongoose = require('mongoose')
const Schema = mongoose.Schema

const existingUserSchema = new Schema({
    
    email: {
     type: String,
     unique:true
    
    },
    password: {
     type: String
    },
   inputCalories: {
       type: Number
   }
   })

   
module.exports = User=mongoose.model('users', existingUserSchema)