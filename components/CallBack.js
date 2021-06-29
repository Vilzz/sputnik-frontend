import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { API_URL } from '@/config/index'

const CallBack = ({ setToast }) => {
  const router = useRouter()
  const [callback, setCallback] = useState({
    name: '',
    phone: '',
  })
  const handleChange = (e) => {
    setCallback({
      ...callback,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${API_URL}requests`, callback)
      setCallback({
        name: '',
        phone: '',
      })
      setToast(
        router.locale === 'ru-RU'
          ? 'Запрос успешно отправлен, мы свяжемся  с вами в ближайшее время'
          : 'Your request submited, we will call you soon',
        true
      )
    } catch (error) {
      setToast(`${error.response.data.error}`, false)
    }
  }
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <h6>
        {router.locale === 'ru-RU'
          ? 'Оставьте ваш номер мы вам перезвоним'
          : 'Provide your phone number we will call you'}
      </h6>
      <Row className='callback-form g-2 px-2 px-md-3'>
        <Col md={5}>
          <Form.Group>
            <Form.Control
              type='text'
              name='name'
              required
              value={callback.name}
              placeholder={router.locale === 'ru-RU' ? 'Ваше имя' : 'Your name'}
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Control
              type='text'
              name='phone'
              required
              value={callback.phone}
              placeholder={
                router.locale === 'ru-RU' ? 'Номер телефона' : 'Phone number'
              }
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </Form.Group>
        </Col>
        <Col md={3} className='d-flex justify-content-center pt-2 pt-md-0'>
          <Button type='submit'>
            {router.locale === 'ru-RU' ? 'Оставить контакт' : 'Ask for call'}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default CallBack
