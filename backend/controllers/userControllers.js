const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const User = require("../Models/userModel");
const generateToken = require('../config/generateToken')



const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password, img} = req.body
    // if name email or password doesn't match throw an error
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please fill out all the fields")
    }
    // Query for MongoDb findOne | Checking for user
    const userExists = await User.findOne({ email })
        if (userExists) {
            res.status(400);
            throw new Error("User already exists")
        }
    const user = await User.create({
        name,
        email,
        password,
        img,
    });
        // If user is created
        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                img: user.img,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error ("Failed to create User")
        }
});

const authUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body;
    const user =await User.findOne({email});

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            img: user.img,
            token: generateToken(user._id),
        })
    }   else {
            res.status(400);
            throw new Error ("Failed to create User")
    }
})

module.exports = {registerUser, authUser};