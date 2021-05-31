import axios from 'axios'
import { useRouter } from 'next/router'
import { API_URL } from '@/config/index.js'
import Layout from '@/components/Layout'
import CategoryCard from '@/components/CategoryCard'

const Catalog = ({ categories }) => {
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
      <h1 className='my-3'>Каталог продукции</h1>
      <hr />
      <div className='d-flex justify-content-evenly align-items-center flex-wrap my-4'>
        {categories.map((category) => (
          <CategoryCard category={category} key={category._id} />
        ))}
      </div>
    </Layout>
  )
}

export default Catalog

export const getServerSideProps = async () => {
  const res = await axios.get(`${API_URL}categories`)
  return {
    props: {
      categories: res.data.data,
    },
  }
}
