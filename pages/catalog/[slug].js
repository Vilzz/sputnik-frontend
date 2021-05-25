import { useRouter } from 'next/router'
import axios from 'axios'
import Layout from '@/components/Layout'
import SideMenu from '@/components/SideMenu'
import CardsHolder from '@/components/CardsHolder'

import { API_URL } from '@/config/index.js'

const Category = ({ categories }) => {
  const router = useRouter()
  return (
    <Layout
      title='Каталог макетов'
      description='Каталог работ макетной студии Спутник'
      keywords='каталог, catalog, макеты, makets'
    >
      <div className='col-3'>
        <SideMenu categories={categories} />
      </div>
      <div className='col-9'>
        <CardsHolder />
      </div>
    </Layout>
  )
}

export default Category
export const getServerSideProps = async () => {
  const res = await axios.get(`${API_URL}categories?select=slug,name`)
  return {
    props: {
      categories: res.data.data,
    },
  }
}
