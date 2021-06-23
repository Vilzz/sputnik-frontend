import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Col, Row, Card } from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa'

const About = () => {
  const router = useRouter()
  return (
    <Layout
      title={router.locale === 'ru-RU' ? 'О нас' : 'About us'}
      description={
        router.locale === 'ru-RU'
          ? 'Информация о макетной мастерской Спутник'
          : 'About Sputnik maket workshop'
      }
      keywords='макеты,сувенирные макеты, макеты космических аппаратов, фабрика моделей'
    >
      <h1 className='my-3 ms-3 text-primary'>
        <FaInfoCircle className='me-2' />О компании "Спутник"
      </h1>
      <div className='px-4 mb-3'>
        <hr />
      </div>
      {router.locale === 'ru-RU' ? (
        <Col className='d-flex justify-content-center'>
          <Card style={{ maxWidth: '1200px' }}>
            <Row className='g-0'>
              <Col md={4} className='p-3'>
                <Image
                  src='/images/about_us_400x600.jpg'
                  width='360px'
                  height='480px'
                />
              </Col>
              <Col md={8} style={{ maxWidth: '660px' }}>
                <Card.Body>
                  <Card.Text className='lh-sm'>
                    <strong>Макетная мастерская «Спутник»</strong> - молодая
                    быстроразвивающаяся компания, объединившая под своим началом
                    лучших моделистов города Самара, космической столицы России.
                  </Card.Text>
                  <Card.Text className='lh-sm'>
                    У нас трудятся высококвалифицированные специалисты, знатоки
                    своего дела, для которых создание масштабных моделей не
                    только работа.
                  </Card.Text>
                  <Card.Text className='lh-sm'>
                    Мы изготавливаем высокодетализированные макеты для выставок,
                    музейные экспонаты, полноразмерные макеты, VIP-сувениры и
                    наградную продукцию. На сегодняшний день мы можем воссоздать
                    практический любой макет, от сувенирного изделия до модели в
                    масштабе (1:1) с высокой степенью проработки.
                  </Card.Text>
                  <Card.Text className='lh-sm'>
                    Спектр работ нашей макетной компании составляют модели
                    ракетно-космической тематики, авиационной и судостроительной
                    техники, промышленные и военные макеты, макеты оборудования.
                  </Card.Text>
                  <Card.Text className='lh-sm'>
                    Наша макетная мастерская это современное производство. Мы
                    работаем на станках ЧПУ, станках лазерной и фрезерной резки,
                    используем 3Д принтеры и ротационные машины. Мы сотрудничаем
                    как с предприятиями ракетно-космической отрасли,
                    производственными организациями, так и с частными
                    заказчиками.
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      ) : (
        // Todo: Добавить описание страници О нас на английском языке
        <h1>About Sputnik company</h1>
      )}
    </Layout>
  )
}

export default About
