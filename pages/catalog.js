import axios from 'axios'
import { API_URL } from '@/config/index.js'
import Layout from '@/components/Layout'
import CategoryCard from '@/components/CategoryCard'

const Catalog = ({ categories }) => {
  return (
    <Layout
      title='Каталог макетов'
      description='Каталог работ макетной студии Спутник'
      keywords='каталог, catalog, макеты, makets'
    >
      <div className='col d-lg-flex justify-content-evenly mt-3 px-5'>
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
