import { Navigate, useOutlet } from 'react-router-dom'
import React from 'react'
import { useAuth } from '../context/AuthContext'

export function ProtectedLayout() {
  const { user } = useAuth()
  const outlet = useOutlet()

  if (!user) {
    return <Navigate to="/login" />
  }

  return <div>{outlet}</div>
}
