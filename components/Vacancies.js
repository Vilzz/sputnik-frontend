import { useState } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Card, Row, Col, Button } from 'react-bootstrap'

const Vacancies = ({ vacancies }) => {
  const [isPublished, setIsPublished] = useState(
    vacancies.length > 0
      ? vacancies.filter((vacancy) => vacancy.published === true)
      : null
  )
  const formatDate = (date) => {
    return format(new Date(date), 'dd MMMM yyyy', { locale: ru })
  }
  return isPublished !== null ? (
    isPublished.map((vacancy) => (
      <Col md={6}>
        <Card style={{ maxWidth: '540px' }}>
          <Row className='g-0'>
            <Col md={4}>
              <Image
                src='/images/assemble_400x600.jpg'
                width={200}
                height={300}
              />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title as='h5' className='fw-bold'>
                  {vacancy.title}
                </Card.Title>
                <Card.Text className='lh-sm'>{vacancy.description}</Card.Text>
                <Card.Text className='d-flex justify-content-between px-3'>
                  Размещена: <strong>{formatDate(vacancy.updatedAt)}</strong>
                </Card.Text>
                <Card.Text className='d-flex justify-content-between px-3'>
                  Зарплата от<strong> {vacancy.salary} руб</strong>
                </Card.Text>
              </Card.Body>
            </Col>
            <Card.Footer className='d-flex justify-content-center'>
              <Button variant='primary'>Откликнуться</Button>
            </Card.Footer>
          </Row>
        </Card>
      </Col>
    ))
  ) : (
    <h3>Нет свободных вакансий на текущий момент</h3>
  )
}

export default Vacancies
