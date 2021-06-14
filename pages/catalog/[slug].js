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
      title={router.locale === 'ru-RU' ? category.name : category.name_en}
      description={
        router.locale === 'ru-RU'
          ? category.description
          : category.description_en
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
    .map(({ _id, name, name_en, slug, makets }) => {
      return {
        id: _id,
        name,
        name_en,
        slug,
        maketsLength: makets.filter((maket) => maket.published === true).length,
      }
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
