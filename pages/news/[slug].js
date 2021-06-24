import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/Layout'
import axios from 'axios'
import { API_URL } from '@/config/index'
import { formatDate } from '@/helpers/index'
import { Col, Button } from 'react-bootstrap'
const BlogPost = ({ article }) => {
  const router = useRouter()
  return (
    <Layout title={router.locale === 'ru-RU' ? article.title : 'На английском'}>
      <Col md={{ span: 8, offset: 2 }}>
        <div className='mt-4'>
          <h5 className='news_article'>
            Sputniknews / {formatDate(article.createdAt)}
          </h5>
          <Image src={article.image} width={700} height={500} />
        </div>
        <h1 className='text-primary ms-3'>{article.title}</h1>
        <div>{article.text}</div>
        <div className='d-flex justify-content-center my-4'>
          <Link href='/news'>
            <Button>К списку новостей</Button>
          </Link>
        </div>
      </Col>
    </Layout>
  )
}

export default BlogPost
export const getServerSideProps = async (ctx) => {
  const article = await axios.post(`${API_URL}articles/${ctx.query.slug}`)
  return {
    props: {
      article: article.data.data,
    },
  }
}
