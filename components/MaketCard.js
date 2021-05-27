import Image from 'next/image'
import Link from 'next/link'
const MaketCard = ({ maket }) => {
  return (
    <div className='card maket-card' style={{ width: '18rem' }}>
      <Image src={maket.images[0]} width='300px' height='450px' />
      <div className='card-body'>
        <div className='card-title'>
          <h4>{maket.name}</h4>
        </div>
        <hr />
        <p className='card-text'>{maket.shortdesc}</p>
        <p className='card-text'>
          Доступные масштабы: <br />
          {maket.scales.map((scale) => (
            <span className='badge bg-primary'>{scale}</span>
          ))}
        </p>
        <Link href={`/catalog/maket/${maket._id}`}>
          <a className='btn btn-primary'>Подробнее</a>
        </Link>
      </div>
    </div>
  )
}

export default MaketCard
