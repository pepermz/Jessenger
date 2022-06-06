const dotenv = require("dotenv")
const jwt = require('jsonwebtoken')
//This might not work
dotenv.config()

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
};

module.exports = generateToken;