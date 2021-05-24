import React, { useState } from 'react'
import Link from 'next/link'
const SideMenu = ({ categories }) => {
  const [active, setActive] = useState(0)
  return (
    <div className='sidemenu'>
      <h3>Категории</h3>
      <ul className='list-group list-group-flush'>
        {categories !== null &&
          categories.map((category, idx) => (
            <li
              key={category._id}
              className={
                idx === active ? 'list-group-item active' : 'list-group-item'
              }
            >
              <Link href={`/makets/${category.slug}`}>
                <a>{category.name}</a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default SideMenu
