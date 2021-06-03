import Layout from '@/components/Layout'
import { parseCookies } from '@/helpers/index'

const Dashboard = () => {
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
  const { token } = parseCookies(ctx.req)
  return {
    props: { token },
  }
}
