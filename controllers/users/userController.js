const User = require('../../models/User/User');
const bcrypt = require("bcryptjs");


// Register User
const registerUser = async (req, res) => {
    const {firstname, lastname, email, profilePhoto, password } = req.body;
    try {
        
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.json({msg: "User Already Exists"})
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
        console.log(error.message);
    }
};

// Login User
const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try {
        // Check if email exists
        const userExists = User.findOne({email});

        // validity of password
        const isPasswordMatched = await bcrypt.compare(
            password, 
            userExists.password
        );
        console.log("password checked");
        console.log(isPasswordMatched);
        if (!userExist  || isPasswordMatched) {
            console.log("in condition loop");
            res.json({
                msg: "Invalid login credentials"
            });
        }

        res.json({
            status: "success",
            data: "user logged in"
        })
    }catch (error) {
        console.log(error.message);
    }
}

const getUserById = async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "profile"
        })
    }catch (error) {
        console.log(error.message);
    }
}

const updateUserById = async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "profile"
        })
    }catch (error) {
        console.log(error.message);
    }
}

const deleteUserById = async(req, res) => {
    const {firstname, lastname, email, profilePhoto, password } = req.body;
    try {
        res.json({
            status: "success",
            data: "profile deleted"
        })
    }catch (error) {
        console.log(error.message);
    }
}

const getAllUsers = async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "all profile data"
        })
    }catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    registerUser, 
    loginUser, 
    getUserById, 
    updateUserById, 
    deleteUserById,
    getAllUsers,
}