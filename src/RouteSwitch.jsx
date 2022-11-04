import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Login from './components/Login'
import Register from './components/Register'

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch
