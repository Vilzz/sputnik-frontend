import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
const LoginPage = () => {
  const router = useRouter()
  return (
    <Layout title={router.locale === 'ru-RU' ? 'Вход' : 'Login'}>
      <h1>LOGIN</h1>
    </Layout>
  )
}

export default LoginPage
