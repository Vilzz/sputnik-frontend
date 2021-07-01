import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Table, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
import { ImRocket } from 'react-icons/im'

const Maket = ({ maket }) => {
  const router = useRouter()
  const [mainImage, setMainImage] = useState(maket.images[0].image)
  return (
    <Layout
      title={maket.name}
      description={
        router.locale === 'ru-RU' ? maket.shortdesc : maket.shortdesc_en
      }
      keywords={
        router.locale === 'ru-RU'
          ? maket.keywords.join(',')
          : maket.keywords_en.join(',')
      }
    >
      <Col className='mt-4'>
        <Row>
          <Col md={5}>
            <Row className='g-0'>
              <Col md={10}>
                <Image
                  src={mainImage}
                  width='450px'
                  height='675px'
                  alt={router.locale === 'ru-RU' ? maket.name : maket.name_en}
                />
              </Col>
              <Col md={2}>
                {maket.images.map((image, idx) => (
                  <div
                    className='thumbs'
                    key={image._id}
                    onClick={() => setMainImage(maket.images[idx].image)}
                    className='thumbs'
                  >
                    <Image src={image.image} width={80} height={120} />
                  </div>
                ))}
              </Col>
            </Row>
          </Col>

          <Col md={7}>
            <h1 className='text-primary'>
              {router.locale === 'ru-RU' ? maket.name : maket.name_en}
            </h1>
            <hr />
            <h6 className='mb-4'>
              {router.locale === 'ru-RU'
                ? maket.description
                : maket.description_en}
            </h6>
            <div className='d-flex flex-lg-row flex-column justify-content-sm-start justify-content-md-between align-items-sm-start align-items-md-center px-2 mb-2'>
              <h5>
                {router.locale === 'ru-RU'
                  ? 'Доступные масштабы:'
                  : 'Avialable scales'}
              </h5>
              <div className='mb-3'>
                {maket.scales.map((scale) => (
                  <span className='scale-badge bg-primary' key={scale}>
                    {scale}
                  </span>
                ))}
              </div>
            </div>
            <div className='d-flex justify-content-between align-items-center px-2 mb-3'>
              <h5>{router.locale === 'ru-RU' ? 'Категория:' : 'Category:'}</h5>
              <Link href={`/catalog/${maket.category.slug}`}>
                <a className='category-badge bg-primary'>
                  {router.locale === 'ru-RU'
                    ? maket.category.name
                    : maket.category.name_en}
                </a>
              </Link>
            </div>
            <div className='d-flex justify-content-between align-items-center px-2'>
              <h5>
                {router.locale === 'ru-RU'
                  ? 'Срок производства:'
                  : 'Production time'}
              </h5>
              <div>
                <span className='scale-badge bg-primary'>
                  {maket.prodtime} {router.locale === 'ru-RU' ? 'дней' : 'days'}
                </span>
              </div>
            </div>

            {maket.prices.length > 0 && (
              <div className='prices mt-3'>
                <Table striped bordered hover className='table-gray'>
                  <thead>
                    <tr className='table-dark'>
                      <th>#</th>
                      <th>Масштаб</th>
                      <th>Цена</th>
                      <th>Валюта</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maket.prices.map(({ price, _id, scale }, idx) => (
                      <tr key={_id}>
                        <td>{idx + 1}</td>
                        <td>{scale}</td>
                        <td>
                          {price.rub.symb}
                          {price.rub.price}
                        </td>
                        <td>{price.rub.currency}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            <Link href={`/catalog/${maket.category.slug}`}>
              <a className='btn btn-primary mt-3 ms-3'>
                {router.locale === 'ru-RU' ? (
                  <>
                    <ImRocket className='me-2' />
                    Вернуться в каталог
                  </>
                ) : (
                  <>
                    <ImRocket className='me-2' /> Back to catalog
                  </>
                )}
              </a>
            </Link>
          </Col>
        </Row>
      </Col>
    </Layout>
  )
}

export default Maket

export const getServerSideProps = async (ctx) => {
  const res = await axios.get(`${API_URL}makets/${ctx.query.id}`)
  return {
    props: {
      maket: res.data.data,
    },
  }
}
