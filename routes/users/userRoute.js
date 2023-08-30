const express = require('express');
const { 
    registerUser, loginUser, 
    getUserById, updateUserById, 
    deleteUserById, getAllUsers, uploadProfilePhoto 
} = require('../../controllers/users/userController');
const isLogin = require('../../middlewares/isLogin');
const { storage } = require('../../config/cloudinaryConfig');
const multer = require("multer");


const userRouter = express.Router();



const upload = multer({ storage });

userRouter.post("/register", registerUser);

userRouter.post('/login', loginUser);   

userRouter.get('/profile', isLogin, getUserById);

userRouter.put('/:id', isLogin, updateUserById);

userRouter.delete('/:id', isLogin, deleteUserById);

userRouter.get('/',  getAllUsers); //isLogin,

userRouter.post('/profile/photo_upload',
    isLogin,
    upload.single("profilePhoto"), 
    uploadProfilePhoto
);  // 

module.exports = userRouter;
