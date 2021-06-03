import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap'

const Header = () => {
  const { user, logout } = useContext(AuthContext)
  const router = useRouter()
  const Menu = (locale) => {
    return (
      <>
        <li className='nav-item'>
          <Link href='/about'>
            <a className='nav-link'>
              {locale === 'ru-RU' ? 'О нас' : 'About us'}
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
          <Link href='/carier'>
            <a className='nav-link'>
              {locale === 'ru-RU' ? 'Карьера' : 'Carier'}
            </a>
          </Link>
        </li>
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
                width='138'
                height='110'
                alt='Sputnik Logo'
                priority='true'
                className='navbar-brand py-0'
              />
            </a>
          </Link>
        </NavbarBrand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' className='me-3' />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav className='ms-3 me-5'>
            {Menu(router.locale)}
            {user ? (
              <li className='nav-item'>
                <a className='btn nav-link' onClick={() => logout()}>
                  {router.locale === 'ru-RU' ? 'Выход' : 'Logout'}
                </a>
              </li>
            ) : (
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
