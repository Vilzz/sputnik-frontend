import Image from 'next/image'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Col } from 'react-bootstrap'
import Link from 'next/link'

const Article = ({ articles }) => {
  const formatDate = (dt) => {
    return format(new Date(dt), 'k:mm:ss dd MMMM yyyy', { locale: ru })
  }
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
                Sputnik /{' '}
                <strong className='text-primary fs-6'>
                  {formatDate(article.createdAt)}
                </strong>
              </div>
              <h3 className='my_card_title'> {article.title}</h3>
              <p className='my_card_text'>{trancateText(article.text)}</p>
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
