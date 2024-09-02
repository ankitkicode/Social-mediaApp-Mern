require('dotenv').config()
// Import the User model and JWT
const User = require('../models/user'); // Adjust the path to your User model
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
// console.log(secretKey,"sedddddddddddddddd");

const RegisterController = async (req, res, next) => {
    const { username, name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({
            username,
            name,
            email,
            password // Ensure this is hashed in your model's pre-save hook
        });

        // Save user to database
        await newUser.save();
            // Send JSON response with token and user data
            res.status(201).json({
                message: 'User registered successfully',
            });

        // Authenticate the user
        // req.login(newUser, { session: false }, async (err) => {
        //     if (err) return next(err);

        //     // Generate JWT token
        //     const token = jwt.sign({ id: newUser._id, email: newUser.email }, secretKey, { expiresIn: '1h' });

        
        // });

    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

const LoginController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({
            email: email
        });
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }
        // Compare password
        const validPassword = await user.comparePassword(password);
        if (!validPassword) {
            return res.status(400).json({
                message: 'Invalid password'
            });
        }
         // Generate JWT token
         const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
         // Send JSON response with token and user data
         res.status(200).json({
             message: 'User logged in successfully',
             token: token,
         });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
}
module.exports = { RegisterController, LoginController };
