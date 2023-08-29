const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isLogin = (req, res, next) => {
    // get token from header

    const token = getTokenFromHeader(req);
    if(!token) {
        // console.log("falsy " + token);
        return res.json({
            message: "Authentication token not present in header",
        });
    } else {
        
        const decodedUser = verifyToken(token);
        if (!decodedUser) {
            return res.json({
                status: "failure",
                message: "Invalid/Expired Token",
            }); 
              
        } else {
            req.userAuth = decodedUser.id
            next();
        }
       
    }
    /*
     } else {
        const decodedUser = verifyToken(token);
        if (!decodedUser) {
            return res.json({
                message: "Invalid Token",
            }); 
              
        } else {
            next();
        }
       
    }
    */
    

    // verify token
    // save user into req object
};

module.exports = isLogin;