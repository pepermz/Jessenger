const express = require('express')
const {registerUser, authUser} = require("../controllers/userControllers")
const router = express.Router()

//Endpoint for registration
router.route('/').post(registerUser)

//Endpoint for log in with another syntax alternative
router.post('/login', authUser)

module.exports = router;