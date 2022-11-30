// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './Home';
// import ChatPage from './ChatPage';
// import io from 'socket.io-client';

// const socket = io.connect("http://localhost:2080")

import socket from "./socket";

function Main() {
  console.log("socket", socket);
  return (
    <div>Main</div>
    // <BrowserRouter>
    //   <div>
    //     <Routes>
    //       <Route path="/" element={<Home socket={socket} />}></Route>
    //       <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
    //     </Routes>
    //   </div>
    // </BrowserRouter>
  );
}

export default Main;