import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./Pages/Login";
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Channel from './Pages/Channel';
import Index from './Pages/Index';
import ChatPage from './Pages/ChatPage';
import './Styles/home.css'

import io from "socket.io-client";
import makeToast from "./Toaster";
// import Main from './Pages/Main';



function App () {
  const [socket, setSocket] = React.useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("CC_Token");
    if (token && !socket) {
      const newSocket = io("http://localhost:2080", {
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
        makeToast("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  };

  React.useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <BrowserRouter> 
        <Routes> 
        {/* <Route path="/" element={<Main />} exact /> */}
          <Route path="/" element={<Index />} exact />
          <Route path="/login" 
          element={<Login setupSocket={setupSocket} />} exact />
          <Route path="/register" element={<Register />} exact />
          <Route path="/dashboard" 
          element={<Dashboard socket={socket} />} exact />
          <Route path="/channel/:id" 
          element={<Channel socket={socket} />} exact />
          <Route path="/chat/:id" 
          element={<ChatPage socket={socket} />} exact/>
        </Routes> 
      </BrowserRouter>
    </div>
  )
}

export default App;