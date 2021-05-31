import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
const MaketCard = ({ maket }) => {
  const router = useRouter()
  return (
    <div className='card maket-card mb-3' style={{ width: '18rem' }}>
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

      <div className='card-body maket-body'>
        <h4 className='card-title'>
          {router.locale === 'ru-RU' ? maket.name : maket.name_en}
        </h4>
        <hr />
        <p className='card-text' style={{ minHeight: '60px' }}>
          {router.locale === 'ru-RU' ? maket.shortdesc : maket.shortdesc_en}
        </p>
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
      </div>
    </div>
  )
}

export default MaketCard
