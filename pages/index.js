import axios from 'axios'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index.js'
import { formatDate } from '@/helpers/index'
import { Button, Col, Row, Card } from 'react-bootstrap'
import CallBack from '@/components/CallBack'

const Home = ({ categories, articles }) => {
  const router = useRouter()
  return (
    <Layout
      title={
        router.locale === 'ru-RU'
          ? 'Макетная компания спутник'
          : 'Maket company Sputnik'
      }
      description={
        router.locale === 'ru-RU'
          ? 'Сайт макетной студии Спутник'
          : 'Sputnik makets studio site'
      }
      keywords='макеты ракет, спутник мактеная компания, макеты космос'
    >
      <Col className='pt-5'>
        <Row>
          <Col md={3}>
            <h3 className='px-2 mb-3'>
              {router.locale === 'ru-RU' ? 'Портфолио' : 'Portfolio'}
            </h3>
            {categories.map((category) => (
              <div className='d-grid gap-2 px-1' key={category._id}>
                <Link href={`/catalog/${category.slug}`}>
                  <Button
                    variant='outline-primary'
                    className='d-flex justify-content-between align-items-center mb-3'
                  >
                    <Image src={category.image} width={40} height={40} />
                    <span>
                      {router.locale === 'ru-RU'
                        ? category.name
                        : category.name_en}
                    </span>
                  </Button>
                </Link>
              </div>
            ))}
          </Col>
          <Col md={6} className='mb-3'>
            <h3 className='ps-1'>
              {router.locale === 'ru-RU'
                ? 'Макетная компания «Спутник»'
                : 'Sputnik maket company'}
            </h3>
            <Card className='px-md-3' style={{ minHeight: '480px' }}>
              <Card.Body>
                {router.locale === 'ru-RU' ? (
                  <>
                    <Card.Text className='lh-sm'>
                      <strong>Макетная мастерская «Спутник»</strong> - молодая
                      быстроразвивающаяся компания, объединившая под своим
                      началом лучших моделистов города Самара, космической
                      столицы России.
                    </Card.Text>
                    <Card.Text className='lh-sm'>
                      У нас трудятся высококвалифицированные специалисты,
                      знатоки своего дела, для которых создание масштабных
                      моделей не только работа.
                    </Card.Text>
                    <Card.Text className='lh-sm'>
                      Мы изготавливаем высокодетализированные макеты для
                      выставок, музейные экспонаты, полноразмерные макеты,
                      VIP-сувениры и наградную продукцию. На сегодняшний день мы
                      можем воссоздать практический любой макет, от сувенирного
                      изделия до модели в масштабе (1:1) с высокой степенью
                      проработки.
                    </Card.Text>
                    <Card.Text className='lh-sm'>
                      Спектр работ нашей макетной компании составляют модели
                      ракетно-космической тематики, авиационной и
                      судостроительной техники, промышленные и военные макеты,
                      макеты оборудования.
                    </Card.Text>
                    <Card.Text className='lh-sm'>
                      Наша макетная мастерская это современное производство. Мы
                      работаем на станках ЧПУ, станках лазерной и фрезерной
                      резки, используем 3Д принтеры и ротационные машины. Мы
                      сотрудничаем как с предприятиями ракетно-космической
                      отрасли, производственными организациями, так и с частными
                      заказчиками.
                    </Card.Text>
                  </>
                ) : (
                  <>
                    <Card.Text className='lh-sm'>
                      <strong>The Sputnik model-building company</strong> is a
                      young, fast-growing production that has united the best
                      modellers from the Samara city, the space capital of
                      Russia. We employ highly qualified specialists, experts in
                      their field, for whom the creation of large-scale models
                      is not only a job.
                    </Card.Text>
                    <Card.Text className='lh-sm'>
                      We produce highly detailed mock-ups for exhibitions and
                      museums, full-size models, VIP-souvenirs of space and
                      aircrafts. Today we can produce almost any model, from a
                      souvenir item to a model in scale (1: 1) with a high level
                      of detailing. The range of works of our model company
                      includes models of rocket and space subjects, aviation and
                      shipbuilding equipment, industrial, military and equipment
                      models.
                    </Card.Text>
                    <Card.Text className='lh-sm'>
                      Our model company is a modern manufacture. We work on
                      lathe, milling and laser machines, use 3D-printers and
                      rotary machines. We cooperate with both enterprises of the
                      rocket and space industry, industrial organizations and
                      private customers.
                    </Card.Text>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <h3>{router.locale === 'ru-RU' ? 'Новости' : 'News'}</h3>
            {articles
              .filter((article, idx) => idx < 6)
              .map((article) => (
                <Link href={`/news/${article.slug}`} key={article._id}>
                  <Row
                    className='justify-content-start mb-2 px-3 px-md-0'
                    style={{ cursor: 'pointer' }}
                  >
                    <Col xs={3} className='me-2 p-md-0'>
                      <Image src={article.image} width={80} height={57} />
                    </Col>

                    <Col xs={8}>
                      <span className='text-primary lh-1'>
                        &#9613;{formatDate(article.createdAt, false)}
                      </span>
                      <h6
                        className='news-links lh-1'
                        style={{ fontSize: '0.9rem' }}
                      >
                        {router.locale === 'ru-RU'
                          ? article.title
                          : article.title_en}
                      </h6>
                    </Col>
                  </Row>
                </Link>
              ))}
            <Row className='justify-content-start'>
              <Col className='d-grid ps-md-0 pe-md-5'>
                <Link href='/news'>
                  <Button variant='primary'>
                    {router.locale === 'ru-RU'
                      ? 'Больше новостей'
                      : 'More news'}
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='my-3'>
          <Col md={{ span: 8, offset: 2 }}>
            <CallBack />
          </Col>
        </Row>
      </Col>
    </Layout>
  )
}
export default Home

export const getServerSideProps = async () => {
  const categories = await axios.get(`${API_URL}categories?sort=order`)
  const articles = await axios.get(`${API_URL}articles?sort=createdAt`)
  return {
    props: {
      categories: categories.data.data,
      articles: articles.data.data,
    },
  }
}
