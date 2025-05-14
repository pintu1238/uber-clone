const userModel= require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');


//*******register controller*******
module.exports.registerUser = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.CreateUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = await user.generateAuthToken();

    res.status(201).json({token, user});
            

}; 