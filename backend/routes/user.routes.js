const express = require('express');
const router = express.Router();
const { body }=require("express-validator");
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');


//*******************register routes******
router.post('/register', [
    body('email').isEmail().withMessage('Email is required'),
    body('fullname.firstname').isLength({min:3}).withMessage('FirstName must be atleast 3 character long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], 

     userController.registerUser
);


//*******************loginn routes******
router.post('/login', [
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], 
userController.loginUser);

//*******************get profile routes******
router.get('/profile', authMiddleware.authUser, userController.getUserProfile)

//*******************logout routes******
router.get('/logout', authMiddleware.authUser, userController.logoutUser);


module.exports = router;

