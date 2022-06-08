const express = require("express");
const connectDB = require("./config/db");
const { chats } = require("./data/data");
const dotenv = require("dotenv")
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const { errorHandler, notFound} = require('./middlewares/errorMiddleware')
const cors = require('cors')

dotenv.config();
 
connectDB();
const app = express()
const PORT = 3001 


app.use(cors())
app.use(express.json()); //This tells the server to accept the JSON DATA form the front end

app.get('/', (req,res) => {
    res.send("TESTING ROUTE")
});


app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, console.log(`Server initialized on port: ${PORT}`))