import { Navigate, useOutlet } from 'react-router-dom'
import React from 'react'
import { useAuth } from '../context/AuthContext'

export function HomeLayout() {
  const { token } = useAuth()
  const outlet = useOutlet()

  if (token) {
    return <Navigate to="/vault" />
  }

  return <div>{outlet}</div>
}
