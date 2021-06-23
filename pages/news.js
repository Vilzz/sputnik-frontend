import axios from 'axios'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
import Article from '@/components/Article'
import { useRouter } from 'next/router'
import { FaNewspaper } from 'react-icons/fa'

const News = ({ articles }) => {
  const router = useRouter()
  return (
    <Layout
      title={router.locale === 'ru-RU' ? 'Новости кампании' : 'Company blog'}
      description={
        router.locale === 'ru-RU'
          ? 'Новости макетной студии Спутник'
          : 'Sputnik company blog '
      }
      keywords='новости о макетах, новые макеты, макеты ракет, spaceship makets'
    >
      <h1 className='text-primary mt-3 mb-2 ms-5'>
        <FaNewspaper className='me-2' />
        {router.locale === 'ru-RU' ? 'Новости' : 'News'}
      </h1>
      <div className='px-4 mb-3'>
        <hr />
      </div>
      <Article articles={articles} />
    </Layout>
  )
}

export default News

export const getServerSideProps = async (ctx) => {
  const res = await axios.get(`${API_URL}articles`)

  return {
    props: {
      articles: res.data.data,
    },
  }
}
