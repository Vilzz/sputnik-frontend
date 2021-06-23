import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'
import { Col, Row, ListGroup, Button } from 'react-bootstrap'
import { FaUserAstronaut } from 'react-icons/fa'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import Link from 'next/link'

const UserInfo = ({ token, user }) => {
  const formatDate = (date) => {
    return format(new Date(date), 'dd MMMM yyyy k:mm:ss', { locale: ru })
  }
  return (
    <Layout>
      <Col md={{ offset: 1, span: 6 }}>
        <Row>
          <h2 className='text-primary my-3 ms-3'>
            <FaUserAstronaut className='me-2' />
            Информация о пользователе
          </h2>
          <hr />
        </Row>
        <Row>
          <Col md={12}>
            <ListGroup>
              <ListGroup.Item className='d-flex justify-content-between'>
                <strong>Дата регистрации: </strong>
                {formatDate(user.createdAt)}
              </ListGroup.Item>
            </ListGroup>
            <ListGroup>
              <ListGroup.Item className='d-flex justify-content-between'>
                <strong>Имя пользователя: </strong>
                {user.name}
              </ListGroup.Item>
            </ListGroup>
            <ListGroup>
              <ListGroup.Item className='d-flex justify-content-between'>
                <strong>Электронная почта: </strong>
                {user.email}
              </ListGroup.Item>
            </ListGroup>
            <ListGroup>
              <ListGroup.Item className='d-flex justify-content-between'>
                <strong>Роль пользователя: </strong>
                {user.role}
              </ListGroup.Item>
            </ListGroup>
            <Link href='/admin/users'>
              <Button className='mt-4' as='a' variant='secondary'>
                К списку
              </Button>
            </Link>
          </Col>
        </Row>
      </Col>
    </Layout>
  )
}

export default AdminRoutesProtection(UserInfo)

export const getServerSideProps = async (ctx) => {
  const res = parseCookies(ctx.req)
  const config = {
    headers: {
      Authorization: `Bearer ${res.token}`,
    },
  }
  const user = await axios.get(`${API_URL}auth/users/${ctx.query.id}`, config)
  return {
    props: {
      token: res.token,
      user: user.data.data,
    },
  }
}
