const express = require("express");

const app = express()
const PORT = 3000 

app.get('/', (req,res) => {
    res.send("TESTING ROUTE")
});

app.listen(PORT, console.log(`Server initialized on port: ${PORT}`))