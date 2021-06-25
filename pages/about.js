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
        <FaInfoCircle className='me-2' />
        {router.locale === 'ru-RU'
          ? 'О компании "Спутник"'
          : 'About sputnik company'}
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
                    <strong>Maket company Sputnik</strong> - Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Id temporibus ducimus
                    reprehenderit possimus repellendus magni non. Repellat
                    fugiat eligendi ipsa aliquam distinctio a odio dignissimos
                    quisquam soluta velit ratione ullam alias labore, laboriosam
                    architecto quam aut placeat incidunt at? Tempora?
                  </Card.Text>
                  <Card.Text className='lh-sm'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Esse cumque, optio blanditiis culpa voluptate rerum
                    voluptates aliquam explicabo natus minus!
                  </Card.Text>
                  <Card.Text className='lh-sm'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Pariatur consectetur, non impedit aliquid deleniti illo
                    assumenda praesentium aliquam est sequi iste ducimus nemo
                    ratione cumque delectus neque sapiente eum soluta quo esse,
                    labore animi necessitatibus.
                  </Card.Text>
                  <Card.Text className='lh-sm'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Iste hic rem voluptas animi saepe qui labore ex, consectetur
                    magnam iure beatae ad eveniet quaerat dolorum, iusto numquam
                    et accusamus enim, nemo eius pariatur aspernatur voluptatem
                    aut sit? Error enim eveniet, ipsa atque mollitia cupiditate
                    fugit.
                  </Card.Text>
                  <Card.Text className='lh-sm'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis soluta, omnis quam molestias incidunt enim.
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      )}
    </Layout>
  )
}

export default About
