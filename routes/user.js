const express = require('express')
//const passport = require('passport')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/newUser');
const tokenKey = require('../config/keys').secretOrKey
const validator=require('../validations/userValidations')

const userController = require('../controllers/userController')

router.post('/register', userController.createUser)

router.get('/', userController.getAllUser)

router.get('/getUser', userController.getUser)

module.exports = router