import '../styles/globals.css'
import { AuthProvider } from '@/context/AuthContext.js'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
