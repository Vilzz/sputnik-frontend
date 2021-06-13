import axios from 'axios'
import { API_URL } from '@/config/index'
import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import Layout from '@/components/Layout'
import AdminPanelMenu from '@/components/AdminPanelMenu'
import Categories from '@/components/Categories'
import { parseCookies } from '@/helpers/index'
import { Row, Col } from 'react-bootstrap'

const Category = ({ categories, token }) => {
  return (
    <Layout>
      <Row>
        <Col md={3}>
          <AdminPanelMenu title={'Категории'} />
        </Col>
        <Col md={9}>
          <h2 className='text-left text-primary'>Список категорий</h2>
          <hr />
          <Categories categories={categories} token={token} />
        </Col>
      </Row>
    </Layout>
  )
}

export default AdminRoutesProtection(Category)

export const getServerSideProps = async (ctx) => {
  const res = parseCookies(ctx.req)
  const categories = await axios.get(`${API_URL}categories?sort=order`)
  return {
    props: { categories: categories.data.data, token: res.token },
  }
}
