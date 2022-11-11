import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./Pages/Login";
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Channel from './Pages/Channel';
import Index from './Pages/Index';

import io from "socket.io-client";
import makeToast from "./Toaster";



function App () {
  

  return (
    <div>
      <BrowserRouter> 
        <Routes> 
          <Route path="/" element={<Index />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
          <Route path="/dashboard" element={<Dashboard />} exact />
          <Route path="/channel/:id" element={<Channel />} exact />
        </Routes> 
      </BrowserRouter>
    </div>
  )
}

export default App;