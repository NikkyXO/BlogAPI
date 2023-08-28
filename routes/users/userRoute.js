const express = require('express');
const { registerUser, loginUser, getUserById, 
    updateUserById, deleteUserById, getAllUsers } = require('../../controllers/users/userController');

const userRouter = express.Router();


userRouter.post("/register", registerUser)

userRouter.post('/login', loginUser)   


userRouter.get('/:id', getUserById)

userRouter.put('/:id', updateUserById)

userRouter.delete('/:id', deleteUserById)

userRouter.get('/', getAllUsers)

module.exports = userRouter;