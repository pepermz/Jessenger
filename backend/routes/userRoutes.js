const express = require('express')
const {registerUser, authUser, allUsers} = require("../controllers/userControllers")
const router = express.Router()
const {protect} = require("../middlewares/authMiddleware")

//Endpoint for registration
router.route('/').post(registerUser).get(protect, allUsers)

//Endpoint for log in with another syntax alternative
router.post('/login', authUser)



module.exports = router;