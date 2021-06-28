import Image from 'next/image'
import MaketCard from './MaketCard'

const CardsHolder = ({ category }) => {
  const sortMakets = (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
  return (
    <div className='category-cards'>
      <div className='d-flex align-items-center mt-2'>
        <Image
          src={category.image}
          width='70'
          height='70'
          alt={category.name1}
        />
        <h1 className='ms-4 mt-2 text-primary display-5'>{category.name}</h1>
      </div>
      <hr />
      <div className='d-flex flex-wrap justify-content-evenly align-items-start'>
        {category.makets
          .sort(sortMakets)
          .filter((maket) => maket.published === true)
          .map((maket) => (
            <MaketCard maket={maket} key={maket._id} />
          ))}
      </div>
    </div>
  )
}

export default CardsHolder
