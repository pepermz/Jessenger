const express  = require('express')
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controllers/chatControllers')
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()

// Accesing the chat or creating the chat {protect} if user is not logged in they cannot access route
router.route('/').post(protect, accessChat)

// Fetching the chats from database from user
router.route('/').get(protect, fetchChats)

// Creating a group
router.route('/group').post(protect, createGroupChat)

// Renamiming a particular group
router.route('/rename').put(protect, renameGroup)

// If a member wants to remove from a group
router.route('/groupremove').put(protect, removeFromGroup)

// Adding a member to a group
router.route('/groupadd').put(protect, addToGroup)

module.exports = router