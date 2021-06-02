import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from '@/styles/Home.module.css'
import { Container, Row } from 'react-bootstrap'

const Layout = ({ title, keywords, description, children }) => {
  return (
    <Container>
      <Head>
        {title ? <title>{title}</title> : <title>Sputnik models</title>}
        {description && <meta name='description' content={description} />}
        {keywords && <meta name='keywords' content={keywords} />}
      </Head>
      <div className={styles.mainpage}>
        <Header />
        <Container>
          <Row className='py-3'>{children}</Row>
        </Container>
        <Footer />
      </div>
    </Container>
  )
}

export default Layout
