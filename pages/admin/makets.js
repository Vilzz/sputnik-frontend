import Layout from '@/components/Layout'
import AdminPanelMenu from '@/components/AdminPanelMenu'
import { Row, Col } from 'react-bootstrap'
import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import { parseCookies } from '@/helpers/index'
const Makets = ({ token }) => {
  return (
    <Layout>
      <Row>
        <Col md={3}>
          <AdminPanelMenu title={'Макеты'} />
        </Col>
        <Col md={9}>
          <h1 className='text-center'>Список макетов</h1>
          <hr />
        </Col>
      </Row>
    </Layout>
  )
}

export default AdminRoutesProtection(Makets)

export const getServerSideProps = async (ctx) => {
  const res = parseCookies(ctx.req)

  return {
    props: { token: res.token },
  }
}
