const mongoose = require("mongoose");
require('dotenv').config()

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        });
        console.log(`MongoDB Connected! ${connection.connection.host}`);
    } catch (error) {
        console.log(``)
    }
}