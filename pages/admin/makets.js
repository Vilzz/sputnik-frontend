import Layout from '@/components/Layout'
import AdminPanelMenu from '@/components/AdminPanelMenu'
import { Row, Col } from 'react-bootstrap'
const Makets = () => {
  return (
    <Layout>
      <Row>
        <Col md={3}>
          <AdminPanelMenu title={'Макеты'} />
        </Col>
        <Col md={9}>
          <h1 className='text-center'>Панель Администратора</h1>
          <hr />
        </Col>
      </Row>
    </Layout>
  )
}

export default Makets

// export const getServerSideProps = async () => {
//   const res = await axios.get(`${API_URL}categories`)
//   return {
//     props: {
//       categories: res.data.data,
//     },
//   }
// }
