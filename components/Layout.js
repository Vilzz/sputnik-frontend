import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Container, Row } from 'react-bootstrap'

const Layout = ({ title, keywords, description, children }) => {
  return (
    <Container>
      <Head>
        {title ? <title>{title}</title> : <title>Sputnik models</title>}
        {description && <meta name='description' content={description} />}
        {keywords && <meta name='keywords' content={keywords} />}
      </Head>
      <Header />
      <Row className='py-3'>{children}</Row>
      <Footer />
    </Container>
  )
}

export default Layout
