import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
const SideMenu = ({ sideMenuItems }) => {
  const router = useRouter()
  return (
    <div className='sidemenu'>
      <h3>Категории</h3>
      <hr />
      <ul className='list-group list-group-flush'>
        {sideMenuItems !== null &&
          sideMenuItems.map(({ id, name, slug, maketsLength }) => (
            <li
              key={id}
              className={
                slug === router.query.slug
                  ? 'list-group-item d-flex justify-content-between align-items-start active'
                  : 'list-group-item d-flex justify-content-between align-items-start'
              }
            >
              <div>
                <Link href={`/catalog/${slug}`}>
                  <a className='sidemenu-link'>{name}</a>
                </Link>
              </div>

              <span
                className={
                  slug === router.query.slug
                    ? 'badge bg-danger rounded-pill'
                    : 'badge bg-primary rounded-pill'
                }
              >
                {maketsLength}
              </span>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default SideMenu
