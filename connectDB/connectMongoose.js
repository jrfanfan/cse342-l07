// Using Node.js `require()`
const mongoose = require('mongoose')
const env = require("dotenv").config()


const URI = process.env.DATABASE_URL
mongoose.connect(URI);

const connection = (mongoose.connection, ()=> {
    console.log("db connected..!");
    
});


module.exports = connection; 
