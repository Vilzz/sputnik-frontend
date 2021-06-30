import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap'
import { FaPhoneAlt } from 'react-icons/fa'
import { GoMail } from 'react-icons/go'

const Header = () => {
  const { user, logout } = useContext(AuthContext)
  const router = useRouter()

  const Menu = (locale) => {
    return (
      <>
        <li className='nav-item'>
          <Link href='/'>
            <a className='nav-link'>
              {locale === 'ru-RU' ? 'Главная' : 'Home'}
            </a>
          </Link>
        </li>
        <li className='nav-item'>
          <Link href='/catalog'>
            <a className='nav-link'>
              {locale === 'ru-RU' ? 'Каталог' : 'Catalog'}
            </a>
          </Link>
        </li>
        <li className='nav-item'>
          <Link href='/about'>
            <a className='nav-link'>
              {locale === 'ru-RU' ? 'О нас' : 'About us'}
            </a>
          </Link>
        </li>
        {router.locale === 'ru-RU' && (
          <li className='nav-item'>
            <Link href='/carier'>
              <a className='nav-link'>
                {locale === 'ru-RU' ? 'Карьера' : 'Carier'}
              </a>
            </Link>
          </li>
        )}

        <li className='nav-item'>
          <Link href='/news'>
            <a className='nav-link'>
              {locale === 'ru-RU' ? 'Новости' : 'News'}
            </a>
          </Link>
        </li>
        <li className='nav-item'>
          <Link href='/contacts'>
            <a className='nav-link'>
              {locale === 'ru-RU' ? 'Контакты' : 'Contacts'}
            </a>
          </Link>
        </li>
      </>
    )
  }

  return (
    <header>
      <Navbar bg='light' expand='lg' className='shadow'>
        <NavbarBrand className='ms-5'>
          <Link href={`/`}>
            <a>
              <Image
                src='/sputnik.svg'
                width='240' //138
                height='169' //110
                alt='Sputnik Logo'
                priority='true'
                className='navbar-brand py-0'
              />
            </a>
          </Link>
        </NavbarBrand>
        <div className='lang-flag'>
          <a href='/en' className='me-2'>
            <Image src='/images/gb.svg' width={20} height={15} />
          </a>
          <a href='/'>
            <Image src='/images/ru.svg' width={20} height={15} />
          </a>
        </div>
        <div className='contacts d-flex flex-column justify-content-end align-items-end'>
          <Link href='tel:88462192386'>
            <a>
              <FaPhoneAlt className='me-1' />
              +7 (846) 219 2386
            </a>
          </Link>
          <Link href='email:sputnik-models@yandex.ru'>
            <a>
              <GoMail className='me-1' /> sputnik-models@yandex.ru
            </a>
          </Link>
        </div>

        <Navbar.Toggle aria-controls='basic-navbar-nav' className='me-3' />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav className='ms-3 me-5 ps-2'>
            {Menu(router.locale)}
            {user ? (
              // Если пользователь авторизован
              <>
                {user.role === 'Admin' ? (
                  //Если пользователь администратор
                  <li className='nav-item'>
                    <Link href='/admin/category'>
                      <a className='nav-link'>
                        {router.locale === 'ru-RU' ? 'Панель' : 'Dashboard'}
                      </a>
                    </Link>
                  </li>
                ) : (
                  //Если обычный пользователь
                  <li className='nav-item'>
                    <Link href='/account/dashboard'>
                      <a className='nav-link'>
                        {router.locale === 'ru-RU' ? 'Панель' : 'Dashboard'}
                      </a>
                    </Link>
                  </li>
                )}
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    onClick={() => logout()}
                    style={{ cursor: 'pointer' }}
                  >
                    {router.locale === 'ru-RU' ? 'Выход' : 'Logout'}
                  </a>
                </li>
              </>
            ) : (
              // Не авторизованный пользователь
              <>
                <li className='nav-item'>
                  <Link href='/account/register'>
                    <a className='nav-link'>
                      {router.locale === 'ru-RU' ? 'Регистрация' : 'Register'}
                    </a>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link href='/account/login'>
                    <a className='nav-link'>
                      {router.locale === 'ru-RU' ? 'Вход' : 'Login'}
                    </a>
                  </Link>
                </li>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Header
