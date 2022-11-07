import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import PasswordHint from './pages/PasswordHint'

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hint" element={<PasswordHint />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch
