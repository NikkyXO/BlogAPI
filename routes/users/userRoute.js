const express = require('express');
const { 
    registerUser, loginUser, 
    getUserById, updateUserById, 
    deleteUserById, getAllUsers, uploadProfilePhoto, 
    getViewers, followContrl, unFollowContrl,
     BlockProfileContrl, unBlockProfileContrl, 
     adminBlockUserCtrl 
} = require('../../controllers/users/userController');
const isLogin = require('../../middlewares/isLogin');
const { storage } = require('../../config/cloudinaryConfig');


const multer = require("multer");
const isAdmin = require('../../middlewares/isAdmin');


const userRouter = express.Router();


const upload = multer({ storage });

userRouter.post("/register", registerUser); // getViewers


userRouter.post('/login', loginUser);   

userRouter.get('/profile', isLogin, getUserById);

userRouter.put('/:id', isLogin, updateUserById);

userRouter.delete('/:id', isLogin, deleteUserById);

userRouter.get('/',  getAllUsers); //isLogin,

userRouter.post('/profile/photo_upload',
    isLogin,
    upload.single("profilePhoto"), 
    uploadProfilePhoto
);
userRouter.get('/profile/views/:id', isLogin, getViewers);
userRouter.get('/profile/following/:id', isLogin, followContrl);
userRouter.get('/profile/unfollowing/:id', isLogin, unFollowContrl);
userRouter.get('/profile/block/:id', isLogin, BlockProfileContrl);
userRouter.get('/profile/unblock/:id', isLogin, unBlockProfileContrl); // adminBlockCtrl
userRouter.get('/admin/block/:userId', isLogin, isAdmin, adminBlockUserCtrl);


module.exports = userRouter;
