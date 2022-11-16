import { Navigate, useOutlet } from 'react-router-dom'
import React from 'react'
import { useAuth } from '../context/AuthContext'

export function ProtectedLayout() {
  const { token, firstLoad } = useAuth()
  const outlet = useOutlet()

  if (token !== null && firstLoad) {
    return <Navigate to="/lock" />
  }
  if (token === null && firstLoad) {
    return <Navigate to="/login" />
  }

  return <div>{outlet}</div>
}
