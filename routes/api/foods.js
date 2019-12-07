const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()

const Food = require('../../models/Food')
const validator = require('../../validations/foodValidations')

router.get('/', (req,res) => res.json({data: 'Users working'}))

router.post('/', async (req,res) => {
    try {
     const isValidated = validator.createValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const newFood = await Food.create(req.body)
     res.json({msg:'Food created successfully', data: newFood})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })


 router.get('/getIdDate', async (req,res) => {
    try {
     const user_id = req.body.user_id
     const date = req.body.date
     const food = await Food.find({user_id, date})
     res.json({data: food})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 /*
 router.get('/getByUser_id', async (req,res) => {
    try {
     const user_id = req.body.id
     const food = await Food.find({user_id})
     res.json({msg:'food was successfully found', data: food})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })
 */

 module.exports = router