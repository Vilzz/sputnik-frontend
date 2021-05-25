import Image from 'next/image'
import Link from 'next/link'

const CategoryCard = ({ category }) => {
  console.log(category.slug)
  return (
    <div className='card shadow category_card px-2 py-3'>
      <Link href={`/catalog/${category.slug}`}>
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
        <div className='card-title'>
          <h6>{category.name}</h6>
        </div>
        <p className='card-text'>{category.description}</p>
      </div>
    </div>
  )
}

export default CategoryCard
