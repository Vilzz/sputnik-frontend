import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthContext from '@/context/AuthContext'
import { Form, Button } from 'react-bootstrap'

const RegisterPage = () => {
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
    <Layout title='Регистрация пользователя'>
      <div>
        <h1>Регистрация</h1>
      </div>
      <ToastContainer />
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId='formBasicName' className='mb-3'>
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control
            type='text'
            name='username'
            value={username}
            required
            placeholder='Введите имя пользователя'
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail' className='mb-3'>
          <Form.Label>Электронная почта</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={email}
            required
            placeholder='Введите адрес эл. почты'
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword' className='mb-3'>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={password}
            placeholder='Введите пароль'
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword2' className='mb-3'>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={password2}
            placeholder='Повторите пароль'
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Зарегистрироваться
        </Button>
      </Form>
    </Layout>
  )
}

export default RegisterPage
