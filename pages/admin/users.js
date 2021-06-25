import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Row, Col, Table } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { formatDate } from '@/helpers/index'
import 'react-toastify/dist/ReactToastify.css'
import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import AdminPanelMenu from '@/components/AdminPanelMenu'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import { GoGear, GoTrashcan } from 'react-icons/go'

const Users = ({ token, users }) => {
  const router = useRouter()
  const deleteUser = async (e) => {
    let id
    if (e.target.nodeName === 'path') {
      id = e.target.parentNode.attributes.data.value
    } else {
      id = e.target.attributes.data.value
    }
    if (confirm(`Будет удален пользователь! Вы уверены?`)) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const res = await axios.delete(`${API_URL}auth/users/${id}`, config)
        toast.success(`Пользователь удален успешно`)
        router.push('/admin/users')
      } catch (error) {
        toast.error(`${error.response.data.error}`)
      }
    }
  }
  return (
    <Layout>
      <ToastContainer />
      <Row>
        <Col md={3}>
          <AdminPanelMenu title={'Пользователи'} />
        </Col>
        <Col md={9}>
          <h2 className='text-left text-primary mt-4'>Список пользователей</h2>
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
                <th>#</th>
                <th>Имя</th>
                <th>Почта</th>
                <th>Роль</th>
                <th>Дата регистрации</th>
                <th>Управление</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ _id, name, email, role, createdAt }, idx) => (
                <tr key={_id}>
                  <td>{idx + 1}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{role}</td>
                  <td>{formatDate(createdAt)}</td>
                  <td>
                    <div className='d-flex justify-content-center'>
                      <Link href={`/admin/users/${_id}`}>
                        <a className='btn btn-xs btn-primary me-2'>
                          <GoGear />
                        </a>
                      </Link>
                      <button
                        className='btn btn-xs btn-danger'
                        data={_id}
                        onClick={(e) => deleteUser(e)}
                      >
                        <GoTrashcan data={_id} />
                      </button>
                    </div>
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

export default AdminRoutesProtection(Users)

export const getServerSideProps = async (ctx) => {
  const res = parseCookies(ctx.req)
  const config = {
    headers: {
      Authorization: `Bearer ${res.token}`,
    },
  }
  const users = await axios.get(`${API_URL}auth/users`, config)
  return {
    props: { token: res.token, users: users.data.data },
  }
}
