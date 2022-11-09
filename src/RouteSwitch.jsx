import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import PasswordHint from './pages/PasswordHint'
import Vault from './pages/Vault'
import { ProtectedLayout } from './components/ProtectedLayout'
import { HomeLayout } from './components/HomeLayout'
import { AuthProvider } from './context/AuthContext'

function RouteSwitch() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hint" element={<PasswordHint />} />
          </Route>
          <Route element={<ProtectedLayout />}>
            <Route path="/vault" element={<Vault />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default RouteSwitch
