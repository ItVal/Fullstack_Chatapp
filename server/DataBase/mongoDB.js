require("dotenv").config();
const mongoose = require("mongoose");

//connexion db
mongoose.connect(process.env.DATABASE, 
    { useNewUrlParser: true, 
      useUnifiedTopology: true
    });
mongoose.connection.on("error", (err) =>{
    console.log("Mongoose connection error: " + err.message);
})
mongoose.connection.once("open", (err) => {
    console.log("connected db successfully");
})

//import our tables (schemas)
require("./User.model");
require("./Message.model");


module.exports = mongoose;