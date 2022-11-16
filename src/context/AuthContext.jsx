/* eslint-disable no-underscore-dangle */
import React, {
  useCallback,
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [firstLoad, setFirstLoad] = useState(true)
  const [id, setId] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [email, setEmail] = useState(localStorage.getItem('email'))

  const navigate = useNavigate()

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false)
    }
  }, [firstLoad, setFirstLoad])

  // call this function when you want to authenticate the token
  const login = useCallback(
    async (response) => {
      localStorage.setItem('token', response.token)
      localStorage.setItem('id', response.user._id)
      localStorage.setItem('email', response.user.email)
      setToken(response.token)
      setId(response.user._id)
      setEmail(response.user.email)
      navigate('/vault')
    },
    [navigate, setToken, setEmail],
  )

  // call this function to sign out logged in token
  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('email')
    setToken(null)
    setId('')
    setEmail(null)
    navigate('/login', { replace: true })
  }, [navigate, setToken, setEmail])

  const value = useMemo(
    () => ({
      token,
      id,
      login,
      logout,
      firstLoad,
      setFirstLoad,
    }),
    [token, id, login, logout, firstLoad, setFirstLoad],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }
