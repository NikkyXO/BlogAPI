
const registerUser = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "user registered"
        })
    }catch (error) {
        console.log(error.message);
    }
};

const loginUser = async(req, res) => {
    try {
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
    try {
        res.json({
            status: "success",
            data: "profile"
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