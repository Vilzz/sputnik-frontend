import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ImRocket } from 'react-icons/im'
import styles from '@/styles/Header.module.css'

const Header = () => {
  const router = useRouter()
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={`/`}>
          <a>
            <Image
              src='/sputnik.svg'
              width='135'
              height='95'
              alt='Sputnik Logo'
            />
          </a>
        </Link>
      </div>
      <h2>
        <ImRocket />
        {router.locale}
      </h2>
      <nav>
        <ul>
          {router.locale === 'ru-RU'
            ? menu_locale.map((item) => (
                <li key={item.link}>
                  <Link href={item.link}>
                    <a>{item.ru}</a>
                  </Link>
                </li>
              ))
            : menu_locale.map((item) => (
                <li key={item.link}>
                  <Link href={`${router.locale}${item.link}`}>
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

const getStaticProps = () => {}

const menu_locale = [
  {
    ru: 'О нас',
    en: 'About us',
    link: '/about',
  },
  {
    ru: 'Наука',
    en: 'Science',
    link: '/science',
  },
  {
    ru: 'Карьера',
    en: 'Carier',
    link: '/carier',
  },
  {
    ru: 'Новости',
    en: 'News',
    link: '/news',
  },
  {
    ru: 'Контакты',
    en: 'Contacts',
    link: '/contacts',
  },
]
