import { useRouter } from 'next/router'
import axios from 'axios'
import Layout from '@/components/Layout'
import SideMenu from '@/components/SideMenu'
import CardsHolder from '@/components/CardsHolder'

import { API_URL } from '@/config/index.js'

const Category = ({ sideMenuItems, category }) => {
  const router = useRouter()
  return (
    <Layout
      title={router.locale === 'ru-RU' ? 'Каталог макетов' : 'Makets catalog'}
      description={
        router.locale === 'ru-RU'
          ? 'Каталог работ макетной студии Спутник'
          : 'Maket studio Sputnik catalog of models'
      }
      keywords='каталог, catalog, макеты, makets'
    >
      <div className='col col-md-3'>
        <SideMenu sideMenuItems={sideMenuItems} />
      </div>
      <div className='col col-md-9'>
        <CardsHolder category={category} />
      </div>
    </Layout>
  )
}

export default Category
export const getServerSideProps = async (ctx) => {
  const res = await axios.get(`${API_URL}categories?sort=order`)
  const sideMenuItems = res.data.data
    .filter((item) => item.showinmenu === true)
    .map(({ _id, name, slug, makets }) => {
      return { id: _id, name, slug, maketsLength: makets.length }
    })
  const category = res.data.data.filter(
    (item) => item.slug === ctx.query.slug
  )[0]
  return {
    props: {
      category,
      sideMenuItems,
    },
  }
}
