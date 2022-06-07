const jwt = require('jsonwebtoken')
const User = require("../Models/userModel")
const asyncHandler = require("express-async-handler")


// since its a middleware we need the req,res,next
const protect = asyncHandler(async (req,res, next) => {
    let token;
    // check if conditions are met
    if (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            // Bearer 

            // This decodes token id and verifies
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")

            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized, token failed")
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("No Token found")
    }

})

module.exports = {protect}