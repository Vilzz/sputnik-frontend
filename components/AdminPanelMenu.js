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
            router.pathname === '/admin/category/create'
              ? 'list-group-item d-flex justify-content-between align-items-start active'
              : 'list-group-item d-flex justify-content-between align-items-start'
          }
        >
          <Link href='/admin/category/create'>
            <a className='sidemenu-link'>Создать категорию</a>
          </Link>
        </li>
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
            router.pathname === '/admin/makets/create'
              ? 'list-group-item d-flex justify-content-between align-items-start active'
              : 'list-group-item d-flex justify-content-between align-items-start'
          }
        >
          <Link href='/admin/makets/create'>
            <a className='sidemenu-link'>Создать макет</a>
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
        <li
          className={
            router.pathname === '/admin/users'
              ? 'list-group-item d-flex justify-content-between align-items-start active'
              : 'list-group-item d-flex justify-content-between align-items-start'
          }
        >
          <Link href='/admin/users'>
            <a className='sidemenu-link'>Пользователи</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === '/admin/vacancies/create'
              ? 'list-group-item d-flex justify-content-between align-items-start active'
              : 'list-group-item d-flex justify-content-between align-items-start'
          }
        >
          <Link href='/admin/vacancies/create'>
            <a className='sidemenu-link'>Создать вакансию</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === '/admin/vacancies'
              ? 'list-group-item d-flex justify-content-between align-items-start active'
              : 'list-group-item d-flex justify-content-between align-items-start'
          }
        >
          <Link href='/admin/vacancies'>
            <a className='sidemenu-link'>Вакансии</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === '/admin/articles/create'
              ? 'list-group-item d-flex justify-content-between align-items-start active'
              : 'list-group-item d-flex justify-content-between align-items-start'
          }
        >
          <Link href='/admin/articles/create'>
            <a className='sidemenu-link'>Создать статью</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === '/admin/articles'
              ? 'list-group-item d-flex justify-content-between align-items-start active'
              : 'list-group-item d-flex justify-content-between align-items-start'
          }
        >
          <Link href='/admin/articles'>
            <a className='sidemenu-link'>Статьи</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === '/admin/requests'
              ? 'list-group-item d-flex justify-content-between align-items-start active'
              : 'list-group-item d-flex justify-content-between align-items-start'
          }
        >
          <Link href='/admin/requests'>
            <a className='sidemenu-link'>Запросы</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default AdminPanelMenu
