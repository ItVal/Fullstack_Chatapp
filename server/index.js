const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = 2080;
let socket = require("socket.io");
const cors = require("cors");

//db middleware
require("./DataBase/mongoDB")




app.use(cors());


//authorisation accès aux requêtes venant de l'extérieur
const io = socket(http, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  }
});

io.on("connection", (socket) => {
  /* notification pour un client connecter */
  console.log("new client connected");
  socket.emit("connection", null); //evenement personnalisé du back vers le font
  
})




http.listen(PORT, () => {
    console.log(`listening on port :${PORT}`);
  });