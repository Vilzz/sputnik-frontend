import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '@/components/Layout'
import { Card, Row, Col, Button } from 'react-bootstrap'

const Carier = () => {
  const router = useRouter()
  return (
    <Layout
      title={
        router.locale === 'ru-RU' ? 'Вакансии компании' : 'Company hire list'
      }
    >
      <Row>
        <h1 className='text-primary my-3'>Вакансии компании</h1>
        <hr />
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
                    Сборщик макетов
                  </Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Officia eaque corporis repellat tempora sed inventore
                    aliquid debitis aperiam ut asperiores minus, quos, eos
                    molestias eligendi perspiciatis amet pariatur ducimus cum.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant='primary'>Откликнуться</Button>
                </Card.Footer>
              </Col>
            </Row>
          </Card>
        </Col>
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
                    Токарь-фрезеровщик
                  </Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Officia eaque corporis repellat tempora sed inventore
                    aliquid debitis aperiam ut asperiores minus, quos, eos
                    molestias eligendi perspiciatis amet pariatur ducimus cum.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant='primary'>Откликнуться</Button>
                </Card.Footer>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}

export default Carier
