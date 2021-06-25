import Image from 'next/image'
import { useRouter } from 'next/router'
import { Col } from 'react-bootstrap'
import { formatDate } from '@/helpers/index'
import Link from 'next/link'

const Article = ({ articles }) => {
  const router = useRouter()
  const trancateText = (txt) => {
    return (
      txt
        .split(' ')
        .filter((t, i) => i < 18)
        .join(' ') + '...'
    )
  }
  return (
    <Col md={{ span: 8, offset: 2 }}>
      {articles
        .filter((article) => article.isPublished === true)
        .map((article) => (
          <div className='my_card' key={article._id}>
            <div className='my_image'>
              <Image src={article.image} width={350} height={250} />
            </div>
            <div>
              <div className='my_card_date'>
                Sputniknews{' '}
                <strong className='text-primary fs-6'>
                  &#9613;{formatDate(article.createdAt)}
                </strong>
              </div>
              <h3 className='my_card_title'>
                {' '}
                {router.locale === 'ru-RU' ? article.title : article.title_en}
              </h3>
              <p className='my_card_text'>
                {trancateText(
                  router.locale === 'ru-RU' ? article.text : article.text_en
                )}
              </p>
              <Link href={`/news/${article.slug}`}>
                <button className='my_button'>Подробнее...</button>
              </Link>
            </div>
          </div>
        ))}
    </Col>
  )
}

export default Article
