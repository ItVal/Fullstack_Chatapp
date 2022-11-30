require("dotenv").config();
const mongoose = require("mongoose");
const {DATABASE} = process.env
exports.connectDB = (req, res, next) => {
  //connexion db
  console.log(DATABASE);
  mongoose
    .connect(DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log("conection a la db reussi"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));
};
