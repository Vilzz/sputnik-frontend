import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const CategoryCard = ({ category }) => {
  const router = useRouter()
  return (
    <div className='card shadow category_card px-2 py-3'>
      <Link
        href={
          router.locale === 'ru-RU'
            ? `/catalog/${category.slug}`
            : `/catalog/${router.locale}/${category.slug}`
        }
      >
        <a>
          <div className='d-flex justify-content-center'>
            <Image
              src={category.image}
              className='card-img-top'
              width='180px'
              height='180px'
            />
          </div>
        </a>
      </Link>
      <div className='card-body'>
        {router.locale === 'ru-RU' ? (
          <div className='d-flex flex-column justify-content-between align-items-center'>
            <div className='card-title'>
              <h6>{category.name}</h6>
            </div>
            <div>
              <Link href={`/catalog/${category.slug}`}>
                <a className='btn btn-primary'>К макетам</a>
              </Link>
            </div>
          </div>
        ) : (
          <div className='d-flex flex-column justify-content-between align-items-center'>
            <div className='card-title'>
              <h6>{category.name_en}</h6>
            </div>
            <div>
              <Link href={`/catalog/${category.slug}`}>
                <a className='btn btn-primary'>Get makets</a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryCard
