const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({success: false, message: 'User does not exist'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({success: false, message: 'Invalid credentials'});
        }

        const token = generateToken(user._id);
        res.status(200).json({success: true, token: token});

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

// JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30m'})
}

// Register user
const registerUser = async (req, res) => {
    const {name, email, password, role} = req.body;
    try {
        const exists = await User.findOne({email});

        if(exists) {
            return res.status(400).json({success: false, message: 'User already exists'});
        } 
        if(!name) {
            return res.status(400).json({success: false, message: 'User name is required'});
        } 
        if(!email) {
            return res.status(400).json({success: false, message: 'Email is required'});
        } 
        if(!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: 'Please enter a valid email'});
        } 
        if(!password) {
            return res.status(400).json({success: false, message: 'Password is required'});
        }
        if(password.length < 8) {
            return res.status(400).json({success: false, message: 'Password must be at least 8 characters'});
        } 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email:email,
            password: hashedPassword,
            role: role || 'user'
        });

        const user = await newUser.save();
        const token = generateToken(user._id);
        res.status(200).json({success: true, token: token});


    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

// get all users
const getUsers = async (req,res) =>{
    try {
        const users = await User.find();
        res.status(200).json({success: true, data: users});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

// get single user
const getUser = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({success: true, data: user});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

// edit user
const editUser = async (req,res) => {
    const { id } = req.params;
    const {name,
            email, 
            password, 
            role
        } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
         
         if (name) user.name = name;
         if (email) {
             if (!validator.isEmail(email)) {
                 return res.status(400).json({ success: false, message: 'Please enter a valid email' });
             }
             user.email = email;
         }
 
         if (password) {
             if (password.length < 8) {
                 return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
             }
             const salt = await bcrypt.genSalt(10);
             user.password = await bcrypt.hash(password, salt);
         }
 
         if (role) user.role = role;
 
         
         const updatedUser = await user.save();
 
         res.status(200).json({
             success: true,
             message: 'User updated successfully',
             user: updatedUser
         });

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

module.exports = {
    loginUser,
    registerUser,
    getUsers,
    getUser,
    editUser
}
