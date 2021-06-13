import Layout from '@/components/Layout'
import AdminPanelMenu from '@/components/AdminPanelMenu'
import { Row, Col } from 'react-bootstrap'
import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'
import { API_URL } from '@/config/index'
const Makets = ({ token, makets }) => {
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
  const makets = await axios.get(`${API_URL}makets`)
  return {
    props: { token: res.token, makets: makets.data.data },
  }
}
