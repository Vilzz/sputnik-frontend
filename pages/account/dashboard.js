import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { parseCookies } from '@/helpers/index'

const Dashboard = ({ token }) => {
  const router = useRouter()
  useEffect(() => {
    if (token === null) {
      router.push('/account/login')
    }
  }, [token])
  return (
    <Layout title='Панель управления'>
      <div>
        <h1>DAshBoard</h1>
      </div>
    </Layout>
  )
}
export default Dashboard

export const getServerSideProps = async (ctx) => {
  const res = parseCookies(ctx.req)
  return {
    props: { token: res.token },
  }
}
