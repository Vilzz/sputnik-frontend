import { useRouter } from 'next/router'
import { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

const CallBack = () => {
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
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(callback)
  }
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <h6>Оставьте ваш номер мы вам перезвоним</h6>
      <Row className='callback-form g-2 px-2 px-md-3'>
        <Col md={5}>
          <Form.Group>
            <Form.Control
              type='text'
              name='name'
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
