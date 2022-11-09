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
  const [user, setUser] = useLocalStorage('user', null)

  const navigate = useNavigate()

  async function fetchVerify() {
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
      navigate('/vault')
    } else {
      navigate('/login')
    }
  }

  if (user !== null && firstLoad) {
    fetchVerify()
    setFirstLoad(false)
  }

  // call this function when you want to authenticate the user
  const login = useCallback(
    async (data) => {
      localStorage.setItem('token', data)
      setUser(data)
      navigate('/vault')
    },
    [navigate, setUser],
  )

  // call this function to sign out logged in user
  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login', { replace: true })
  }, [navigate, setUser])

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }
