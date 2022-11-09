require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE);

mongoose.connection.on("error", (err) =>{
    console.log("Mongoose connection error: " + err.message);
})

mongoose.connection.once("open", (err) => {
    console.log("connected db successfully");
})

module.exports = mongoose;