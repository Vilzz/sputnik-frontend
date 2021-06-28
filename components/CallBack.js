import { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

const CallBack = () => {
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
      <h5>Оставьте ваш номер мы вам перезвоним</h5>
      <Row className='callback-form'>
        <Col md={5}>
          <Form.Group>
            <Form.Control
              type='text'
              name='name'
              placeholder='Ваше имя'
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
              placeholder='Номер телефона'
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Button type='submit'>Оставить заявку</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default CallBack
