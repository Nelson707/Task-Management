const express = require('express');
const {loginUser, registerUser, getUsers, getUser, editUser} = require('../controllers/authController');

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.get('/getUsers', getUsers);
userRouter.get('/getUser/:id', getUser);
userRouter.post('/editUser/:id', editUser);

module.exports = userRouter;
