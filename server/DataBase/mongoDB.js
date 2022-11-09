require("dotenv").config();
const mongoose = require("mongoose");

exports.connectDB = (req, res, next) => {
  //connexion db
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log("conection a la db reussi"))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
   
//import our tables (schemas)
// require("./User.model");
// require("./Message.model");
};

