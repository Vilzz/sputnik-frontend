import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap'

const Header = ({ menu_locale }) => {
  const router = useRouter()
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
            {router.locale === 'ru-RU'
              ? menu_locale.map((item) => (
                  <li className='nav-item' key={item.id}>
                    <Link href={item.link}>
                      <a className='nav-link'>{item.ru}</a>
                    </Link>
                  </li>
                ))
              : menu_locale.map((item) => (
                  <li className='nav-item' key={item.id}>
                    <Link href={item.link}>
                      <a className='nav-link'>{item.en}</a>
                    </Link>
                  </li>
                ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Header

Header.defaultProps = {
  menu_locale: [
    {
      id: '781c7d77',
      ru: 'О нас',
      en: 'About us',
      link: '/about',
    },
    {
      id: 'cf4c4547',
      ru: 'Каталог',
      en: 'Catalog',
      link: '/catalog',
    },
    {
      id: '593fe2fd',
      ru: 'Карьера',
      en: 'Carier',
      link: '/carier',
    },
    {
      id: '0674fd8d',
      ru: 'Новости',
      en: 'News',
      link: '/news',
    },
    {
      id: '5e5dadc8',
      ru: 'Контакты',
      en: 'Contacts',
      link: '/contacts',
    },
    {
      id: '7e5ad418',
      ru: 'Регистрация',
      en: 'Register',
      link: '/account/register',
    },
    {
      id: '4d2kl432',
      ru: 'Вход',
      en: 'Login',
      link: '/account/login',
    },
  ],
}
