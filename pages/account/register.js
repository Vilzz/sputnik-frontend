import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ImUserPlus } from 'react-icons/im'
import AuthContext from '@/context/AuthContext'
import { Form, Button, Row, Col } from 'react-bootstrap'

const RegisterPage = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const { register, error } = useContext(AuthContext)
  useEffect(() => {
    error && toast.error(error)
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== password2 || password === '') {
      toast.error('Пароли отличаются или отсутствуют')
      return
    }
    register({ username, email, password })
  }

  return (
    <Layout
      title={
        router.locale === 'ru-RU'
          ? 'Регистрация пользователя'
          : 'Register new user'
      }
    >
      <ToastContainer />
      <Row className='py-5'>
        <Col md={{ span: 6, offset: 1 }}>
          <div className='mb-4'>
            <h1 className='text-primary display-4'>
              <ImUserPlus className='me-2' />
              {router.locale === 'ru-RU' ? 'Регистрация' : 'Create account'}
            </h1>
          </div>
          <hr />
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId='formBasicName' className='mb-3'>
              <Form.Label>
                {router.locale === 'ru-RU' ? 'Имя пользователя' : 'Username'}
              </Form.Label>
              <Form.Control
                type='text'
                name='username'
                value={username}
                required
                placeholder={
                  router.locale === 'ru-RU'
                    ? 'Введите имя пользователя'
                    : 'Provide username'
                }
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formBasicEmail' className='mb-3'>
              <Form.Label>
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
                    : 'Provide your email'
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
                    : 'Enter password'
                }
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword2' className='mb-3'>
              <Form.Label>
                {router.locale === 'ru-RU' ? 'Пароль' : 'Password'}
              </Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={password2}
                placeholder={
                  router.locale === 'ru-RU'
                    ? 'Повторите пароль'
                    : 'Repeat your password'
                }
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              {router.locale === 'ru-RU' ? 'Зарегистрироваться' : 'Sign Up'}
            </Button>
          </Form>
          <h5 className='mt-3'>
            {router.locale === 'ru-RU'
              ? 'Уже зарегистрирован?'
              : 'Allready registered?'}
            <Link href='/account/login'>
              <a className='lead text-primary ms-2'>
                {router.locale === 'ru-RU' ? 'Войти' : 'Login'}
              </a>
            </Link>
          </h5>
        </Col>
      </Row>
    </Layout>
  )
}

export default RegisterPage
