import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Card } from 'react-bootstrap'

const MaketCard = ({ maket }) => {
  const router = useRouter()
  return (
    <Card className='maket-card mb-3'>
      <Link href={`/catalog/maket/${maket._id}`}>
        <a>
          <Image
            src={maket.images[0]}
            width='300px'
            height='450px'
            alt={maket.name}
          />
        </a>
      </Link>

      <Card.Body className='maket-body'>
        <Card.Title as='h4'>
          {router.locale === 'ru-RU' ? maket.name : maket.name_en}
        </Card.Title>
        <hr />
        <Card.Text className='maket-desc'>
          {router.locale === 'ru-RU' ? maket.shortdesc : maket.shortdesc_en}
        </Card.Text>
        <div className='scale-card mb-3'>
          <div>
            <h6>Доступные масштабы: </h6>
            {maket.scales.map((scale) => (
              <span className='scale-badge bg-success' key={scale}>
                {scale}
              </span>
            ))}
          </div>
          <Link href={`/catalog/maket/${maket._id}`}>
            <a className='btn btn-primary'>Подробнее</a>
          </Link>
        </div>
      </Card.Body>
    </Card>
  )
}

export default MaketCard
