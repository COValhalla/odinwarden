import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import Login from './components/Login'
import Register from './components/Register'

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch
