import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
import AdminPanelMenu from '@/components/AdminPanelMenu'
import Categories from '@/components/Categories'
import { parseCookies } from '@/helpers/index'
import { Row, Col } from 'react-bootstrap'
const Category = ({ categories, token }) => {
  const router = useRouter()
  //@TODO Check for user role is Admin if not push to user dashboard
  useEffect(() => {
    if (token === null) {
      router.push('/account/login')
    }
  }, [token])
  return (
    <Layout>
      <Row>
        <Col md={3}>
          <AdminPanelMenu title={'Категории'} />
        </Col>
        <Col md={9}>
          <h2 className='text-left text-primary'>Панель Администратора</h2>
          <hr />
          <Categories categories={categories} />
        </Col>
      </Row>
    </Layout>
  )
}

export default Category

export const getServerSideProps = async (ctx) => {
  const res = parseCookies(ctx.req)
  const categories = await axios.get(`${API_URL}categories`)
  return {
    props: { categories: categories.data.data, token: res.token },
  }
}
