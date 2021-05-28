import Image from 'next/image'
import Link from 'next/link'
const MaketCard = ({ maket }) => {
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
        <h4 className='card-title'>{maket.name}</h4>
        <hr />
        <p className='card-text' style={{ minHeight: '60px' }}>
          {maket.shortdesc}
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
