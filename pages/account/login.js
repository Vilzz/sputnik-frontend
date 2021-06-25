import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BiLogIn } from 'react-icons/bi'
import AuthContext from '@/context/AuthContext'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Layout from '@/components/Layout'

const LoginPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error } = useContext(AuthContext)

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password) {
      login({ email, password })
    } else {
      toast.error('Вы забыли добавить пароль')
    }
  }
  return (
    <Layout title={router.locale === 'ru-RU' ? 'Вход' : 'Login'}>
      <ToastContainer />
      <Row className='py-5'>
        <Col md={{ span: 6, offset: 1 }}>
          <div className='mb-4'>
            <h1 className='text-primary display-4'>
              <BiLogIn className='me-2' />
              {router.locale === 'ru-RU' ? 'Вход' : 'Login'}
            </h1>
          </div>
          <hr />
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId='formBasicEmail' className='mb-3'>
              <Form.Label>
                {' '}
                {router.locale === 'ru-RU' ? 'Электронная почта' : 'Email'}
              </Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={email}
                required
                placeholder={
                  router.locale === 'ru-RU'
                    ? 'Введите адрес эл. почты'
                    : 'Enter your email'
                }
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword' className='mb-3'>
              <Form.Label>
                {router.locale === 'ru-RU' ? 'Пароль' : 'Password'}
              </Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={password}
                placeholder={
                  router.locale === 'ru-RU'
                    ? 'Введите пароль'
                    : 'Enter a password'
                }
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              {router.locale === 'ru-RU' ? 'Войти' : 'Enter'}
            </Button>
          </Form>
          <h5 className='mt-3'>
            {router.locale === 'ru-RU' ? 'Нет аккаунта?' : 'Not register?'}
            <Link href='/account/register'>
              <a className='lead text-primary ms-2'>
                {router.locale === 'ru-RU' ? 'Зарегистрироваться' : 'Register'}
              </a>
            </Link>
          </h5>
        </Col>
      </Row>
    </Layout>
  )
}

export default LoginPage
