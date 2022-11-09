import React from "react";
import "./App.css";
import socketClient from "socket.io-client";
import { Chat } from "./chater/Chat";
const SERVER = "http://127.0.0.1:2080";

function App() {
  let socket = socketClient(SERVER);
  socket.on('connection', () => {
      console.log(`Je suis connecté avec le backend`);
  });
  return <div className="App">
    <Chat />
  </div>; 
}

export default App;
