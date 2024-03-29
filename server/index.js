const express = require("express");
const app = express();
// const http = require("http").createServer(app);
const PORT = 2080;
// let socket = require("socket.io");
const cors = require("cors");

//authorisation accès aux requêtes venant du front
const mongoose = require("mongoose");
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATH,OPTIONS"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/chatroom"));
require("./DataBase/Message.model");
app.use("/msg", require("./routes/messages"));

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

const server = app.listen(PORT, () => {
  console.log(`listening on port :${PORT}`);
});

//socket server
const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//authentification user
const jwt = require("jwt-then");
//chatroom
const Message = mongoose.model("Message");
//private chat
const Msg = mongoose.model("msg");
//user
const User = mongoose.model("User");

//socket
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.SECRET);
    socket.userId = payload.id;
    next();
  } catch (err) {}
});

//general
io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);
  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  //join Room
  socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log("A user joined chatroom: " + chatroomId);
  });
  //  leave Room
  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });

  //join private chat
  socket.on("joinChat", ({ idReceiver }) => {
    socket.join(idReceiver);
    console.log("A user joined private chat: " + idReceiver);
  });
  //  leave private chat
  socket.on("leaveChat", ({ idReceiver }) => {
    socket.leave(idReceiver);
    console.log("A user left private chat: " + idReceiver);
  });

  //message channel
  socket.on("chatroomMessage", async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        message,
      });
      io.to(chatroomId).emit("newMessage", {
        message,
        name: user.name,
        userId: socket.userId,
      });
      await newMessage.save();
    }
  });

  //message private
  socket.on("privateMessage", async ({ idReceiver, message }) => {
    if (message.trim().length > 0) {
      const idSender = await User.findOne({ _id: socket.userId });
      const newPMessage = new Msg({
        idSender: socket.userId,
        idReceiver,
        message,
      });

      socket.join(idReceiver);
      socket.emit('newMessageSent', { idReceiver})

      io.to(idReceiver).emit("newPMessage", {
        message,
        name: idSender.name,
        userId: socket.userId,
        idReceiver,
      });
      await newPMessage.save();
    }
  });
});

module.exports = server;