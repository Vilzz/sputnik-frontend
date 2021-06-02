import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NEXT_URL } from '@/config/index'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [error, setError] = useState(null)
  const router = useRouter()

  const register = async (user) => {
    try {
      const res = await axios.post(`${NEXT_URL}api/register`, user)
      //TODO Закончить передачу Данных пользователя в контекст
      router.push('/account/dashboard')
    } catch (error) {
      setError(
        `Статус: ${error.response.status}, Ошибка: ${error.response.data.error}`
      )
      setError(null)
    }
  }
  const login = async (user) => {
    try {
      const res = await axios.post(`${NEXT_URL}api/login`, user)
      //TODO Закончить передачу Данных пользователя в контекст
      router.push('/account/dashboard')
    } catch (error) {
      setError(
        `Статус: ${error.response.status}, Ошибка: ${error.response.data.error}`
      )
      setError(null)
    }
  }
  return (
    <AuthContext.Provider value={{ register, login, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
