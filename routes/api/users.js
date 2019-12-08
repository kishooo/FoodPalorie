const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../../models/User')
const validator = require('../../validations/userValidations')

// Get all users
router.get('/', async (req,res) => {
    const user = await User.find()
    res.json({data: user})
})

// Get user by ID
router.get('/:id', async(req,res) => {
    try {
        const id = req.params.id
        const member = await User.findById(id)
        if(!member) return res.status(404).send({error: 'Member does not exist'})
        res.json({msg: 'Member found successfully', data: member})
       }
       catch(error) {
           // We will be handling the error later
           console.log(error)
       } 
})

// Get user calories by ID
router.get('/calorie/:id', async(req,res) => {
    try {
        const id = req.params.id
        const member = await User.findById(id)
        if(!member) return res.status(404).send({error: 'Member does not exist'})
        res.json({caloriesNeeded: member.caloriesNeeded})
       }
       catch(error) {
           // We will be handling the error later
           console.log(error)
       } 
})

// Create user
router.post('/register', async (req,res) => {
    try {
     const isValidated = validator.createValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const userName = req.body.userName
    const user = await User.findOne({userName})
    if(user) return res.status(400).json({error: 'username already exists'})
     const newUser = await User.create(req.body)
     res.json({msg:'user was created successfully', data: newUser})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }
 })

 // ???
 router.get('/login', async (req,res) => {
    try {
     const isValidated = validator.loginValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const userName = req.body.userName
     const password = req.body.password
     const user = await User.findOne({userName})
     if(user.password != password) return res.status(400).json({error: 'wrong password'})
     const newUser = await User.findOne({userName})
     res.json({msg:'login successful', data: newUser})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }
 })

 /* router.put('/addFood', async (req,res) => {
    try {
     const isValidated = validator.loginValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const userName = req.body.userName
     const password = req.body.password
     const food = [req.body.food]
     const user = await User.findOne({userName})
     if(user.password != password) return res.status(400).json({error: 'wrong password'})
     const updatedUser = await User.updateOne({food})
     res.json({msg:'food added successfully', data: updatedUser})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }
 })
 */
/*
router.post('/register', async (req,res) => {
    const isValidated = validator.createValidation(req.body)
    const { email, password, caloriesNeeded, food:[{foodName, date, calories}] }  = req.body
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const user = await User.findOne({email})
    if(user) return res.status(400).json({error: 'Email already exists'})
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password,salt)
    const newUser = new User({
            userName,
            password: hashedPassword ,
            caloriesNeeded,
            food:[{
                foodName,
                date,
                calories
            }]
        })
    newUser
    .save()
    .then(user => res.json({data: user}))
    .catch(err => res.json({error: 'Can not create user'}))
})
*/
module.exports = router
