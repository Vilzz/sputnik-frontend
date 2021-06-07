import { Nav } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AdminPanelMenu = ({ title }) => {
  const router = useRouter()

  return (
    <div className='sidemenu mt-4'>
      <h3>{title}</h3>
      <hr />
      <ul className='list-group list-group-flush'>
        <li
          className={
            router.pathname === '/admin/category'
              ? 'list-group-item d-flex justify-content-between align-items-start active'
              : 'list-group-item d-flex justify-content-between align-items-start'
          }
        >
          <Link href='/admin/category'>
            <a className='sidemenu-link'>Категории</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === '/admin/makets'
              ? 'list-group-item d-flex justify-content-between align-items-start active'
              : 'list-group-item d-flex justify-content-between align-items-start'
          }
        >
          <Link href='/admin/makets'>
            <a className='sidemenu-link'>Макеты</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default AdminPanelMenu
