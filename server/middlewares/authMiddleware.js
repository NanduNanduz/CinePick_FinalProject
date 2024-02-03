const jwt = require("jsonwebtoken");

module.exports = function(req,res,next) {
    try {
        //std used to send the token from frontend to backend
        const token = req.headers.authorization.split(" ")[1];
        //Tis secret key must match with the secret key ,which have used for the encryption 
        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.body.userId = decoded.userId;
        //next() -- Execute the logic in the actual API endpoint (usersRoute try block)
        next();
    } catch (error) {
        //if any issues with the token
        res.status(401).send({success: false, message: "Invalid token"})
    }
};