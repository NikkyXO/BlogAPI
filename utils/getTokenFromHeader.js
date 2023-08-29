
const getTokenFromHeader = (req) => {
    const headerObj = req.headers;
    if (req.headers["authorization"]) {
        const token = req.headers["authorization"]?.split(" ")[1];

        if(token !== undefined) {
            return token;
        } else {
            return false;
        }
    } else {
        return false;
    }
    
};



module.exports = getTokenFromHeader;
