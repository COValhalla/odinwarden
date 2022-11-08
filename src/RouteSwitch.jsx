import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import PasswordHint from './pages/PasswordHint'
import Vault from './pages/Vault'

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hint" element={<PasswordHint />} />
        <Route path="/vault" element={<Vault />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch
