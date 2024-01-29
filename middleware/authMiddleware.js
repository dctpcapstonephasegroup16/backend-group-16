const jwt  = require('jsonwebtoken')
require('dotenv').config()
function authenticateUser(req, res, next){
    const token = req.header('Authorization')
    if(!token){
        return res.status(401).json({error: 'Unauthorired-Token not provided'})
    }
    try{
const decoded =jwt.verify(token, process.env.SECRET_TOKEN)
req.user = decoded.user
next()
    }catch(error){
        res.status(5401).json({error: 'Unauthorized- Invalid token'})
    }
}

function authorize(approvedRoles) {
    return (req, res, next) => {
        const userRole = req.user.role; // Assuming req.user is set by your authentication middleware and contains the role

        if (approvedRoles.includes(userRole)) {
            return next(); // User has an approved role, proceed to the next middleware
        } else {
            return res.status(403).json({ message: "Access Forbidden: You don't have the required permissions." });
        }
    };
}
module.exports ={
    authenticateUser,
    authorize
} 