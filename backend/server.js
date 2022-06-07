const express = require("express");
const connectDB = require("./config/db");
const { chats } = require("./data/data");
const dotenv = require("dotenv")
const userRoutes = require('./routes/userRoutes')
const { errorHandler, notFound} = require('./middlewares/errorMiddleware')

dotenv.config();
 
connectDB();
const app = express()
const PORT = 3001 

app.use(express.json()); //This tells the server to accept the JSON DATA form the front end

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

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, console.log(`Server initialized on port: ${PORT}`))