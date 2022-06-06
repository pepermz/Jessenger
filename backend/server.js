const express = require("express");
const connectDB = require("./config/db");
const { chats } = require("./data/data");
const dotenv = require("dotenv")
const userRoutes = require('./routes/userRoutes')

dotenv.config();
 
connectDB();
const app = express()
const PORT = 3000 

app.get('/', (req,res) => {
    res.send("TESTING ROUTE")
});

// Using data.js (API Dummy Data for testing Route)
// app.get('/api/chat', (req,res) => {
//     res.send(chats);
// })

// Testing API ID
// app.get('/api/chat/:id', (req,res) => {
// Comparing the IDs of the DUMMY DATA chat's ID
//     const singleChat = chats.find((compare)=>compare._id === req.params.id);
//     res.send(singleChat)
// })

app.use('/api/user', userRoutes)


app.listen(PORT, console.log(`Server initialized on port: ${PORT}`))