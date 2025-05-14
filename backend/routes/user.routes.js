const express = require('express');
const router = express.Router();
const { body }=require("express-validator");
const userController = require('../controllers/user.controller');



router.post('/register', [
    body('email').isEmail().withMessage('Email is required'),
    body('fullname.firstname').isLength({min:3}).withMessage('FirstName must be atleast 3 character long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], 

     userController.registerUser
);


module.exports = router;

