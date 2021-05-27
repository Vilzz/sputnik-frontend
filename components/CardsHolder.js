import React from 'react'
import MaketCard from './MaketCard'
const CardsHolder = ({ category }) => {
  return (
    <div className='category-cards'>
      <h3>{category.name}</h3>
      <hr />
      <div className='d-flex flex-wrap justify-content-evenly align-items-start'>
        {category.makets.map((maket) => (
          <MaketCard maket={maket} key={maket._id} />
        ))}
      </div>
    </div>
  )
}

export default CardsHolder
