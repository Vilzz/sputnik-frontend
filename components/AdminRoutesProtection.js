import React, { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AuthContext from '@/context/AuthContext'

const AdminRoutesProtection = (WrappedComponent) => {
  return (props) => {
    const [isBrowser, setIsBrowser] = useState(false)
    useEffect(() => setIsBrowser(true), [])
    const router = useRouter()
    const { user } = useContext(AuthContext)
    if (isBrowser) {
      if (props.token === null) {
        router.replace('/account/login')
        return null
      }
      if (user !== null && user.role !== 'Admin') {
        router.replace('/account/dashboard')
        return null
      } else {
        return <WrappedComponent {...props} />
      }
    }
    return null
  }
}
export default AdminRoutesProtection
