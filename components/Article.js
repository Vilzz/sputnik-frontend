import Image from 'next/image'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import styles from '@/styles/Articles.module.css'
import { Col } from 'react-bootstrap'

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
          <div className={styles.my_card} key={article._id}>
            <div className={styles.my_image}>
              <Image src={article.image} width={350} height={250} />
            </div>
            <div>
              <div className={styles.my_card_date}>
                Sputnik /{' '}
                <strong className='text-primary fs-6'>
                  {formatDate(article.createdAt)}
                </strong>
              </div>
              <h3 className={styles.my_card_title}> {article.title}</h3>
              <p className={styles.my_card_text}>
                {trancateText(article.text)}
              </p>
              <button className={styles.my_button}>Подробнее...</button>
            </div>
          </div>
        ))}
    </Col>
  )
}

export default Article
