import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
const SideMenu = ({ categories }) => {
  const router = useRouter()
  return (
    <div className='sidemenu'>
      <h3>Категории</h3>
      <hr />
      <ul className='list-group list-group-flush'>
        {categories !== null &&
          categories.map((category, idx) => (
            <li
              key={category._id}
              className={
                category.slug === router.query.slug
                  ? 'list-group-item active'
                  : 'list-group-item'
              }
            >
              <Link href={`/catalog/${category.slug}`}>
                <a className='sidemenu-link'>{category.name}</a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default SideMenu
