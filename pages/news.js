import axios from 'axios'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
import Article from '@/components/Article'
import { useRouter } from 'next/router'
import { FaNewspaper } from 'react-icons/fa'

const News = ({ articles }) => {
  const router = useRouter()
  return (
    <Layout>
      <h1 className='text-primary my-3 ms-5'>
        <FaNewspaper className='me-2' />
        {router.locale === 'ru-RU' ? 'Новости' : 'News'}
      </h1>
      <hr className='mb-5' />
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
