import axios from 'axios'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index.js'
import CategoryCard from '@/components/CategoryCard'
import { Col } from 'react-bootstrap'
import { ImRocket } from 'react-icons/im'

const Home = ({ categories }) => {
  const router = useRouter()
  return (
    <Layout
      title={router.locale === 'ru-RU' ? 'Каталог макетов' : 'Makets catalog'}
      description={
        router.locale === 'ru-RU'
          ? 'Каталог работ макетной студии Спутник'
          : 'Sputnik studio models catalog'
      }
      keywords='каталог, catalog, макеты, makets'
    >
      <h1 className='my-3 ms-3 text-primary'>
        <ImRocket className='me-2' />
        {router.locale === 'ru-RU' ? 'Каталог макетов' : 'Catalog of makets'}
      </h1>
      <hr />
      <Col>
        <div className='d-flex justify-content-evenly align-items-center flex-wrap g-5 m-4'>
          {categories
            .filter((category) => category.showinmenu === true)
            .map((category) => (
              <CategoryCard category={category} key={category._id} />
            ))}
        </div>
      </Col>
    </Layout>
  )
}
export default Home

export const getServerSideProps = async () => {
  const res = await axios.get(`${API_URL}categories`)
  return {
    props: {
      categories: res.data.data,
    },
  }
}
