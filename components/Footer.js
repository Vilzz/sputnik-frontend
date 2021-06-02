import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/styles/Footer.module.css'

const Footer = () => {
  const router = useRouter()
  return (
    <footer className={styles.footer}>
      <hr />
      {router.locale === 'ru-RU' ? (
        <>
          <p>Copyright &copy; Макетная студия "Спутник" 2021</p>
          <p>
            <Link href='/about'>
              <a>О проекте</a>
            </Link>
          </p>
        </>
      ) : (
        <>
          <p>Copyright &copy; Sputnik makets studio 2021</p>
          <p>
            <Link href={`/about`}>
              <a>About This Project</a>
            </Link>
          </p>
        </>
      )}
    </footer>
  )
}

export default Footer
