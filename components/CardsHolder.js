import React from 'react'
import MaketCard from './MaketCard'
const CardsHolder = ({ category }) => {
  return (
    <div className='category-cards'>
      <h3>{category.name}</h3>
      <div className='d-flex justify-content-evenly align-items-start'>
        {category.makets.map((maket) => (
          <MaketCard maket={maket} />
        ))}
      </div>
    </div>
  )
}

export default CardsHolder
