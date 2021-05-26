import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '@/styles/Header.module.css'

const Header = ({ menu_locale }) => {
  const router = useRouter()
  return (
    <header className={styles.header}>
      <div className='d-flex align-items-center justify-content-between'>
        <Link href={`/`}>
          <a>
            <Image
              src='/sputnik.svg'
              width='138'
              height='110'
              alt='Sputnik Logo'
              className='py-0'
            />
          </a>
        </Link>
      </div>
      <nav>
        <ul>
          {router.locale === 'ru-RU'
            ? menu_locale.map((item) => (
                <li key={item.id}>
                  <Link href={item.link}>
                    <a>{item.ru}</a>
                  </Link>
                </li>
              ))
            : menu_locale.map((item) => (
                <li key={item.id}>
                  <Link href={`${item.link}`}>
                    <a>{item.en}</a>
                  </Link>
                </li>
              ))}
        </ul>
      </nav>
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
  ],
}
