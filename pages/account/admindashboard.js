import Layout from '@/components/Layout'
import { parseCookies } from '@/helpers/index'

const AdminDashboard = () => {
  return (
    <Layout title='Панель управления'>
      <div>
        <h1>Панель Администратора</h1>
      </div>
    </Layout>
  )
}
export default AdminDashboard

export const getServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx.req) || ''
  return {
    props: { token },
  }
}
