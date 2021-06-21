import { useState } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Card, Row, Col, Button } from 'react-bootstrap'
import Link from 'next/link'

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
    <Col>
      <Row className='g-4 justify-content-center'>
        {isPublished.map((vacancy) => (
          <Card style={{ width: '19rem' }} key={vacancy._id} className='me-4'>
            <Card.Body style={{ minHeight: '200px' }}>
              <Card.Title as='h5' className='fw-bold'>
                {vacancy.title}
              </Card.Title>
              <Card.Text className='lh-sm' style={{ minHeight: '90px' }}>
                {vacancy.description}
              </Card.Text>
              <Card.Text className='d-flex justify-content-between fs-6 lh-1'>
                Дата:
                <strong className='text-primary'>
                  {formatDate(vacancy.updatedAt)}
                </strong>
              </Card.Text>
              <Card.Text className='d-flex justify-content-between fs-6 lh-1'>
                Зарплата от
                <strong className='text-primary'> {vacancy.salary} руб</strong>
              </Card.Text>
            </Card.Body>

            <Card.Footer className='d-flex justify-content-center'>
              <Link href='/contacts'>
                <Button as='a'>Откликнуться</Button>
              </Link>
            </Card.Footer>
          </Card>
        ))}
      </Row>
    </Col>
  ) : (
    <h3>Нет свободных вакансий на текущий момент</h3>
  )
}

export default Vacancies
