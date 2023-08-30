const User = require('../../models/User/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generateToken');
const getTokenFromHeader = require('../../utils/getTokenFromHeader');
const {appError, AppError} = require('../../utils/appError');


// Register User
const registerUser = async (req, res, next) => {
    const {firstname, lastname, email, profilePhoto, password } = req.body;
    try {
        
        const userExists = await User.findOne({email});
        if (userExists) {
            next(new AppError("User Already Exists", 400));

        } else {
            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // create the user
            const user = await User.create({
                firstname, 
                lastname, 
                email, 
                // profilePhoto, 
                password: hashedPassword
            });

            res.json({
                status: "success",
                data: user
            })
        }
        
    }catch (error) {
        next(appError("User Already Exists", 500));
    }
};

// Login User
const loginUser = async(req, res, next) => {
    const {email, password} = req.body;
    try {
        // Check if email exists
        const userExists = await User.findOne({ email });

        // validity of password
        const isPasswordMatched = await bcrypt.compare(
            password, 
            userExists.password
        );

        if (!userExists  || !isPasswordMatched) {
            console.log("in condition loop");
            next(new AppError("Invalid login credentials", 401));
           
        }

        res.json({
            status: "success",
            data: {
                msg: "Log in successfully",
                token: generateToken(userExists._id)
            }
        })
    }catch (error) {
        next(appError(error.message, 500));
    }
}

// user profile
const getUserById = async(req, res, next) => {
  
    const userId = req.userAuth;
    try {
        
        const userExists = await User.findById(userId);
        if (userExists) {
            return res.json({
                status: "success",
                data: userExists
            })
        }
        next(new AppError("No such user exists", 404));
    }catch (error) {
        next(appError(error.message, 500));
    }
}

const updateUserById = async(req, res, next) => {
    const userId = req.userAuth;
    const {firstname, lastname, profilePhoto } = req.body;
    const userExists = await User.findById(userId);
    try {
        if (userExists) {
            userExists.firstname = firstname ? firstname : userExists.firstname;
            userExists.lastname = lastname ? lastname : userExists.lastname;
            userExists.profilePhoto = profilePhoto ? profilePhoto : userExists.profilePhoto;

            await userExists.save();

            return res.json({
                status: "success",
                data: "profile updated"
            });
        } else {
            next(new AppError("User does not exists", 400));
            // return res.json({
            //     status: "failure",
            //     data: "User does not exists"
            // });
        }
        
    }catch (error) {
        next(appError(error.message, 500));
    }
}

const deleteUserById = async(req, res) => {
    const userId = req.userAuth;
    try {
        res.json({
            status: "success",
            data: "profile deleted"
        })
    }catch (error) {
        next(appError(error.message, 500));
    }
}

const getAllUsers = async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "all profile data"
        })
    }catch (error) {
        next(appError(error.message, 500));
    }
}

// Profile Photo Upload
const uploadProfilePhoto = async(req, res, next) => {
    const userId = req.userAuth;
    console.log(req.file);

    try {
        const userExists = await User.findById(userId);
        if (!userExists) {
            return next(appError("User not Found", 404));
        }
        if (userExists.isBlocked) {
            return next(appError("action not allowed, Your Account is blocked", 401));
        }

        // return res.json({
        //     status: "success",
        //     msg: "profile photo uploaded"
        // });

        if (req.file) {
            console.log("path here: " ); //+ req.file.path
            await userExists.findByIdAndUpdate(userId, {
                $set: {
                    profilePhoto: req.file.path,
                },
            },
                {
                    new: true
                }
            );
            return res.json({
                status: "success",
                msg: "profile photo uploaded"
            });
        }
        return next(appError("Error Occured while trying to upload file", 401));

    } catch (error) {
        next(appError(error.message, 500));
    }
    
}


module.exports = {
    registerUser, 
    loginUser, 
    getUserById, 
    updateUserById, 
    deleteUserById,
    getAllUsers,
    uploadProfilePhoto,
}