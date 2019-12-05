const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newUserSchema = new Schema({
    
    email: {
     type: String,
     unique:true
    
    },
    password: {
     type: String
    },
   userName: {
        type: String
   },
   inputCalories: {
       type: Number
   }
   })

   
module.exports = User = mongoose.model('newUser', newUserSchema)