import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NEXT_URL } from '@/config/index'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const router = useRouter()

  const register = async (user) => {
    try {
      const res = await axios.post(`${NEXT_URL}api/register`, user)
      setUser(res.data.data.user)
      router.push('/account/dashboard')
    } catch (error) {
      setError(
        `Статус: ${error.response.status}, Ошибка: ${error.response.data.error}`
      )
      setError(null)
    }
  }
  const login = async ({ email, password }) => {
    try {
      const res = await axios.post(`${NEXT_URL}api/login`, { email, password })
      setUser(res.data.data.user)
      router.push('/account/dashboard')
    } catch (error) {
      setError(
        `Статус: ${error.response.status}, Ошибка: ${error.response.data.error}`
      )
      setError(null)
    }
  }
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}api/logout`)
    if (res) {
      setUser(null)
      router.push('/')
    }
  }
  return (
    <AuthContext.Provider value={{ user, register, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
