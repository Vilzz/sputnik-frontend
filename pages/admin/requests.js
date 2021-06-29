import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import AdminPanelMenu from '@/components/AdminPanelMenu'
import { parseCookies } from '@/helpers/index'
import Layout from '@/components/Layout'
import { Col, Row, Table, Form } from 'react-bootstrap'
import axios from 'axios'
import { useRouter } from 'next/router'
import { API_URL } from '@/config/index'
import { formatDate } from '@/helpers/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Requests = ({ requests, token }) => {
  const router = useRouter()
  const setIsDone = async (dt, id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const res = await axios.put(
        `${API_URL}requests/${id}`,
        { isDone: dt },
        config
      )
      toast.success('Статус изменен')
      router.push('/admin/requests')
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  return (
    <Layout>
      <ToastContainer />
      <Row>
        <Col md={3}>
          <AdminPanelMenu title={'Запросы'} />
        </Col>
        <Col md={9}>
          <h2 className='text-left text-primary mt-4'>Запросы</h2>
          <hr />
          <Table
            striped
            bordered
            responsive
            size='sm'
            className='table-gray table align-middle'
          >
            <thead>
              <tr className='table-dark'>
                <th>Имя</th>
                <th>Телефон</th>
                <th>Дата</th>
                <th>Выполнено</th>
                <th>Упр.</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id}>
                  <td>{request.name}</td>
                  <td>{request.phone}</td>
                  <td>{formatDate(request.createdAt)}</td>
                  <td>{request.isDone ? 'да' : 'нет'}</td>
                  <td className='ps-4'>
                    <Form.Check
                      className='form-switch'
                      type='checkbox'
                      checked={request.isDone}
                      onChange={(e) => setIsDone(!request.isDone, request._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Layout>
  )
}

export default AdminRoutesProtection(Requests)
export const getServerSideProps = async (ctx) => {
  const res = parseCookies(ctx.req)
  const requests = await axios.get(`${API_URL}requests?sort=-createdAt`)
  return {
    props: {
      requests: requests.data.data,
      token: res.token,
    },
  }
}
