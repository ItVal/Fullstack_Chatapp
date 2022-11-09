const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = 2080;
let socket = require("socket.io");
const cors = require("cors");

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes 
app.use('/user', require("./routes/user"))

//Setup Error Handlers
const errorHandlers = require("./handlers/errorHandlers");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  // app.use(errorHandlers.productionErrors);
}

//db middleware
const { connectDB } = require("./DataBase/mongoDB");
connectDB();

//authorisation accès aux requêtes venant du front
app.use(cors());
const io = socket(http, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  /* notification pour un client connecter */
  console.log("new client connected");
  socket.emit("connection", null); //evenement personnalisé du back vers le font
});

http.listen(PORT, () => {
  console.log(`listening on port :${PORT}`);
});
