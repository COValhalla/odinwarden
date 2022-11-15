/* eslint-disable no-underscore-dangle */
import React, {
  useCallback,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [firstLoad, setFirstLoad] = useState(true)
  const [token, setToken] = useLocalStorage('token', null)
  const [id, setId] = useState('')

  const navigate = useNavigate()

  async function verifyJWTLocalStorage() {
    const response = await fetch('http://localhost:3000/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
      }),
    })
    const data = await response.json()

    if (data.status === 200) {
      setId(data.decoded.id)
      navigate('/vault')
    } else {
      navigate('/login')
    }
  }

  if (token !== null && firstLoad) {
    verifyJWTLocalStorage()
    setFirstLoad(false)
  }

  // call this function when you want to authenticate the token
  const login = useCallback(
    async (response) => {
      localStorage.setItem('token', response.token)
      localStorage.setItem('id', response.user._id)
      setToken(response.token)
      setId(response.user._id)
      navigate('/vault')
    },
    [navigate, setToken],
  )

  // call this function to sign out logged in token
  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    setToken(null)
    setId('')
    navigate('/login', { replace: true })
  }, [navigate, setToken])

  const value = useMemo(
    () => ({
      token,
      id,
      login,
      logout,
    }),
    [token, id, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }
