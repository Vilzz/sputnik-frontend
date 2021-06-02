import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
const Maket = ({ maket }) => {
  const router = useRouter()
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
      <div className='row mt-4'>
        <div className='col-12 col-md-5'>
          <Image
            src={maket.images[0]}
            width='450px'
            height='675px'
            alt={router.locale === 'ru-RU' ? maket.name : maket.name_en}
          />
        </div>
        <div className='col-12 col-md-7'>
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
            <h5>Срок производства:</h5>
            <div>
              <span className='scale-badge bg-primary'>
                {maket.prodtime} дней
              </span>
            </div>
          </div>
          <div className='prices mt-3'>
            {maket.prices.length > 0 && (
              <Table striped bordered hover>
                <thead>
                  <tr>
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
            )}
          </div>

          <Link href={`/catalog/${maket.category.slug}`}>
            <a className='btn btn-primary'>В каталог</a>
          </Link>
        </div>
      </div>
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
