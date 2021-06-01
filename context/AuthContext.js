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
    const res = await axios.post(`${NEXT_URL}api/register`, user)
    if (!res) {
      setError(`Error ${res.statusText}`)
    } else {
      router.push('/account/dashboard')
    }

    //console.log('From AuthContext', res.data)
  }
  return (
    <AuthContext.Provider value={{ register, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
