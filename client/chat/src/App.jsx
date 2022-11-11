import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./Pages/Login";
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Index from './Pages/Index';



function App () {
  return (
    <div>
      <BrowserRouter> 
        <Routes> 
          <Route path="/" element={<Index />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
          <Route path="/dashboard" element={<Dashboard />} exact />
        </Routes> 
      </BrowserRouter>
    </div>
  )
}

export default App;