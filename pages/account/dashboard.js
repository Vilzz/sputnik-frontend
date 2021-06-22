import { useEffect, useContext } from 'react'
import AuthContext from '@/context/AuthContext'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import Layout from '@/components/Layout'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'
import { API_URL } from '@/config/index'
import { FaUserAstronaut } from 'react-icons/fa'
import { ListGroup, Col, Row, Button } from 'react-bootstrap'

const Dashboard = ({ token, user }) => {
  const router = useRouter()
  const { logout } = useContext(AuthContext)
  useEffect(() => {
    if (token === null) {
      router.push('/account/login')
    }
  }, [token])
  const formatDate = (date) => {
    return format(new Date(date), 'dd MMMM yyyy k:mm:ss', { locale: ru })
  }

  return (
    <Layout title='Панель управления'>
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
            <div className='d-grid gap-2'>
              <Button as='a' onClick={() => logout()} className='mt-4'>
                {router.locale === 'ru-RU' ? 'Выйти' : 'Logout'}
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Layout>
  )
}
export default Dashboard

export const getServerSideProps = async (ctx) => {
  const res = parseCookies(ctx.req)
  const config = {
    headers: {
      Authorization: `Bearer ${res.token}`,
    },
  }
  const user = await axios.get(`${API_URL}auth/me`, config)
  return {
    props: { token: res.token, user: user.data.data },
  }
}
