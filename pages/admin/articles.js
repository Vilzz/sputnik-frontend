import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import AdminPanelMenu from '@/components/AdminPanelMenu'
import ArticlesList from '@/components/ArticlesList'
import { parseCookies } from '@/helpers/index'
import Layout from '@/components/Layout'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '@/config/index'

const Articles = ({ articles, token }) => {
  return (
    <Layout>
      <Row>
        <Col md={3}>
          <AdminPanelMenu title={'Статьи'} />
        </Col>
        <Col md={9}>
          <h2 className='text-left text-primary mt-4'>Новости</h2>
          <hr />
          <ArticlesList articles={articles} token={token} />
        </Col>
      </Row>
    </Layout>
  )
}

export default AdminRoutesProtection(Articles)
export const getServerSideProps = async (ctx) => {
  const res = parseCookies(ctx.req)
  const articles = await axios.get(`${API_URL}articles`)
  return {
    props: {
      articles: articles.data.data,
      token: res.token,
    },
  }
}
