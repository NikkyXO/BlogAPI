const express = require('express');
const { 
    registerUser, loginUser, 
    getUserById, updateUserById, 
    deleteUserById, getAllUsers 
} = require('../../controllers/users/userController');
const isLogin = require('../../middlewares/isLogin');

const userRouter = express.Router();


userRouter.post("/register", registerUser);

userRouter.post('/login', loginUser);   

userRouter.get('/profile', isLogin, getUserById);

userRouter.put('/:id', isLogin, updateUserById);

userRouter.delete('/:id', isLogin, deleteUserById);

userRouter.get('/', isLogin, getAllUsers);

module.exports = userRouter;