const User = require("../models/User/User");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const  isAdmin = async (req, res, next) => {
    // get token from header

    const token = getTokenFromHeader(req);
    if(!token) {
        console.log("falsy " + token);
        return res.json({
            message: "Authentication token not present in header",
        });
    }
     
    const decodedUser = verifyToken(token);
    if (!decodedUser) {
        return res.json({
            status: "failure",
            message: "Invalid/Expired Token",
        });
    }
              
    req.userAuth = decodedUser.id
    const user = await  User.findById(req.userAuth);
    if (user.isAdmin) {
         return next();
    }
    return next("Access Denied, Admin Only", 401);


       
}
 


module.exports = isAdmin;