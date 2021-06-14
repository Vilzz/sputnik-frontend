import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import Layout from '@/components/Layout'
import AdminPanelMenu from '@/components/AdminPanelMenu'
import MaketsList from '@/components/MaketsList'
import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import { parseCookies } from '@/helpers/index'

import { API_URL } from '@/config/index'
const Makets = ({ token, makets }) => {
  return (
    <Layout>
      <Row>
        <Col md={3}>
          <AdminPanelMenu title={'Макеты'} />
        </Col>
        <Col md={9}>
          <h2 className='text-left text-primary'>Список макетов</h2>
          <hr />
          <MaketsList token={token} makets={makets} />
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
