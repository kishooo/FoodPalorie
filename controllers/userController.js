const express = require('express')
//const passport = require('passport')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/newUser');
const tokenKey = require('../config/keys').secretOrKey
const validator=require('../validations/userValidations')

exports.getAllUser= async function(req,res){
    const users = await User.find()
    res.json({data: users})
}

exports.getUser= async function(req,res){
    try{
        const email= req.body.email
        const foundUser = await User.findOne(email)
        res.json({msg :'found', data: foundUser})
    }
    catch{
        console.log(error)
    }
}

exports.createUser = async function (req,res){
    try {
        const isValidated = validator.registerValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newUser = await User.create(req.body)
        res.json({msg:'User was created successfully', data: newUser})
       }
       catch(error) {
           // We will be handling the error later
           console.log(error)
       }  
    }

