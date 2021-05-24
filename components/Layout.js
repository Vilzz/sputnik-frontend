import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from '@/styles/Home.module.css'

const Layout = ({ title, keywords, description, children }) => {
  return (
    <div className='container'>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <div className={styles.mainpage}>
        <Header />
        <div className='container'>
          <div className='row'>{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
