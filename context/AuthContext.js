import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NEXT_URL } from '@/config/index'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

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
      const { role } = res.data.data.user
      setUser(res.data.data.user)
      if (role === 'Admin') {
        router.push('/admin/category')
      } else {
        router.push('/account/dashboard')
      }
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

  const checkUser = async () => {
    try {
      const res = await axios.get(`${NEXT_URL}api/user`)
      if (res) {
        setUser(res.data.data)
      }
    } catch (error) {
      console.log(error)
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
