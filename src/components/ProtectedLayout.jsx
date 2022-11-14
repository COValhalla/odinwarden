import { Navigate, useOutlet } from 'react-router-dom'
import React from 'react'
import { useAuth } from '../context/AuthContext'

export function ProtectedLayout() {
  const { token } = useAuth()
  const outlet = useOutlet()

  if (!token) {
    return <Navigate to="/login" />
  }

  return <div>{outlet}</div>
}
