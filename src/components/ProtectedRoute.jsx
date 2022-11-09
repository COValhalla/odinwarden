import { Navigate } from 'react-router-dom'
import React from 'react'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />
  }
  return children
}
