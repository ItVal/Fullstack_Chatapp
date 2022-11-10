import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./Pages/Login";
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';

function App () {
  return (
    <div>
      <BrowserRouter> 
        <Routes> 
          <Route path="/login" element={<Login />} />,
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes> 
      </BrowserRouter>
    </div>
  )
}

export default App;