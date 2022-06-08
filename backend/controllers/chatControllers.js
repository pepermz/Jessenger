const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const Chat = require('../Models/chatModel');
const User = require("../Models/userModel");


const accessChat = asyncHandler(async(req,res) => {
    // Check if a chat with the userId exist then return , if not create a chat with user id
    const { userId } = req.body

    if(!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400)
    }

    // Check if the chat exists
    var isChat = await Chat.find({
        isGroupChat: false,
        //both of these request have to be true
        $and:[
            // Equal to the current user logged in
            {users: {$elemMatch:{$eq:req.user._id}}},

            {users: {$elemMatch:{$eq: userId}}},

        ]
        // We dont want to populate the password hence -password
    })
    .populate("users", "-password")
    .populate("latestMessage")

    // data for our chat
    isChat = await User.populate(isChat, {
        path:'latestMessage.sender',
        select: 'name img email',
    })
    // If chat exist send chat otherwise create new chat with else
    if(isChat.length > 0) {
        res.send(isChat[0])
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        }
        //store it in a database
        try {
            const createdChat = await Chat.create(chatData)
            const FullChat = await Chat.findOne({_id: createdChat._id}).populate("users","-password")

            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    }
});

const fetchChats = asyncHandler(async (req,res) => {
    try {
        // Looking through all of the chats and find the ones belonging to the user 
        Chat.find({ users: { $elemMatch: { $eq: req.user._id}}})
            .populate("users", "-password")
            .populate("groupAdmin","-password")
            .populate("latestMessage")
            //sorting from new to old 
            .sort({ updated: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name img email",
                })
                // Here we return to the user 
                res.status(200).send(results);
            })
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const createGroupChat = asyncHandler(async(req,res,)=> {
    // We are going to take users from the body and the groupchat name
    if(!req.body.users || !req.body.name){
        return res.status(400).send({ message: "Please fill all the fields"})
    }

    var users = JSON.parse(req.body.users)

    // A GROUP should have more than two users
    if (users.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat")
    }

    users.push(req.user)

    // A new query to the database
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        })
        const fullGroupChat = await Chat.findOne({_id: groupChat._id})
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        res.status(200).json(fullGroupChat)

    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }

})

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

const addToGroup = asyncHandler(async (req,res) => {
    const {chatId, userId} = req.body
    const added = await Chat.findByIdAndUpdate(chatId, {
    // We are updating the users array
        $push: { users: userId },
        
        },
        {new:true}
    ) 
    .populate("users", "-password")
    .populate("groupAdmin", "-password")

    //Checking for errors
    if(!added){
        res.status(404);
        throw new Error("Chat not Found")
    } else {
        res.json(added)
    }
})

const removeFromGroup = asyncHandler(async (req,res) => {
    const {chatId, userId} = req.body
    const removed = await Chat.findByIdAndUpdate(chatId, {
    // We are updating the users array
        $pull: { users: userId },
        
        },
        {new:true}
    ) 
    .populate("users", "-password")
    .populate("groupAdmin", "-password")

    //Checking for errors
    if(!removed){
        res.status(404);
        throw new Error("Chat not Found")
    } else {
        res.json(removed)
    }
})

module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup }